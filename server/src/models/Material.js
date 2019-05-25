module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define('Material', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    group: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    currentQuantity: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      defaultValue: 0
    },
    minimumQuantity: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      defaultValue: 0
    },
    unit: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: 'pc'
    }
  }, {
    timestamps: false
  })
  return Material
}
