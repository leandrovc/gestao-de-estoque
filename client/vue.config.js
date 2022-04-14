const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
var env = dotenv.config({path: '../.env'})
dotenvExpand(env)

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
}