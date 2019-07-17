import Api from './Api'

export default {
  create (invoice) {
    return Api().post('invoices', invoice)
  },

  search (filter) {
    let filterString = `initialDate=${filter.initialDate}&finalDate=${filter.finalDate}`

    function filterToString (index) {
      const filterValue = filter[index]
      if (filterValue !== undefined && filterValue !== '') {
        filterString = filterString + `&${index}=${filterValue}`
      }
    }

    filterToString('number')
    filterToString('SupplierId')
    filterToString('MaterialId')
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
