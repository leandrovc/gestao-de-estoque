const Db = require('../models/index')
const { Material } = Db
const Op = Db.Sequelize.Op

module.exports = {
  async index (req, res) {
    try {
      const materials = await Material.findAll({
        limit: 25
      })
      res.send(materials)
    } catch (err) {
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar os materiais.'
      })
    }
  },
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
      console.log('TESTE', '%' + req.params.searchText + '%')
      const material = await Material.findAll({
        where: {
          [Op.or]: [
            {
              description: {
                [Op.like]: '%' + req.params.searchText + '%'
              }
            },
            {
              group: {
                [Op.like]: '%' + req.params.searchText + '%'
              }
            },
            {
              code: {
                [Op.like]: '%' + req.params.searchText + '%'
              }
            }
          ]
        }
      })
      res.send(material)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar buscar o(s) material(is).'
      })
    }
  }
}
