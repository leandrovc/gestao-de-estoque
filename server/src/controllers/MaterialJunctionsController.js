const MaterialsController = require('./MaterialsController')

module.exports = {
  async addMaterialToInvoice (materialData, invoice) {
    const materialInvoiceData = materialData.MaterialInvoices
    return new Promise((resolve) => {
      MaterialsController.find(materialData.id)
        .then(material => {
          invoice.addMaterial(material, {
            through: {
              brand: materialInvoiceData.brand,
              quantity: materialInvoiceData.quantity,
              unitaryValue: materialInvoiceData.unitaryValue
            }
          }).then(() => {
            resolve()
          })
        })
    })
  },
  async addMaterialToRequest (materialData, request) {
    const materialRequestData = materialData.MaterialRequests
    return new Promise((resolve) => {
      MaterialsController.find(materialData.id)
        .then(material => {
          request.addMaterial(material, {
            through: {
              quantity: materialRequestData.quantity
            }
          }).then(() => {
            resolve()
          })
        })
    })
  }
}
