const Db = require('../models/index')
const { Telephone } = Db

module.exports = {
  async add (telephone, supplier) {
    try {
      Telephone.create(telephone).then(newTel => {
        return newTel.setSupplier(supplier)
      })
    } catch (err) {
      console.log('Ocorreu um erro ao tentar criar o telefone.', err)
    }
  },
  async update (telephone) {
    try {
      return Telephone.update(telephone, {
        where: {
          id: telephone.id
        }
      })
    } catch (err) {
      console.log('Ocorreu um erro ao tentar atualizar o telefone.\n', err)
    }
  },
  async delete (req, res) {
    try {
      await Telephone.destroy({
        where: {
          id: req.params.telephoneId
        }
      })
      res.send('Telefone excluído!')
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'Ocorreu um erro ao tentar excluir o fornecedor.'
      })
    }
  },
  async exclude (supplierId) {
    try {
      return await Telephone.destroy({
        where: {
          SupplierId: supplierId
        }
      })
    } catch (err) {
      console.log('Ocorreu um erro ao tentar excluir o fornecedor.', err)
    }
  }
}
