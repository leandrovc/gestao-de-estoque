module.exports = (sequelize, DataTypes) => {
  const MaterialRequests = sequelize.define('MaterialRequests', {
    quantity: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false
    }
  }, {
    timestamps: false
  })
  return MaterialRequests
}
