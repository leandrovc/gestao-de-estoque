import Api from './Api'

export default {
  create (material) {
    return Api().post('materials', material)
  },
  search (searchText) {
    return Api().get(`materials?search=${searchText}`)
  },
  show (materialId) {
    return Api().get(`materials/${materialId}`)
  },
  getLatest () {
    return Api().get('materials=getLatest')
  },
  update (materialId, material) {
    return Api().put(`materials/${materialId}`, material)
  },
  delete (materialId) {
    return Api().delete(`materials/${materialId}`)
  }
}
