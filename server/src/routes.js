const MaterialsController = require('./controllers/MaterialsController')
const SuppliersController = require('./controllers/SuppliersController')
const TelephonesController = require('./controllers/TelephonesController')
const RequestsController = require('./controllers/RequestsController')
const InvoicesController = require('./controllers/InvoicesController')

module.exports = (app) => {
  app.post('/materials',
    MaterialsController.create)
  app.get('/materials?',
    MaterialsController.search)
  app.get('/materials=searchDescription?',
    MaterialsController.searchDescription)
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
  app.get('/suppliers=showAll',
    SuppliersController.showAll)
  app.put('/suppliers/:supplierId',
    SuppliersController.update)
  app.delete('/suppliers/:supplierId',
    SuppliersController.delete)

  app.delete('/telephones/:telephoneId',
    TelephonesController.delete)

  app.post('/requests',
    RequestsController.create)
  app.get('/requests?',
    RequestsController.search)
  app.get('/requests/:requestId',
    RequestsController.show)
  app.get('/requests=showAll',
    RequestsController.showAll)
  app.put('/requests/:requestId',
    RequestsController.update)
  app.delete('/requests/:requestId',
    RequestsController.delete)
  app.get('/requests=getAttributeOptions?',
    RequestsController.getAttributeOptions)

  app.post('/invoices',
    InvoicesController.create)
  app.get('/invoices?',
    InvoicesController.search)
  app.get('/invoices/:invoiceId',
    InvoicesController.show)
  app.get('/invoices=showAll',
    InvoicesController.showAll)
  app.put('/invoices/:invoiceId',
    InvoicesController.update)
  app.delete('/invoices/:invoiceId',
    InvoicesController.delete)
}
