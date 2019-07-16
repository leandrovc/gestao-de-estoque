import Api from './Api'

export default {
  create (invoice) {
    return Api().post('invoices', invoice)
  },

  search (filter) {
    const filterString = `initialDate=${filter.initialDate}&finalDate=${filter.finalDate}`
    return Api().get(`invoices?${filterString}`)
  },

  show (invoiceId) {
    return Api().get(`invoices/${invoiceId}`)
  },

  showAll () {
    return Api().get('invoices=showAll')
  },

  update (invoiceId, invoice) {
    return Api().put(`invoices/${invoiceId}`, invoice)
  },

  delete (invoiceId) {
    return Api().delete(`invoices/${invoiceId}`)
  }
}
