import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/services/AuthService'

Vue.use(Vuex)

const auth_key = "auth-user" // keyName
let auth_service = JSON.parse(localStorage.getItem(auth_key))

const initialState = { // state เริ่มต้น
    user: auth_service ? auth_service.user: "",
    jwt: auth_service ? auth_service.jwt: "",
    isAuthen: auth_service ? true: false
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
      loginSuccess(state, user, jwt){
        state.user = user
        state.jwt = jwt
        state.isAuthen = true
      },
      logoutSuccess(state){
        state.user = ""
        state.jwt = ""
        state.isAuthen = false
      }
  },
  actions: {
      async login({commit},{email, password}){
        let res = await AuthService.login({email, password})
        if(res.success){
            commit('loginSuccess', res.user, res.jwt)
        }
        return res
      },
      async register({commit},{username, email, password}){
        let res = await AuthService.register({username, email, password})
        if(res.success){
            commit('loginSuccess', res.user, res.jwt)
        }
        return res
      },
      async logout(){
          AuthService.logout()
          this.commit('logoutSuccess')
      }
  },
  getters:{
    user: (state) => state.user,
    jwt: (state) => state.jwt,
    isAuthen: (state) => state.isAuthen
  },
  modules: {
  }
})
