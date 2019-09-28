import Vue from 'vue'
import App from './App.vue'
import router from './router'
import flow from './lib/flow'

Vue.config.productionTip = false
flow.use(router);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
