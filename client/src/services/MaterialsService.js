import Api from './Api'

export default {
  index () {
    return Api().get('materials')
  },
  show (materialId) {
    return Api().get(`materials/${materialId}`)
  },
  post (material) {
    return Api().post('materials', material)
  },
  search (searchText) {
    return Api().get(`materials/${searchText}`)
  }
}
