const Db = require('../models/index')
const { Request, Material } = Db
const Op = Db.Sequelize.Op
const MaterialJunctionsController = require('./MaterialJunctionsController')
const MaterialsController = require('./MaterialsController')

module.exports = {
  async show (req, res) {
    try {
      let request = await Request.findByPk(req.params.requestId, {
        include: [ Material ]
      })
      res.send(request)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o registro de saída.'
      })
    }
  },
  async create (req, res) {
    try {
      let requestData = req.body
      for (const materialData of requestData.Materials) {
        if (!await MaterialsController.quantityAvailable(materialData.id, parseFloat(materialData.MaterialRequests.quantity))) {
          throw new Error('Não há quantidade suficiente do material em estoque.')
        }
      }
      let request = await Request.create(
        requestData
      )
      for (const materialData of requestData.Materials) {
        await MaterialJunctionsController.addMaterialToRequest(materialData, request)
        await MaterialsController.removeFromInventory(materialData.id, parseFloat(materialData.MaterialRequests.quantity))
      }
      res.send(request)
    } catch (err) {
      res.status(500).send({
        error: `Erro ao criar o registro de saída. ${err}`
      })
    }
  },
  async getAttributeOptions (req, res) {
    try {
      const attribute = req.query['attribute']
      const index = req.query['index']
      /* Request.aggregate(attribute,
        'distinct',
        { plain: false }
      ).then(result => {
        res.send(result)
      }) */
      Request.findAll({
        attributes: [[ attribute, index ]],
        group: [ attribute ]
      }).then(data => {
        res.send(data)
      })
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o registro de saída.'
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
      // Find Requests with queued Material
      if (filter.materialId !== undefined && filter.materialId != null) {
        let requests = await Request.findAll({
          include: [
            { model: Material,
              where: {
                id: filter.materialId
              }
            }
          ],
          through: { attributes: ['id'] }
        })
        if (requests.length > 0) {
          filter.id = []
          requests.forEach(i => {
            filter.id.push(i.dataValues.id)
          })
        } else {
          res.send(requests)
          return
        }
        filter.materialId = null
        delete filter.materialId
      }
      let request = await Request.findAll({
        order: Db.sequelize.literal('id DESC'),
        where: {
          [Op.and]: filter
        },
        include: [ Material ]
      })
      res.send(request)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o(s) registro(s) de saída.'
      })
    }
  },
  async showAll (req, res) {
    try {
      let request = await Request.findAll({
        order: Db.sequelize.literal('id DESC'),
        include: [ Material ]
      })
      res.send(request)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o(s) registro(s) de saída.'
      })
    }
  },
  async update (req, res) {
    try {
      let requestData = req.body
      await Request.update(req.body, {
        where: {
          id: req.params.requestId
        }
      })
      let request = await Request.findByPk(req.params.requestId)
      request.setMaterials([])
      for (const materialData of requestData.Materials) {
        await MaterialJunctionsController.addMaterialToRequest(materialData, request)
      }
      res.send('Registro de Saída atualizado!')
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar atualizar o registro de saída.'
      })
    }
  },
  async delete (req, res) {
    try {
      let requestId = req.params.requestId
      await Request.destroy({
        where: {
          id: requestId
        }
      })
      res.send('Registro de Saída excluído!')
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar excluir o registro de saída.'
      })
    }
  }
}
