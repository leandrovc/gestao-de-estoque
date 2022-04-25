module.exports = (sequelize, DataTypes) => {
  const Telephone = sequelize.define('Telephone', {
    number: {
      type: DataTypes.STRING(15)
    }
  })
  return Telephone
}
