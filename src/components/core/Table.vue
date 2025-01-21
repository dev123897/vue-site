<script setup>
import {ref, computed, watch} from 'vue'
import axios from '../../tools/axios.js'
import Modal from './Modal.vue'
import Button from '../Button.vue'
import AlertOutlet from '../AlertOutlet.vue'
import Input from '../Input.vue'

const props = defineProps({
  table: {
    type: Object,
    required: true
  },
  tableData: {
    type: Array,
  }
})

const loading = defineModel('loading')
const alertMsg = defineModel('alertMsg')

watch(alertMsg, (newAlert, oldAlert) => {
  if (newAlert?.type === 'info')
    alerts.value.push({ badgeMsg: 'Attention', msg: newAlert.msg, type: 'info' })
  else
    displayError(newAlert)
})

const icons = '◆⮝⮟'
const actions = Object.freeze({
  POST: 0,
  PUT: 1,
  DELETE: 2
})

let data = ref([])
let hideModal = ref(true)
let rowData = ref({})
let action = ref(0)
let pages = ref(0)
let current = ref(0)
let sort = ref('')
let order = ref('')
let orderIcon = ref(icons.at(0))
let sortIndex = 0
let headers = ref(props.table.headers)
let selected = ref([])
let allSelected = ref(false)

let hasDownload = computed(() => props.table.headers.find(h => h.type === 'download'))

headers.value.forEach(h => h.orderIcon = orderIcon.value)

function openAddModal() {
  action.value = actions.POST
  hideModal.value = false
  rowData.value = {}

  // If there are any checkboxes, we have to provide a default value since v-model wont give them any value until interaction.
  // This is done so that the user doesn't have to touch the checkbox if they want its value to be false.
  props.table.headers.forEach(h => { if (h.type === 'boolean') rowData.value[h.name] = false })
}
function openEditModal(row) {
  action.value = actions.PUT
  hideModal.value = false
  rowData.value = row
}
function openDeleteModal(row) {
  action.value = actions.DELETE
  hideModal.value = false
  rowData.value = row
}

function closeModal() {
  hideModal.value = true
  rowData.value = {}
}

// display previous page number, current page and next two page numbers only
function shouldDisplayPageNumber(i) {
  return (current.value - i <= 3) || (i >= current.value && i < current.value + 3)
}

function download(src, id) {
  src += `/${id ? id : JSON.stringify(selected.value.map(i => data.value[i].id))}`

  axios
    .get(src, { responseType: 'blob' } )
    .then(res => {
      const a = document.createElement('a')
      const url = URL.createObjectURL(
        new Blob([res.data], {type: res.headers['content-type']})
      )

      a.href = url
      a.download = res.headers['content-disposition'].split('=')[1]

      document.body.appendChild(a)
      a.click()

      setTimeout(function() {
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
      }, 0)
    })
    .catch(e => {
      console.error(e)
      displayError('failed to download file')
    })
}

let alerts = ref([])
let search = ref('')

function closeAlert(i) {
  alerts.value = alerts.value.filter((a, index) => i !== index)
}

function fetchTableData(page=0) {
  if (page < 0) page = 0
  else if (page > pages.value) page = pages.value

  axios.get(props.table.route, {
      params: {
        offset: page * 10,
        search: search.value,
        sort: sort.value,
        order: order.value
      }
    })
    .then(res => {
      data.value = res.data.table
      pages.value = res.data.total
      current.value = page

      // alerts.value.push({ badgeMsg: 'Reminder', msg: 'set alerts to bg-red-700', type: 'info' })
    })
    .catch(e => displayError(e.response?.data.error ?? e.message))
}

if (!props?.tableData) fetchTableData()
else data = null

function displayError(msg) {
  loading.value = false
  alerts.value.push({ badgeMsg: 'error', msg, type: 'error' })
}

function searchTable(e) {
  search.value = e.target.value
  fetchTableData(0)
}

function selectAll() {
  allSelected.value = !allSelected.value

  selected.value = allSelected.value
    ? Array(data.value.length).keys().toArray() // [0,1,...length]
    : []
}

function setOrder(selectedIndex) {
  if (++sortIndex > 2) {
    sortIndex = 0
    sort.value = ''
  }
  else sort.value = headers.value[selectedIndex].name

  order.value = sortIndex === 0
    ? ''
    : sortIndex === 1
      ? 'asc'
      : 'desc'

  // Reset all other icons to the default
  headers.value.forEach((h, i) => h.orderIcon = i === selectedIndex ? icons.at(sortIndex) : icons.at(0))
  fetchTableData(0)
}
</script>

<template>
  <div>
    <Modal
      :hidden="hideModal"
      :action="action"
      :table="table"
      :modal-data="rowData"
      @loading="loading=true"
      @not-loading="loading=false"
      @modal-close="closeModal"
      @update-table="fetchTableData"
      @modal-error="displayError"
    />
    <AlertOutlet
      :alerts="alerts"
      @delete-alert="closeAlert"
    />
    <h1 class="pb-5 text-xl font-bold">{{table.title}}</h1>
    <table class="relative rounded-md content-center w-full text-sm text-left text-sleet-30">
      <!-- loading backdrop -->
      <div
        v-if="loading"
        class="backdrop-blur backdrop-grayscale backdrop-brightness-25 overflow-y-auto overflow-x-hidden absolute z-20 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <!-- Spinner courtesy of https://epic-spinners.vuestic.dev/ -->
        <div class="spring-spinner fixed top-1/2 right-1/2">
          <div class="spring-spinner-part top">
            <div class="spring-spinner-rotator"></div>
          </div>
          <div class="spring-spinner-part bottom">
            <div class="spring-spinner-rotator"></div>
          </div>
        </div>
      </div>
      <thead class="bg-sleet-10 text-xs text-midnight-50 uppercase bg-gray-50">
        <tr>
          <th
            v-for="(h, i) in headers"
            :key="i"
            scope="col"
            class="px-6 py-3"
          >
            <input
              v-if="table.enableRowSelect && i === 0"
              v-model="allSelected"
              type="checkbox"
              @click="selectAll"
            />
            {{h.altName || h.name}}
            <button @click="setOrder(i)">
              {{h.orderIcon}}
            </button>
          </th>
          <th class="float-right pt-1 pr-2">
            <Button
              v-if="hasDownload"
              :disabled="selected.length === 0"
              @click="download(hasDownload.src)"
              download
              :class="{'cursor-not-allowed': selected.length === 0}"
            >
              Download
            </Button>
            <Input
              v-if="!table.disableSearch"
              displayname="search"
              @keyup.enter="searchTable"
            />
            <Button v-if="!table.disallowPost" @click="openAddModal">
              +
            </Button>
          </th>
        </tr>
     </thead>
      <tbody>
        <tr
          v-for="(row, i) in data ?? tableData"
          :key="i"
          class="hover:bg-midnight-10"
          :class="[i % 2 !== 0 ? 'bg-[#646e83]' : 'bg-[#949baa]']"
        >
          <td
            v-for="(t, j) in table.headers"
            class="px-6 py-4 font-medium text-midnight-40 whitespace-nowrap"
            :key="j"
          >
            <p v-if="t.type === 'boolean'">
              {{row[t.name] ? '✔️' : '❌' }}
            </p>
            <button
              v-else-if="t.type === 'download'"
              @click="download(t.src, row[t.param])"
              download
            >
              {{row[t.name]}}
            </button>
            <p v-else>
              <input
                v-if="table.enableRowSelect && t.primaryKey"
                v-model="selected"
                :id="i"
                :value="i"
                type="checkbox"
              />
              <!-- display alternative column if display key is set -->
              {{row[t?.display || t.name]}}
            </p>
          </td>
          <td class="float-right pr-2">
            <Button
              v-if="!table.disableEditing"
              @click="openEditModal(row)"
            >
              ✎
            </Button>
            <Button
              v-if="!table.disableEditing && !table.disallowDelete"
              @click="openDeleteModal(row)"
            >
             DEL
            </Button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <Button
          v-if="(data ?? tableData).length"
          :class="{'cursor-not-allowed': !current}"
          :disabled="!current"
          @click="fetchTableData()"
        >
          <<
        </Button>
        <template v-for="(page, i) in pages" :key="page">
          <Button
            v-if="shouldDisplayPageNumber(i)"
            @click="fetchTableData(i)"
            :class="{'bg-sleet-40': i === current}"
          >
            {{page}}
          </Button>
        </template>
        <Button
          v-if="(data ?? tableData).length"
          :class="{'cursor-not-allowed': current === (pages - 1)}"
          :disabled="current === (pages - 1)"
          @click="fetchTableData(pages - 1)"
        >
          >>
        </Button>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.spring-spinner, .spring-spinner * {
  box-sizing: border-box;
}

.spring-spinner {
  height: 60px;
  width: 60px;
}

.spring-spinner .spring-spinner-part {
  overflow: hidden;
  height: calc(60px / 2);
  width: 60px;
}

.spring-spinner  .spring-spinner-part.bottom {
  transform: rotate(180deg) scale(-1, 1);
}

.spring-spinner .spring-spinner-rotator {
  width: 60px;
  height: 60px;
  border: calc(60px / 7) solid transparent;
  border-right-color: #ff503f;
  border-top-color: #ff503f;
  border-radius: 50%;
  box-sizing: border-box;
  animation: spring-spinner-animation 3s ease-in-out infinite;
  transform: rotate(-200deg);
}

@keyframes spring-spinner-animation {
  0% {
    border-width: calc(60px / 7);
  }
  25% {
    border-width: calc(60px / 23.33);
  }
  50% {
    transform: rotate(115deg);
    border-width: calc(60px / 7);
  }
  75% {
    border-width: calc(60px / 23.33);
  }
  100% {
    border-width: calc(60px / 7);
  }
}
</style>
