'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    // Materials
    await queryInterface.addColumn(
      'Materials',
      'createdAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.addColumn(
      'Materials',
      'updatedAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.bulkUpdate('Materials', { createdAt: new Date() }, { createdAt: null })
    await queryInterface.bulkUpdate('Materials', { updatedAt: new Date() }, { updatedAt: null })
    // Address
    await queryInterface.addColumn(
      'Addresses',
      'createdAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.addColumn(
      'Addresses',
      'updatedAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.bulkUpdate('Addresses', { createdAt: new Date() }, { createdAt: null })
    await queryInterface.bulkUpdate('Addresses', { updatedAt: new Date() }, { updatedAt: null })
    // Invoice
    await queryInterface.addColumn(
      'Invoices',
      'createdAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.addColumn(
      'Invoices',
      'updatedAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.bulkUpdate('Invoices', { createdAt: new Date() }, { createdAt: null })
    await queryInterface.bulkUpdate('Invoices', { updatedAt: new Date() }, { updatedAt: null })
    // MaterialInvoices
    await queryInterface.addColumn(
      'MaterialInvoices',
      'createdAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.addColumn(
      'MaterialInvoices',
      'updatedAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.bulkUpdate('MaterialInvoices', { createdAt: new Date() }, { createdAt: null })
    await queryInterface.bulkUpdate('MaterialInvoices', { updatedAt: new Date() }, { updatedAt: null })
    // MaterialRequests
    await queryInterface.addColumn(
      'MaterialRequests',
      'createdAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.addColumn(
      'MaterialRequests',
      'updatedAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.bulkUpdate('MaterialRequests', { createdAt: new Date() }, { createdAt: null })
    await queryInterface.bulkUpdate('MaterialRequests', { updatedAt: new Date() }, { updatedAt: null })
    // Request
    await queryInterface.addColumn(
      'Requests',
      'createdAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.addColumn(
      'Requests',
      'updatedAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.bulkUpdate('Requests', { createdAt: new Date() }, { createdAt: null })
    await queryInterface.bulkUpdate('Requests', { updatedAt: new Date() }, { updatedAt: null })
    // Supplier
    await queryInterface.addColumn(
      'Suppliers',
      'createdAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.addColumn(
      'Suppliers',
      'updatedAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.bulkUpdate('Suppliers', { createdAt: new Date() }, { createdAt: null })
    await queryInterface.bulkUpdate('Suppliers', { updatedAt: new Date() }, { updatedAt: null })
    // Telephone
    await queryInterface.addColumn(
      'Telephones',
      'createdAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.addColumn(
      'Telephones',
      'updatedAt',
      {
        type: Sequelize.DATE
      }
    )
    await queryInterface.bulkUpdate('Telephones', { createdAt: new Date() }, { createdAt: null })
    await queryInterface.bulkUpdate('Telephones', { updatedAt: new Date() }, { updatedAt: null })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Materials', 'createdAt')
    await queryInterface.removeColumn('Materials', 'updatedAt')
    await queryInterface.removeColumn('Addresses', 'createdAt')
    await queryInterface.removeColumn('Addresses', 'updatedAt')
    await queryInterface.removeColumn('Invoices', 'createdAt')
    await queryInterface.removeColumn('Invoices', 'updatedAt')
    await queryInterface.removeColumn('MaterialInvoices', 'createdAt')
    await queryInterface.removeColumn('MaterialInvoices', 'updatedAt')
    await queryInterface.removeColumn('MaterialRequests', 'createdAt')
    await queryInterface.removeColumn('MaterialRequests', 'updatedAt')
    await queryInterface.removeColumn('Requests', 'createdAt')
    await queryInterface.removeColumn('Requests', 'updatedAt')
    await queryInterface.removeColumn('Suppliers', 'createdAt')
    await queryInterface.removeColumn('Suppliers', 'updatedAt')
    await queryInterface.removeColumn('Telephones', 'createdAt')
    await queryInterface.removeColumn('Telephones', 'updatedAt')
  }
}
