import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/HomeView.vue'
import Materials from './views/MaterialsView.vue'
import Suppliers from './views/SuppliersView.vue'
import Requests from './views/RequestsView.vue'
import Invoices from './views/InvoicesView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/materials',
      name: 'materials',
      component: Materials
    },
    {
      path: '/suppliers',
      name: 'suppliers',
      component: Suppliers
    },
    {
      path: '/requests',
      name: 'requests',
      component: Requests
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: Invoices
    }
  ]
})
