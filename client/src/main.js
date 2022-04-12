import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import App from './components/App.vue'

sync(store, router)
console.log('process.env.SERVER_HOST_PORT', process.env.SERVER_HOST_PORT)
console.log('process.env.PORT', process.env.PORT)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

process.env.SERVER_HOST_PORT = `http://172.20.176.251:8080/`

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

console.log('process.env.SERVER_HOST_PORT', process.env.SERVER_HOST_PORT)
console.log('process.env.PORT', process.env.PORT)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

