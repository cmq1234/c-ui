import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CUi from '../packages/index'
import '../lib/theme-chalk/index.css'
// import '../packages/theme-default/lib/index.css'
Vue.config.productionTip = false
Vue.use(CUi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
