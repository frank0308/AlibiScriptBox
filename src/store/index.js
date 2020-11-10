import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth
  },
  plugins:[createPersistedState({
    //設定儲存地點
    storage:window.localStorage,
    
    reducer(val){
      //只儲存特定的module
      return{
        auth:val.auth
      }
    }
  })]
})
