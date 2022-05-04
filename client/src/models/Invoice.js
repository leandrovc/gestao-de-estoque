import ItemFactory from './ItemFactory'
import InvoicesService from '@/services/InvoicesService'

export default class Invoice extends ItemFactory {
  constructor() {
    let emptyInvoice = {
      number: '',
      issueDate: '',
      Supplier: {
        id: null,
        socialName: ''
      },
      Materials: []
    }
    let decimalProperties = [
      'quantity',
      'unitaryValue'
    ]
    super(InvoicesService, emptyInvoice, decimalProperties)
  }
  async save(invoice, callback) {
    invoice.SupplierId = invoice.Supplier.id
    super.save(invoice, callback)
  }
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
  }
  replaceMaterial (invoiceMaterials, material, index) {
    invoiceMaterials.splice(index, 1, material)
    invoiceMaterials[index].MaterialInvoices = {
      brand: '',
      quantity: null,
      unitaryValue: null
    }
  }
  deleteMaterial (invoiceMaterials, index) {
    invoiceMaterials.splice(index, 1)
  }
  setExpandedInfo (invoice) {
    function formatBRL (value) {
      return 'R$' + value
      /*
      if (typeof value !== 'number') {
        return value
      }
      var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })
      return formatter.format(value)*/
    }
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
    return invoice
  }
}
