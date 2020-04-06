import * as firebase from 'firebase';

export default {
  state: {
    movies: [],
    series: [],
    moviesIsLoading: true,
    seriesIsLoading: true,
  },
  mutations: { //更改狀態
    setLoadedMovies(state, payload) {
      state.movies = payload
      state.moviesIsLoading = false
    },
    setLoadedSeries(state, payload) {
      state.series = payload
      state.seriesIsLoading = false
    },
  },
  actions: {
    loadedMovies({commit}) {
      firebase.database().ref('films').orderByChild('type').equalTo('movies').once('value')
        .then((data) => {
          let movies = [];
          if (data.val()) {
            movies = data.val();
          }
          commit('setLoadedMovies', movies)
        })
    },
    loadedSeries({commit}) {
      firebase.database().ref('films').orderByChild('type').equalTo('series').once('value')
        .then((data) => {
          let series = [];
          if (data.val()) {
            series = data.val();
          }
          commit('setLoadedSeries', series)
        })
    },
  },
  getters: {
    favoriteMovies(state) {
      const filterData = state.movies.filter(item => {
        return item.favorite === true
      });
      return filterData;
    },
    favoriteSeries(state) {
      const filterData = state.series.filter(item => {
        return item.favorite === true
      });
      return filterData;
    },
  }
}