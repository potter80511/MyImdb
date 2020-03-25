import * as firebase from 'firebase';

export default {
  state: {
    relatedData: [],
    areasData: [],
  },
  mutations: { //更改狀態
    setRelatedData(state, payload) {
      state.relatedData = payload
    },
    setAreasData(state, payload) {
      state.areasData = payload
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
    loadedAreasData({commit}) {
      firebase.database().ref('areas').once('value')
        .then((data) => {
          const datas = data.val();
          commit('setAreasData', datas)
        }).catch(error => {
          console.log(error)
        });
    },
  },
  getters: {
  }
}