import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import store from './store'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(axios)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let flag = localStorage.getItem('Flag');
  if(flag == 'isLogin'){    
    if(to.meta.isLogin != null && !to.meta.isLogin){
      next({path:'/'})
    } else{  
      next();
    }
  } else {
    if(to.meta.isLogin){
      next({path:'/login'});
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
