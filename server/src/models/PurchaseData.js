module.exports = (sequelize, DataTypes) => {
  const PurchaseData = sequelize.define('PurchaseData', {
    brand: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    },
    unitaryValue: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false
    }
  }, {
    timestamps: false
  })
  return PurchaseData
}
