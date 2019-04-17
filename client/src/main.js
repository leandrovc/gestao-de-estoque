import Vue from 'vue'
import App from './components/App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#245A37',
    secondary: '#C5E0D8',
    accent: '#B5FFE9'
  }
})

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
