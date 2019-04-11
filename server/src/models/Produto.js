module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('produto', {
    idproduto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    grupo: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: true
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qtdAtual: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      field: 'qtd_atual'
    },
    qtdMinima: {
      type: DataTypes.DECIMAL(6, 2),
      defaultValue: 0,
      field: 'qtd_minima'
    },
    unidade: {
      type: DataTypes.STRING(2),
      defaultValue: 'pc'
    }
  })

  return Produto
}
