import RequestsService from '@/services/RequestsService'

export default {
  emptyRequest: {
    number: '',
    issueDate: '',
    applicant: '',
    authorizer: '',
    comments: '',
    Materials: []
  },
  assign (request, receiver) {
    if (request !== undefined && request != null) {
      return Object.assign({}, request)
    }
    receiver = Object.assign({}, this.emptyRequest)
    receiver.Materials = []
    this.appendMaterial(receiver)
    return receiver
  },
  async save (request, callback) {
    try {
      request.Materials.forEach(m => {
        m.MaterialRequests.quantity = m.MaterialRequests.quantity.toString().replace(',', '.')
      })
      if (request.id == null) {
        await RequestsService.create(request)
      } else {
        await RequestsService.update(request.id, request)
      }
      callback()
    } catch (err) {
      console.log(err)
    }
  },
  appendMaterial (request) {
    const newMaterial = {
      description: '',
      MaterialRequests: {
        quantity: null
      }
    }
    request.Materials.push(newMaterial)
  },
  replaceMaterial (requestMaterials, material, index) {
    requestMaterials.splice(index, 1, material)
    requestMaterials[index].MaterialRequests = {
      quantity: null
    }
  },
  deleteMaterial (requestMaterials, index) {
    requestMaterials.splice(index, 1)
  },
  async getApplicantOptions () {
    return RequestsService.getAttributeOptions('applicant')
  },
  async getAuthorizerOptions () {
    return RequestsService.getAttributeOptions('authorizer')
  },
  newList () {
    return {
      list: [],
      setExpandedInfo () {
        this.list.forEach((request) => {
          request.expanded = []
          request.Materials.forEach(m => {
            request.expanded.push('- ' + m.description +
              ' | quantidade: ' +
              m.MaterialRequests.quantity
            )
          })
        })
      },
      formatDecimal () {
        this.list.forEach((m) => {
          if (m.MaterialRequests != null) {
            m.MaterialRequests.quantity = m.MaterialRequests.quantity.toString().replace('.', ',')
          }
        })
      },
      getList () {
        return this.list
      },
      async showAll () {
        this.list = (await RequestsService.showAll()).data
        this.formatDecimal()
        this.setExpandedInfo()
      },
      async showSearchResult (searchFilter) {
        this.list = (await RequestsService.search(searchFilter)).data
        this.formatDecimal()
        this.setExpandedInfo()
      },
      deleteItem (item) {
        const index = this.list.indexOf(item)
        RequestsService.delete(item.id) &&
        this.list.splice(index, 1)
      }
    }
  }
}
