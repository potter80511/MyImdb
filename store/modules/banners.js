import * as firebase from 'firebase';

export default {
  state: {
    indexBanners: [],
    seriesListBanners: [],
    moviesListBanners: [],
    indexBannersIsLoading: true,
    listBannersIsLoading: true,
  },
  mutations: { //更改狀態
    setIndexBanners(state, payload) {
      state.indexBanners = payload
      state.indexBannersIsLoading = false
    },
    setSeriesListBanners(state, payload) {
      state.seriesListBanners = payload
      state.listBannersIsLoading = false
    },
    setMoviesListBanners(state, payload) {
      state.moviesListBanners = payload
      state.listBannersIsLoading = false
    },
  },
  actions: {
    loadedIndexBanners({commit}) {
      firebase.database().ref('index_banner').once('value')
        .then((data) => {
          const banners = data.val()
          commit('setIndexBanners', banners)
        })
    },
    loadedSeriesListBanners({commit}) {
      firebase.database().ref('list_banner').orderByChild('type').equalTo('series').once('value')
        .then((data) => {
          const banners = data.val().filter(item => (item!=null));
          commit('setSeriesListBanners', banners)
        })
    },
    loadedMoviesListBanners({commit}) {
      firebase.database().ref('list_banner').orderByChild('type').equalTo('movies').once('value')
        .then((data) => {
          const banners = data.val().filter(item => (item!=null));
          commit('setMoviesListBanners', banners)
        })
    },
  },
  getters: {
  }
}