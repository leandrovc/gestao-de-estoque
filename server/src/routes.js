const MaterialsController = require('./controllers/MaterialsController')
const SuppliersController = require('./controllers/SuppliersController')
const TelephonesController = require('./controllers/TelephonesController')

module.exports = (app) => {
  app.post('/materials',
    MaterialsController.post)
  app.get('/materials?',
    MaterialsController.search)
  app.get('/materials/:materialId',
    MaterialsController.show)
  app.get('/materials=getLatest',
    MaterialsController.getLatest)
  app.put('/materials/:materialId',
    MaterialsController.update)
  app.delete('/materials/:materialId',
    MaterialsController.delete)

  app.post('/suppliers',
    SuppliersController.create)
  app.get('/suppliers?',
    SuppliersController.search)
  app.get('/suppliers/:supplierId',
    SuppliersController.show)
  app.get('/suppliers=findAll',
    SuppliersController.findAll)
  app.put('/suppliers/:supplierId',
    SuppliersController.update)
  app.delete('/suppliers/:supplierId',
    SuppliersController.delete)

  app.delete('/telephones/:telephoneId',
    TelephonesController.delete)
}
