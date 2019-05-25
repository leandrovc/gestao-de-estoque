const Db = require('../models/index')
const { Address } = Db

module.exports = {
  async update (address) {
    try {
      return await Address.update(address, {
        where: {
          id: address.id
        }
      })
    } catch (err) {
      console.log('Ocorreu um erro ao tentar atualizar o endereço.\n', err)
    }
  },
  async exclude (supplierId) {
    try {
      await Address.destroy({
        where: {
          SupplierId: supplierId
        }
      })
      console.log('Endereço excluído!')
    } catch (err) {
      console.log('Ocorreu um erro ao tentar excluir o endereço.\n', err)
    }
  }
}
