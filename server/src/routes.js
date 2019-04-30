const MaterialsController = require('./controllers/MaterialsController')

module.exports = (app) => {
  app.post('/materials',
    MaterialsController.post)
  app.get('/materials?',
    MaterialsController.search)
  app.get('/materials/:materialId',
    MaterialsController.show)
}
