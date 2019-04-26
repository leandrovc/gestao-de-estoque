module.exports = (sequelize, DataTypes) => {
  const Telephone = sequelize.define('Telephone', {
    number: {
      type: DataTypes.STRING(13)
    }
  }, {
    timestamps: false
  })
  return Telephone
}
