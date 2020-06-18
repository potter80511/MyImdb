import * as firebase from 'firebase';

export default {
  state: {
    movies: [],
    series: [],
    moviesIsLoading: true,
    seriesIsLoading: true,
    filmIsLoading: true,
    currentMovieFilm: null,
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
    setCurrentMovieFilm(state, payload) {
      state.currentMovieFilm = payload
      state.filmIsLoading = false
    },
  },
  actions: {
    loadedMovies({commit}) {
      firebase.database().ref('movies').once('value')
        .then((data) => {
          let movies = [];
          if (data.val()) {
            movies = data.val();
          }
          commit('setLoadedMovies', movies)
        })
    },
    loadedSeries({commit}) {
      firebase.database().ref('series').once('value')
        .then((data) => {
          let series = [];
          if (data.val()) {
            series = data.val();
          }
          commit('setLoadedSeries', series)
        })
    },
    loadedMovieFilm({commit}, [route_type, imdb_id]) {
      firebase.database().ref(route_type).orderByChild('imdb_id').equalTo(imdb_id).once('value')
        .then((data) => {
          const obj = data.val()
          const film_data = obj[Object.keys(obj)[0]]

          commit('setCurrentMovieFilm', film_data)
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
    relatedMoviesSwiperData: (state) => (filterType, param) => {
      console.log(filterType)
      switch (filterType) {
        case 'RelatedSeries':
          const filterData = state.movies.filter(item => {
            return item.related_id === param.id;
          }).filter(film => film.current_key !== param.currentKey);
          return filterData;
        case 'SameDirector':
          const filterSameDirectorData = state.movies.filter(item => {
            return item.directors[0].id === param.dId;
          }).filter(film => film.current_key !== param.currentKey);
          return filterSameDirectorData;
      }
    },
  }
}
