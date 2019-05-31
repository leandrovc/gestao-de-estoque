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
        error: 'Ocorreu um erro ao tentar criar o material.'
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
  async getLatest (req, res) {
    try {
      let material = await Material.findAll({
        limit: 5,
        order: Db.sequelize.literal('id DESC')
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
        error: 'Ocorreu um erro ao tentar atualizar o material.'
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
  }
}
