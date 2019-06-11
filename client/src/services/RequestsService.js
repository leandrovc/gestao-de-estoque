import Api from './Api'

export default {
  create (request) {
    return Api().post('requests', request)
  },

  search (filter) {
    let filterString = `initialDate=${filter.initialDate}&finalDate=${filter.finalDate}`

    function filterToString (index) {
      const filterValue = filter[index]
      if (filterValue !== '' && filterValue !== null) {
        filterString = filterString + `&${index}=${filterValue}`
      }
    }

    filterToString('number')
    filterToString('applicant')
    filterToString('authorizer')
    return Api().get(`requests?${filterString}`)
  },

  show (requestId) {
    return Api().get(`requests/${requestId}`)
  },

  showAll () {
    return Api().get('requests=showAll')
  },

  update (requestId, request) {
    return Api().put(`requests/${requestId}`, request)
  },

  delete (requestId) {
    return Api().delete(`requests/${requestId}`)
  },

  async getAttributeOptions (attributes) {
    const index = 'value'
    const data = (await Api().get(`requests=getAttributeOptions?attribute=${attributes}&index=${index}`)).data
    const itemsArray = []
    data.forEach(item => {
      itemsArray.push(item[index])
    })
    return itemsArray
  }
}
