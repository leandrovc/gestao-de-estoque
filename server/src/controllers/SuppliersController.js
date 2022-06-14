const Db = require('../models/index')
const { Supplier, Address, Telephone } = Db
const Op = Db.Sequelize.Op
const AddressesController = require('./AddressesController')
const TelephonesController = require('./TelephonesController')

module.exports = {
  async show (req, res) {
    try {
      let supplier = await Supplier.findByPk(
        req.params.supplierId,
        { include: [{ model: Address }, { model: Telephone }] }
      )
      res.send(supplier)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o fornecedor.'
      })
    }
  },
  async create (req, res) {
    try {
      let supplier = await Supplier.create(
        req.body,
        { include: [{ model: Address }, { model: Telephone }] }
      )
      res.send(supplier)
    } catch (err) {
      // TODO handle SequelizeUniqueConstraintError
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar criar o fornecedor.'
      })
    }
  },
  async search (req, res) {
    try {
      let searchText = req.query['search']
      let supplier = await Supplier.findAll({
        where: {
          socialName: {
            [Op.like]: '%' + searchText + '%'
          }
        },
        include: [{ model: Address }, { model: Telephone }]
      })
      res.send(supplier)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o(s) fornecedor(es).'
      })
    }
  },
  async searchSocialName (req, res) {
    try {
      let searchText = req.query['search']
      let suppliers = await Supplier.findAll({
        attributes: [ 'id', 'socialName' ],
        where: {
          socialName: {
            [Op.like]: '%' + searchText + '%'
          }
        }
      })
      res.send(suppliers)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o fornecedor.'
      })
    }
  },
  async showAll (req, res) {
    try {
      let supplier = await Supplier.findAll({
        order: Db.sequelize.literal('id DESC'),
        include: [{ model: Address }, { model: Telephone }]
      })
      res.send(supplier)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o(s) fornecedor(es).'
      })
    }
  },
  async update (req, res) {
    try {
      let supplier = req.body
      let address = req.body.Address
      let telephones = req.body.Telephones

      await Supplier.update(supplier, {
        where: {
          id: req.params.supplierId
        }
      })
      await AddressesController.update(address)
      await telephones.forEach(telephone => {
        if (telephone.id) {
          TelephonesController.update(telephone)
        } else {
          Supplier.findOne({
            where: {
              id: supplier.id
            }
          }).then(s => {
            TelephonesController.add(telephone, s)
          })
        }
      })
      res.send('Fornecedor atualizado!')
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar atualizar o fornecedor.'
      })
    }
  },
  async delete (req, res) {
    try {
      let supplierId = req.params.supplierId
      await AddressesController.exclude(supplierId)
      await TelephonesController.exclude(supplierId)
      await Supplier.destroy({
        where: {
          id: supplierId
        }
      })
      res.send('Fornecedor excluído!')
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar excluir o fornecedor.'
      })
    }
  }
}
