import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ScriptPage',
    name: 'ScriptPage',
    component: () => import(/* webpackChunkName: "ScriptPage" */ '../views/ScriptPage.vue')
  },
  {
    path: '/ScriptDetail',
    name: 'ScriptDetail',
    component: () => import(/* webpackChunkName: "ScriptDetail" */ '../views/ScriptDetail.vue')
  },
  {
    path: '/MemberInfo/:infoPage',
    name: 'MemberInfo',
    component: () => import(/* webpackChunkName: "MemberInfo" */ '../views/MemberInfo.vue'),
    props:true
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
