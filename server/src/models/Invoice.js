module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    number: {
      type: DataTypes.STRING(7),
      allowNull: false
    },
    issueDate: {
      type: DataTypes.DATEONLY
    }
  })
  return Invoice
}
