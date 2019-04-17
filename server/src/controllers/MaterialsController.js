const { Material } = require('../models/index')

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
  }
}
