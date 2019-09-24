import InvoicesService from '@/services/InvoicesService'

export default {
  emptyInvoice: {
    number: '',
    issueDate: '',
    Supplier: {
      id: null,
      socialName: ''
    },
    Materials: [
      {
        description: '',
        MaterialInvoices: {
          brand: '',
          quantity: null,
          unitaryValue: null
        }
      }
    ]
  },
  assign (invoice) {
    if (invoice !== undefined && invoice != null) {
      return Object.assign({}, invoice)
    }
    return Object.assign({}, this.emptyInvoice)
  },
  async save (invoice, callback) {
    try {
      invoice.Materials.forEach(m => {
        m.MaterialInvoices.quantity = m.MaterialInvoices.quantity.toString().replace(',', '.')
        m.MaterialInvoices.unitaryValue = m.MaterialInvoices.unitaryValue.toString().replace(',', '.')
      })
      invoice.SupplierId = invoice.Supplier.id
      if (invoice.id == null) {
        await InvoicesService.create(invoice)
      } else {
        await InvoicesService.update(invoice.id, invoice)
      }
      callback()
    } catch (err) {
      console.log(err)
    }
  },
  appendMaterial (invoice) {
    const newMaterial = {
      description: '',
      MaterialInvoices: {
        brand: '',
        quantity: null,
        unitaryValue: null
      }
    }
    invoice.Materials.push(newMaterial)
  },
  replaceMaterial (invoiceMaterials, material, index) {
    invoiceMaterials.splice(index, 1, material)
    invoiceMaterials[index].MaterialInvoices = {
      brand: '',
      quantity: null,
      unitaryValue: null
    }
  },
  newList () {
    return {
      list: [],
      setExpandedInfo () {
        function formatBRL (value) {
          if (typeof value !== 'number') {
            return value
          }
          var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
          })
          return formatter.format(value)
        }
        this.list.forEach((invoice) => {
          invoice.expanded = []
          invoice.Materials.forEach(m => {
            invoice.expanded.push('- ' + m.description +
              ' | marca: ' +
              m.MaterialInvoices.brand +
              ' qtd.:' +
              m.MaterialInvoices.quantity +
              ' ' +
              m.unit +
              '(s) v. unit.: ' +
              formatBRL(m.MaterialInvoices.unitaryValue))
          })
        })
      },
      formatDecimal () {
        this.list.forEach((m) => {
          if (m.MaterialInvoices != null) {
            m.MaterialInvoices.quantity = m.MaterialInvoices.quantity.toString().replace('.', ',')
            m.MaterialInvoices.unitaryValue = m.MaterialInvoices.unitaryValue.toString().replace('.', ',')
          }
        })
      },
      getList () {
        return this.list
      },
      async showAll () {
        this.list = (await InvoicesService.showAll()).data
        this.formatDecimal()
        this.setExpandedInfo()
      },
      async showSearchResult (searchFilter) {
        this.list = (await InvoicesService.search(searchFilter)).data
        this.formatDecimal()
        this.setExpandedInfo()
      },
      deleteItem (item) {
        const index = this.list.indexOf(item)
        InvoicesService.delete(item.id) &&
        this.list.splice(index, 1)
      }
    }
  }
}
