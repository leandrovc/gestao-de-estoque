const Db = require('../models/index')
const { Material } = Db
const Op = Db.Sequelize.Op

module.exports = {
  async show (req, res) {
    try {
      let material = await Material.findByPk(req.params.materialId)
      res.send(material)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o material.'
      })
    }
  },
  async create (req, res) {
    try {
      let material = await Material.create(req.body)
      res.send(material)
    } catch (err) {
      res.status(500).send({
        error: err.original.text
      })
    }
  },
  async search (req, res) {
    try {
      let searchText = req.query['search']
      let material = await Material.findAll({
        where: {
          [Op.or]: [
            {
              description: {
                [Op.like]: '%' + searchText + '%'
              }
            },
            {
              group: {
                [Op.like]: '%' + searchText + '%'
              }
            },
            {
              code: {
                [Op.like]: '%' + searchText + '%'
              }
            }
          ]
        }
      })
      res.send(material)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o(s) material(is).'
      })
    }
  },
  async searchDescription (req, res) {
    try {
      let searchText = req.query['search']
      let material = await Material.findAll({
        attributes: [ 'id', 'description' ],
        where: {
          description: {
            [Op.like]: '%' + searchText + '%'
          }
        }
      })
      res.send(material)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o(s) material(is).'
      })
    }
  },
  async getLatest (req, res) {
    try {
      let material = await Material.findAll({
        limit: 10,
        order: Db.sequelize.literal('id DESC')
      })
      res.send(material)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o(s) material(is).'
      })
    }
  },
  async getLastGroupCode (req, res) {
    try {
      let groupToSearch = req.query['group']
      let materialCode = await Material.findAll({
        attributes: [ 'code' ],
        where: {
          group: groupToSearch
        },
        limit: 1,
        order: Db.sequelize.literal('code DESC')
      })
      res.send(materialCode)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o(s) material(is).'
      })
    }
  },
  async getLowQuantity (req, res) {
    try {
      let material = await Material.findAll({
        where: {
          currentQuantity: {
            [Op.lte]: Db.sequelize.col('minimumQuantity')
          }
        }
      })
      res.send(material)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o(s) material(is).'
      })
    }
  },
  async update (req, res) {
    try {
      let material = await Material.update(req.body, {
        where: {
          id: req.params.materialId
        }
      })
      res.send(material)
    } catch (err) {
      res.status(500).send({
        error: err.original.text
      })
    }
  },
  async delete (req, res) {
    try {
      await Material.destroy({
        where: {
          id: req.params.materialId
        }
      })
      res.send('Material excluído!')
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar excluir o material.'
      })
    }
  },
  async find (id) {
    try {
      return await Material.findByPk(id)
    } catch (err) {
      console.log('Ocorreu um erro ao tentar buscar o material.', err)
    }
  },
  async changeQuantity (id, quantity) {
    this.find(id).then(material => {
      let m = material.dataValues
      m.currentQuantity += quantity
      Material.update(m, {
        where: {
          id: id
        }
      })
    })
  },
  async addToInventory (id, quantity) {
    this.changeQuantity(id, quantity)
  },
  async quantityAvailable (id, quantity) {
    let material = await this.find(id)
    return material.dataValues.currentQuantity >= quantity
  },
  async removeFromInventory (id, quantity) {
    this.changeQuantity(id, -quantity)
  }
}
