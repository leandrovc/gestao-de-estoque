import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Materials from './views/Materials.vue'
import CreateMaterial from './views/CreateMaterial.vue'

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
      path: '/materials/create',
      name: 'materials-create',
      component: CreateMaterial
    }
  ]
})
