const MaterialsController = require('./controllers/MaterialsController')

module.exports = (app) => {
  app.get('/materials',
    MaterialsController.index)
}
