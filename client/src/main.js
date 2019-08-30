import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import App from './components/App.vue'

sync(store, router)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
