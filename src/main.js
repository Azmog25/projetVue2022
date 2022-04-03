import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
<<<<<<< HEAD
import store from "@/store";
=======
import store from './store/index'
>>>>>>> 89752f460b49f463fca1e56e72fccfc4a5fc4c32

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
