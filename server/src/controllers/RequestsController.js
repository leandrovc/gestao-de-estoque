const Db = require('../models/index')
const { Request, Material } = Db
const Op = Db.Sequelize.Op
const MaterialJunctionsController = require('./MaterialJunctionsController')

module.exports = {
  async show (req, res) {
    try {
      let request = await Request.findByPk(req.params.requestId, {
        include: [ Material ]
      })
      res.send(request)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar a requisição.'
      })
    }
  },
  async create (req, res) {
    try {
      let requestData = req.body
      let request = await Request.create(
        requestData
      )
      for (const materialData of requestData.Materials) {
        await MaterialJunctionsController.addMaterialToRequest(materialData, request)
      }
      res.send(request)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar criar a requisição.'
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
        error: 'Ocorreu um erro ao tentar buscar a requisição.'
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
        error: 'Ocorreu um erro ao tentar buscar a(s) requisição(ões).'
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
        error: 'Ocorreu um erro ao tentar buscar a(s) requisição(ões).'
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
      res.send('Requisição atualizada!')
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar atualizar a requisição.'
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
      res.send('Requisição excluída!')
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar excluir a requisição.'
      })
    }
  }
}
