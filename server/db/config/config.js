const ck = require('ckey')
module.exports = {
  database: ck.DB_NAME,
  username: ck.DB_USER,
  password: ck.DB_PASS,
  dialect: ck.DIALECT,
  host: ck.HOST,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
