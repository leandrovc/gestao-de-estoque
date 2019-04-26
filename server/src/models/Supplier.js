module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    cnpj: {
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true
    },
    socialName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })
  return Supplier
}
