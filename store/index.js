import Vuex from 'vuex';
import * as firebase from 'firebase';
// modules
import banners from './modules/banners';
import admin from './modules/admin';
import toolsData from './modules/toolsData';

const createStore = () => {
  return new Vuex.Store({
    state: {
      allFilmsKeys: [],
      ...JSON.parse(JSON.stringify(banners.state)),
      ...JSON.parse(JSON.stringify(admin.state)),
      ...JSON.parse(JSON.stringify(toolsData.state)),
      movies: [],
      series: [],
      currentFilm: null,
      moviesIsLoading: true,
      seriesIsLoading: true,
    },
    mutations: { //更改狀態
      setAllFilmsKeys(state, payload) {
        state.allFilmsKeys = payload
      },
      ...banners.mutations,
      ...admin.mutations,
      ...toolsData.mutations,
      // setLoadedMovies(state, payload) {
      //   state.movies = payload
      //   state.moviesIsLoading = false
      // },
      // setLoadedSeries(state, payload) {
      //   state.series = payload
      //   state.seriesIsLoading = false
      // },
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
      // loadedMovies({commit}) {
      //   firebase.database().ref('movies').orderByChild('type').equalTo('movies').once('value')
      //     .then((data) => {
      //       const movies = []
      //       const obj = data.val()

      //       for (let key in obj) { // key剛好等於每包電影物件的key name
      //         movies.push({
      //           id: key,
      //           area: obj[key].area,
      //           name: obj[key].name,
      //           brief: obj[key].brief,
      //           categories: obj[key].categories,
      //           cast: obj[key].cast,
      //           director: obj[key].director,
      //           wallpaper: obj[key].wallpaper,
      //           rates: obj[key].rates,
      //           related: obj[key].related,
      //           favorite: obj[key].favorite,
      //           my_rate: obj[key].my_rate,
      //           imdb_id: obj[key].imdb_id,
      //           tw_name: obj[key].tw_name,
      //           type: obj[key].type,
      //           list_banner: obj[key].list_banner,
      //           year: obj[key].year,
      //         })
      //       }
      //       // console.log(movies, 'store')
      //       commit('setLoadedMovies', movies)
      //     })
      // },
      // loadedSeries({commit}) {
      //   firebase.database().ref('movies').orderByChild('type').equalTo('series').once('value')
      //     .then((data) => {
      //       const series = []
      //       const obj = data.val()

      //       for (let key in obj) {
      //         series.push({
      //           id: key,
      //           name: obj[key].name,
      //           area: obj[key].area,
      //           brief: obj[key].brief,
      //           categories: obj[key].categories,
      //           cast: obj[key].cast,
      //           wallpaper: obj[key].wallpaper,
      //           rates: obj[key].rates,
      //           favorite: obj[key].favorite,
      //           my_rate: obj[key].my_rate,
      //           index_banner: obj[key].index_banner,
      //           banner: obj[key].banner,
      //           imdb_id: obj[key].imdb_id,
      //           tw_name: obj[key].tw_name,
      //           type: obj[key].type,
      //           list_banner: obj[key].list_banner,
      //           writers: obj[key].writers,
      //           year: obj[key].year,
      //         })
      //       }
      //       // console.log(series, 'store')
      //       commit('setLoadedSeries', series)
      //     })
      // },
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
