import Api from './Api'

export default {
  create (supplier) {
    return Api().post('suppliers', supplier)
  },
  search (searchText) {
    return Api().get(`suppliers?search=${searchText}`)
  },
  show (supplierId) {
    return Api().get(`suppliers/${supplierId}`)
  },
  showAll () {
    return Api().get('suppliers=showAll')
  },
  update (supplierId, supplier) {
    return Api().put(`suppliers/${supplierId}`, supplier)
  },
  delete (supplierId) {
    return Api().delete(`suppliers/${supplierId}`)
  },
  deleteTelephone (telephoneId) {
    return Api().delete(`telephones/${telephoneId}`)
  }
}
