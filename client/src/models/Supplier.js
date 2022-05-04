import ItemFactory from './ItemFactory'
import SuppliersService from '@/services/SuppliersService'

export default class Supplier extends ItemFactory {
  constructor() {
    let emptySupplier = {
      id: null,
      socialName: '',
      cnpj: '',
      Address: {
        street: '',
        number: '',
        district: '',
        city: '',
        state: 'SP',
        cep: ''
      },
      Telephones: []
    }
    super(SuppliersService, emptySupplier, null)
  }
  appendTelephone (supplier) {
    const newTelephone = { number: '' }
    supplier.Telephones.push(newTelephone)
  }
  deleteTelephone (supplier, telephone) {
    if (telephone.id) {
      SuppliersService.deleteTelephone(telephone.id)
    }
    const index = supplier.Telephones.indexOf(telephone)
    supplier.Telephones.splice(index, 1)
  }
  setExpandedInfo (supplier) {
    supplier.expanded = [
      supplier.Address.street + ', ' +
      supplier.Address.number + ' - ' +
      supplier.Address.district + ', ' +
      supplier.Address.city + ', ' +
      supplier.Address.state + ' - ' +
      'CEP: ' + supplier.Address.cep
    ]
    supplier.Telephones.forEach((tel, index) => {
      supplier.expanded.push('- Tel. ' + (index + 1) + ': ' + tel.number)
    })
    return supplier
  }
}
