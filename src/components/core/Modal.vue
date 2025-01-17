<script setup>
import {ref,onMounted } from 'vue'
import axios from '../../tools/axios.js'
import Button from '../Button.vue'
import Input from '../Input.vue'
import Select from '../Select.vue'
import { useVuelidate } from '@vuelidate/core'

const props = defineProps({
  hidden: { type: Boolean },
  table: { type: Object }
})

const modalData = defineModel('modalData', { default: {} })
const action = defineModel('action', { default: 0 })
const emit = defineEmits(['modal-close', 'update-table', 'modal-error', 'loading', 'not-loading'])

const v$ = useVuelidate(props.table.validation, modalData)

const actions = Object.freeze({
  POST: 0,
  PUT: 1,
  DELETE: 2
})

let dropdownOpts = {}

async function update() {
  try {
    const formIsValid = await v$.value.$validate()

    const emitError = e => emit('modal-error', e.response?.data.error ?? e.message)

    if (formIsValid) {
      emit('loading')

      switch (action.value) {
        case actions.PUT:
          axios
            .put(props.table.route, modalData.value)
            .then(res => {
              emit('not-loading')
              props.table?.callbacks?.put(res, () => emit('update-table'))
              emit('update-table')
            })
            .catch(emitError)
          break

        case actions.DELETE:
          axios
            .delete(props.table.route, { params: modalData.value })
            .then(res => {
              emit('not-loading')
              props.table?.callbacks?.delete(res, () => emit('update-table'))
              emit('update-table')
            })
            .catch(emitError)
          break

        case actions.POST:
        default:
          axios
            .post(props.table.route, modalData.value)
            .then(res => {
              emit('not-loading')
              props.table?.callbacks?.post(res, () => emit('update-table'))
              emit('update-table')
            })
            .catch(emitError)
      }
    }
    else emit('modal-error', 'Error: invalid data')
  } catch (error) { emit('modal-error', error.message) }

  emit('modal-close')
}

// fetch routes required for all dropdowns in the modal
const dropdownTables = props.table.headers
  .filter(h => h?.dropdownOptions)
  .map(h => ({ name: h.name, route: h.dropdownOptions }))

if (dropdownTables.length) {
  dropdownTables.forEach(h => // create object of dropdown options
    axios
      .get(`/${h.route}`)
      .then(res => {
        dropdownOpts[h.name] = res.data.table
      })
      .catch(e => emit('modal-error', 'Failed to load drop down' + e.message))
  )
}
</script>

<template>
  <!-- Modal -->
  <div
    id="default-modal"
    tabindex="-1"
    aria-hidden="true"
    :class="{ hidden }"
    class="backdrop-blur backdrop-brightness-150 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="absolute top-0 right-1/3 p-4 w-full max-w-2xl max-h-full">
      <!-- Content -->
      <div class="relative bg-[#646e83] rounded-lg shadow">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 md:p-5 rounded-t ">
          <h3 class="text-xl font-semibold text-gray-900">
            Enter data
          </h3>
          <Button @click="$emit('modal-close')">
            X
          </Button>
        </div>
        <hr class="bg-sleet-30 max-w-[90%] m-auto">
        <!-- Body -->
        <div class="p-4 md:p-5 space-y-4">
          <table class="content-center w-full text-sm text-left text-sleet-10">
            <tbody>
              <tr v-for="(t, i) in table.headers" :key="i">
                <td
                  v-if="action === actions.PUT || !t.readonly"
                  scope="col"
                  class="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {{t.name}}
                </td>
                <td v-if="action === actions.DELETE && !t.readonly">
                  {{modalData[t.name]}}
                </td>
                <td
                  v-else-if="action === actions.PUT || !t.readonly"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  <Select
                    v-if="t.type === 'dropdown'"
                    :options="dropdownOpts[t.name]"
                    :selected="modalData[t.name]"
                    @change="e => { modalData[t.name] = e; v$[t.name]?.$touch() }"
                    :value-key="t.valueKey"
                    :name-key="t.nameKey"
                  />
                  <Input
                    v-else-if="t.type === 'boolean'"
                    :disabled="t.readonly"
                    v-model:value="modalData[t.name]"
                    true-value="1"
                    false-value="0"
                    :class="{'cursor-not-allowed': t.readonly, 'border-2': v$[t.name]?.$error, 'border-rose-600': v$[t.name]?.$error }"
                    type="checkbox"
                    @blur="v$[t.name]?.$touch()"
                  />
                  <Input
                    v-else
                    :disabled="t.readonly"
                    v-model:value="modalData[t.name]"
                    :class="{'cursor-not-allowed': t.readonly, 'border-2': v$[t.name]?.$error, 'border-rose-600': v$[t.name]?.$error }"
                    :type=" t.type === 'boolean' ? 'checkbox' : ''"
                    @blur="v$[t.name]?.$touch()"
                  />
                  <br>
                  <span v-if="v$[t.name]?.$error" class="text-rose-600">
                    {{ v$[t.name].$errors[0].$message }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        <!-- Footer -->
        <hr class="bg-sleet-30 max-w-[90%] m-auto">
        <div class="flex items-center p-4 md:p-5">
          <Button
            :class="{'cursor-not-allowed': v$.$error}"
            :disabled="v$.$error"
            @click="update"
          >
            Ok
          </Button>
          <Button @click="$emit('modal-close')">
            Close
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
