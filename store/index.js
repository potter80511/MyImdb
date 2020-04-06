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
      allFilmsKeys: [],
      ...JSON.parse(JSON.stringify(banners.state)),
      ...JSON.parse(JSON.stringify(admin.state)),
      ...JSON.parse(JSON.stringify(toolsData.state)),
      ...JSON.parse(JSON.stringify(films.state)),
      currentFilm: null,
    },
    mutations: { //更改狀態
      setAllFilmsKeys(state, payload) {
        state.allFilmsKeys = payload
      },
      ...banners.mutations,
      ...admin.mutations,
      ...toolsData.mutations,
      ...films.mutations,
      // setCurrentFilm(state, payload) {
      //   state.currentFilm = payload
      // },
    },
    actions: {
      loadedAllFilmsKeys({commit}) {
        firebase.database().ref('films/').once('value')
          .then((data) => {
            const filmDatas = data.val()
            const filmKeys = filmDatas ? filmDatas.map((item, index) => (index)) : [];
            commit('setAllFilmsKeys', filmKeys)
          })
      },
      ...banners.actions,
      ...admin.actions,
      ...toolsData.actions,
      ...films.actions,
      // loadedFilm({commit}, imdb_id) {
      //   firebase.database().ref('movies').orderByChild('imdb_id').equalTo(imdb_id).once('value')
      //     .then((data) => {
      //       const obj = data.val()
      //       const film_data = obj[Object.keys(obj)[0]]

      //       commit('setCurrentFilm', film_data)
      //     })
      // },
    },
    getters: {
      ...admin.getters,
      ...films.getters,
      // filterFavoriteMovies(state) {
      //   const filterData = state.movies.filter((o) => {
      //     return o.favorite === true
      //   });
      //   return filterData;
      // },
      // filterFavoriteSeries(state) {
      //   const filterData = state.series.filter((o) => {
      //     return o.favorite === true
      //   });
      //   return filterData;
      // },
    }
  })
}

export default createStore;
