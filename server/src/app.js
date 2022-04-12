require('dotenv').config({ path: require('path').resolve('../.env') })
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

const PORT = process.env.PORT || 8080

sequelize.sync()
  .then(() => {
    app.listen(PORT)
    console.log(`Server port ${PORT}`)
    console.log('DB_NAME', process.env.DB_NAME)
  })
