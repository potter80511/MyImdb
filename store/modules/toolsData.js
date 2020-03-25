import * as firebase from 'firebase';

export default {
  state: {
    relatedData: [],
  },
  mutations: { //更改狀態
    setRelatedData(state, payload) {
      state.relatedData = payload
    },
  },
  actions: {
    loadedRelatedDatas({commit}) {
      firebase.database().ref('related_film').once('value')
        .then((data) => {
          const datas = data.val();
          commit('setRelatedData', datas)
        })
    },
  },
  getters: {
  }
}