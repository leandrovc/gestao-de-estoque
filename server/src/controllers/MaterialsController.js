const Db = require('../models/index')
const { Material } = Db
const Op = Db.Sequelize.Op

module.exports = {
  async show (req, res) {
    try {
      const material = await Material.findByPk(req.params.materialId)
      res.send(material)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o material.'
      })
    }
  },
  async post (req, res) {
    try {
      const material = await Material.create(req.body)
      res.send(material)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar criar o material.'
      })
    }
  },
  async search (req, res) {
    try {
      const searchText = req.query['search']
      const material = await Material.findAll({
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
  }
}
