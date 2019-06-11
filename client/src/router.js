import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Materials from './views/Materials.vue'
import Suppliers from './views/Suppliers.vue'
import Requests from './views/Requests.vue'

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
    }
  ]
})
