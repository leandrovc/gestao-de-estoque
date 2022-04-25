module.exports = (sequelize, DataTypes) => {
  const MaterialInvoices = sequelize.define('MaterialInvoices', {
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
  })
  return MaterialInvoices
}
