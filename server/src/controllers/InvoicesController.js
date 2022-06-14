const Db = require('../models/index')
const { Invoice, Material, Supplier } = Db
const Op = Db.Sequelize.Op
const MaterialJunctionsController = require('./MaterialJunctionsController')
const MaterialsController = require('./MaterialsController')

module.exports = {
  async show (req, res) {
    try {
      let invoice = await Invoice.findByPk(req.params.invoiceId, {
        include: [ Material, Supplier ]
      })
      res.send(invoice)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar a nota fiscal.'
      })
    }
  },
  async create (req, res) {
    try {
      let invoiceData = req.body
      let invoice = await Invoice.create(
        invoiceData
      )
      for (const materialData of invoiceData.Materials) {
        await MaterialJunctionsController.addMaterialToInvoice(materialData, invoice)
        await MaterialsController.addToQuantity(materialData.id, parseInt(materialData.MaterialInvoices.quantity, 10))
      }
      res.send(invoice)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar criar a nota fiscal.'
      })
    }
  },
  async search (req, res) {
    try {
      let filter = req.query
      // Set issueDate clause
      filter.issueDate = {
        [Op.gte]: filter.initialDate,
        [Op.lte]: filter.finalDate
      }
      filter.initialDate = null
      filter.finalDate = null
      delete filter.initialDate
      delete filter.finalDate
      // Find Invoices with queued Material
      if (filter.materialId !== undefined && filter.materialId != null) {
        let invoices = await Invoice.findAll({
          include: [
            { model: Material,
              where: {
                id: filter.materialId
              }
            }
          ],
          through: { attributes: ['id'] }
        })
        if (invoices.length > 0) {
          filter.id = []
          invoices.forEach(i => {
            filter.id.push(i.dataValues.id)
          })
        } else {
          res.send(invoices)
          return
        }
        filter.materialId = null
        delete filter.materialId
      }
      let invoice = await Invoice.findAll({
        order: Db.sequelize.literal('id DESC'),
        where: {
          [Op.and]: filter
        },
        include: [ Material, Supplier ]
      })
      res.send(invoice)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar a(s) nota(s) fiscal(is).'
      })
    }
  },
  async showAll (req, res) {
    try {
      let invoice = await Invoice.findAll({
        order: Db.sequelize.literal('id DESC'),
        include: [ Material, Supplier ]
      })
      res.send(invoice)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar a(s) nota(s) fiscal(is).'
      })
    }
  },
  async update (req, res) {
    try {
      let invoiceData = req.body
      await Invoice.update(req.body, {
        where: {
          id: req.params.invoiceId
        }
      })
      let invoice = await Invoice.findByPk(req.params.invoiceId)
      await invoice.setMaterials([])
      for (const materialData of invoiceData.Materials) {
        await MaterialJunctionsController.addMaterialToInvoice(materialData, invoice)
      }
      res.send('Nota Fiscal atualizada!')
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar atualizar a nota fiscal.'
      })
    }
  },
  async delete (req, res) {
    try {
      let invoiceId = req.params.invoiceId
      await Invoice.destroy({
        where: {
          id: invoiceId
        }
      })
      res.send('Nota Fiscal excluída!')
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar excluir a nota fiscal.'
      })
    }
  }
}
