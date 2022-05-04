import ItemFactory from './ItemFactory'
import RequestsService from '@/services/RequestsService'

export default class Request extends ItemFactory {
  constructor() {
    let emptyRequest = {
      number: '',
      issueDate: '',
      applicant: '',
      authorizer: '',
      comments: '',
      Materials: []
    }
    let name = {
      text: 'Registro de Saída',
      gender: 'o'
    }
    let decimalProperties = [
      'quantity'
    ]
    super(RequestsService, emptyRequest, name, decimalProperties)
  }
  appendMaterial (request) {
    const newMaterial = {
      description: '',
      MaterialRequests: {
        quantity: null
      }
    }
    request.Materials.push(newMaterial)
  }
  replaceMaterial (requestMaterials, material, index) {
    requestMaterials.splice(index, 1, material)
    requestMaterials[index].MaterialRequests = {
      quantity: null
    }
  }
  deleteMaterial (requestMaterials, index) {
    requestMaterials.splice(index, 1)
  }
  async getApplicantOptions () {
    return RequestsService.getAttributeOptions('applicant')
  }
  async getAuthorizerOptions () {
    return RequestsService.getAttributeOptions('authorizer')
  }
  setExpandedInfo (request) {
    request.expanded = []
    request.Materials.forEach(m => {
      request.expanded.push('- ' + m.description +
        ' | quantidade: ' +
        m.MaterialRequests.quantity
      )
    })
    return request
  }
}
