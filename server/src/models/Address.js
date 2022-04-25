module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    street: {
      type: DataTypes.STRING
    },
    number: {
      type: DataTypes.STRING(5)
    },
    district: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING(2)
    },
    cep: {
      type: DataTypes.STRING(9),
      allowNull: false
    }
  })
  return Address
}
