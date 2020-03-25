import * as firebase from 'firebase';

export default {
  state: {
    isLogin: false,
    loginUser: '',
  },
  mutations: { //更改狀態
    setIsLogin(state, payload) {
      state.isLogin = payload
    },
    setLoginUser(state, payload) {
      state.loginUser = payload
    },
  },
  actions: {
    loginState({commit}) {
      firebase.auth().onAuthStateChanged(user => {
        const isLogin = user ? true : false;
        commit('setIsLogin', isLogin)
        if (user) {
          const email = user.email;
          commit('setLoginUser', email)
          console.log(`login ${isLogin}, `, `Admin is ${email}`)
        } else {
          commit('setLoginUser', '')
          console.log(`login ${isLogin}, `, `Admin not login`)
        }
      });
    },
  },
  getters: {
    getLoginState(state) {
      return state.isLogin
    },
  }
}