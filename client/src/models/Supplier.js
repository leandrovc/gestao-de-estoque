import SuppliersService from '@/services/SuppliersService'
import EventBus from '@/event-bus'

export default {
  emptySupplier: {
    id: null,
    socialName: '',
    cnpj: '',
    Address: {
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      cep: ''
    },
    Telephones: []
  },
  assign (supplier) {
    if (supplier !== undefined && supplier != null) {
      return Object.assign({}, supplier)
    }
    return Object.assign({}, this.emptySupplier)
  },
  async save (supplier, callback) {
    try {
      if (supplier.id == null) {
        await SuppliersService.create(supplier)
        EventBus.$emit('show-feedback', 'Fornecedor adicionado')
      } else {
        await SuppliersService.update(supplier.id, supplier)
        EventBus.$emit('show-feedback', 'Fornecedor editado')
      }
      callback()
    } catch (err) {
      console.log(err)
    }
  },
  appendTelephone (supplier) {
    const newTelephone = { number: '' }
    supplier.Telephones.push(newTelephone)
  },
  deleteTelephone (supplier, telephone) {
    if (telephone.id) {
      confirm(`Tem certeza de que deseja EXCLUIR ${telephone.number}?`) &&
      SuppliersService.deleteTelephone(telephone.id)
    }
    const index = supplier.Telephones.indexOf(telephone)
    supplier.Telephones.splice(index, 1)
  },
  newList () {
    return {
      list: [],
      setExpandedInfo () {
        this.list.forEach((supplier) => {
          supplier.expanded = [supplier.Address.street + ', ' +
          supplier.Address.number + ' - ' +
          supplier.Address.district + ', ' +
          supplier.Address.city + ', ' +
          supplier.Address.state + ' - ' +
          'CEP: ' + supplier.Address.cep]
          supplier.Telephones.forEach((tel, index) => {
            supplier.expanded.push('- Tel. ' + (index + 1) + ': ' + tel.number)
          })
        })
      },
      getList () {
        return this.list
      },
      async showAll () {
        this.list = (await SuppliersService.showAll()).data
        this.setExpandedInfo()
      },
      async showSearchResult (searchText) {
        this.list = (await SuppliersService.search(searchText)).data
        this.setExpandedInfo()
      },
      deleteItem (item) {
        const index = this.list.indexOf(item)
        SuppliersService.delete(item.id) &&
        this.list.splice(index, 1)
        EventBus.$emit('show-feedback', 'Fornecedor excluído')
      }
    }
  }
}
