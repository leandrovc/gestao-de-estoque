require('dotenv').config({ path: '../.env' })

module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: process.env.DIALECT,
  host: process.env.HOST,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    useUTC: false
  },
  timezone: '-03:00'
}
