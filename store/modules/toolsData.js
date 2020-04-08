import * as firebase from 'firebase';

export default {
  state: {
    relatedData: [],
    areasData: [],
    categoriesData: [],
    entertainmentData: [],
  },
  mutations: { //更改狀態
    setRelatedData(state, payload) {
      state.relatedData = payload
    },
    setAreasData(state, payload) {
      state.areasData = payload
    },
    setCategoriesData(state, payload) {
      state.categoriesData = payload
    },
    setEntertainmentData(state, payload) {
      state.entertainmentData = payload
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
    loadedCategoriesData({commit}) {
      firebase.database().ref('categories').once('value')
        .then((data) => {
          const datas = data.val();
          commit('setCategoriesData', datas)
        }).catch(error => {
          console.log(error)
        });
    },
    loadedEntertainmentData({commit}) {
      firebase.database().ref('entertainment').once('value')
        .then((data) => {
          const datas = data.val();
          commit('setEntertainmentData', datas)
        }).catch(error => {
          console.log(error)
        });
    },
  },
  getters: {
  }
}