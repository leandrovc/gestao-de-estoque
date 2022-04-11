const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../../db/config/config')
const db = {}

const sequelize = new Sequelize(config)

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Address.belongsTo(db.Supplier)
db.Supplier.hasOne(db.Address)

db.Telephone.belongsTo(db.Supplier)
db.Supplier.hasMany(db.Telephone)

db.Material.belongsToMany(db.Request, { through: db.MaterialRequests })
db.Request.belongsToMany(db.Material, { through: db.MaterialRequests })

db.Invoice.belongsTo(db.Supplier, { foreignKey: { allowNull: false } })
db.Supplier.hasMany(db.Invoice)

db.Material.belongsToMany(db.Invoice, { through: db.MaterialInvoices })
db.Invoice.belongsToMany(db.Material, { through: db.MaterialInvoices })

module.exports = db
