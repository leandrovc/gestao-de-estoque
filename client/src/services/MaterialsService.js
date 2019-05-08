import Api from './Api'

export default {
  show (materialId) {
    return Api().get(`materials/${materialId}`)
  },
  post (material) {
    return Api().post('materials', material)
  },
  search (searchText) {
    return Api().get(`materials?search=${searchText}`)
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
