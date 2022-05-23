import Api from './Api'

export default {
  create (material) {
    return Api().post('materials', material)
  },
  search (searchText) {
    return Api().get(`materials?search=${searchText}`)
  },
  searchDescription (searchText) {
    return Api().get(`materials=searchDescription?search=${searchText}`)
  },
  show (materialId) {
    return Api().get(`materials/${materialId}`)
  },
  getLatest () {
    return Api().get('materials=getLatest')
  },
  getLastGroupCode (group) {
    return Api().get(`materials=getLastGroupCode?group=${group}`)
  },
  update (materialId, material) {
    return Api().put(`materials/${materialId}`, material)
  },
  delete (materialId) {
    return Api().delete(`materials/${materialId}`)
  }
}
