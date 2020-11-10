import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      isLogin:null
    }
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "SignUp" */ '../views/SignUpPage.vue'),
    meta:{
      isLogin:false
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LoginPage.vue'),
    meta:{
      isLogin:false
    }
  },
  {
    path: '/ScriptPage',
    name: 'ScriptPage',
    component: () => import(/* webpackChunkName: "ScriptPage" */ '../views/ScriptPage.vue'),
    meta:{
      isLogin:null
    }
  },
  {
    path: '/ScriptDetail',
    name: 'ScriptDetail',
    component: () => import(/* webpackChunkName: "ScriptDetail" */ '../views/ScriptDetail.vue'),
    meta:{
      isLogin:null
    }
  },
  {
    path: '/MemberInfo/:infoPage',
    name: 'MemberInfo',
    component: () => import(/* webpackChunkName: "MemberInfo" */ '../views/MemberInfo.vue'),
    props:true,
    meta:{
      isLogin:true
    }
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
