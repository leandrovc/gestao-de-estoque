module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'infraestrutura',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1234',
    dialect: process.env.DIALECT || 'mariadb',
    host: process.env.HOST || 'localhost',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}
