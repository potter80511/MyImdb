import Vuex from 'vuex';
import * as firebase from 'firebase';
// modules
import banners from './modules/banners';
import admin from './modules/admin';
import toolsData from './modules/toolsData';
import films from './modules/films';

const createStore = () => {
  return new Vuex.Store({
    state: {
      allSeriesKeys: [],
      allMoviesKeys: [],
      ...JSON.parse(JSON.stringify(banners.state)),
      ...JSON.parse(JSON.stringify(admin.state)),
      ...JSON.parse(JSON.stringify(toolsData.state)),
      ...JSON.parse(JSON.stringify(films.state)),
    },
    mutations: { //更改狀態
      setAllSeriesKeys(state, payload) {
        state.allSeriesKeys = payload
      },
      setAllMoviesKeys(state, payload) {
        state.allMoviesKeys = payload
      },
      ...banners.mutations,
      ...admin.mutations,
      ...toolsData.mutations,
      ...films.mutations,
    },
    actions: {
      loadedAllSeriesKeys({commit}) {
        firebase.database().ref('series/').once('value')
          .then((data) => {
            const filmDatas = data.val()
            const filmKeys = filmDatas ? filmDatas.map((item, index) => (index)) : [];
            commit('setAllSeriesKeys', filmKeys)
          })
      },
      loadedAllMoviesKeys({commit}) {
        firebase.database().ref('movies/').once('value')
          .then((data) => {
            const filmDatas = data.val()
            const filmKeys = filmDatas ? filmDatas.map((item, index) => (index)) : [];
            commit('setAllMoviesKeys', filmKeys)
          })
      },
      ...banners.actions,
      ...admin.actions,
      ...toolsData.actions,
      ...films.actions,
    },
    getters: {
      ...admin.getters,
      ...films.getters,
    }
  })
}

export default createStore;
