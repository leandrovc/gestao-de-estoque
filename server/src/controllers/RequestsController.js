const Db = require('../models/index')
const { Request, Material, MaterialRequests } = Db
const Op = Db.Sequelize.Op
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
      let addMaterialsToRequest = requestData.Materials.reduce(
        (promiseChain, materialData) => {
          return promiseChain.then(() => new Promise((resolve) => {
            MaterialsController.find(materialData.id).then(material => {
              request.addMaterial(material, {
                through: { quantity: materialData.quantity }
              }).then(() => {
                resolve()
              })
            })
          }))
        },
        Promise.resolve()
      )
      addMaterialsToRequest.then(() => {
        res.send(request)
      })
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar criar a requisição.'
      })
    }
  },
  async getAttribute (req, res) {
    try {
      let attribute = req.query['attribute']
      /* Request.aggregate(attribute,
        'distinct',
        { plain: false }
      ).then(result => {
        res.send(result)
      }) */
      Request.findAll({
        attributes: [[ attribute, 'value' ]],
        group: [ attribute ]
      }).then(r => {
        res.send(r)
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
      filter.issueDate = {
        [Op.gte]: filter.initialDate,
        [Op.lte]: filter.finalDate
      }
      filter.initialDate = null
      filter.finalDate = null
      delete filter.initialDate
      delete filter.finalDate

      let request = await Request.findAll({
        order: Db.sequelize.literal('id DESC'),
        where: {
          [Op.and]: filter
        },
        include: [{
          model: Material,
          attributes: [ 'description' ]
        }],
        attributes: [ 'authorizer', 'applicant' ]
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
      await Request.update(req.body, {
        where: {
          id: req.params.requestId
        }
      })
      res.send('Requisição atualizada!')
    } catch (err) {
      console.log(err)
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
  },
  async updateQuantity (requestId, materialId, quantity) {
    try {
      MaterialRequests.update({
        quantity: quantity
      },
      {
        where: {
          [Op.and]: [
            {
              RequestId: requestId
            },
            {
              MaterialId: materialId
            }
          ]
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
}
