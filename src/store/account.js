import { defineStore } from 'pinia'

// Using Options API
export const useAccountStore = defineStore('account', {
  state: () => ({
    count: 0,
    name: 'asdf',
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    addressId: 0,
    companyId: 0
  }),
  getters: {
    doubleCount: state => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
