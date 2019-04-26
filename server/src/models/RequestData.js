module.exports = (sequelize, DataTypes) => {
  const RequestData = sequelize.define('RequestData', {
    quantity: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    }
  }, {
    timestamps: false
  })
  return RequestData
}
