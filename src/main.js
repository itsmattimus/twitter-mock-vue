import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'
import Buefy from 'buefy'
import './assets/scss/app.scss'

Vue.use(Buefy)
Vue.config.productionTip = false

let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  //dispatch an action on a page reload if a user is logged in
  if (user) {
    store.dispatch('fetchUserProfile', user)
  }
})


