import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/style/init.scss'  // 全局样式
// import '@/style/iconfont.css'   //阿里巴巴图标样式
import '@/style/iconfont.js'


Vue.config.productionTip = false


// router.beforeEach((to, from, next) => {
//   next();
  
// })
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
