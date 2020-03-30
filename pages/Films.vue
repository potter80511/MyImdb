<template>
  <div id="films">
    <BannerSlide
      :bannerData="bannerData"
      :background="true"
      :isLoading="listBannersIsLoading"
    />
    <div class="film_list">
      <div class="container">
        <FilterTools
          :sortBy="sortBy"
          v-model="sortBy"
          :filterAreaMethod="filterAreaMethod"
          :filterCategory="filterCategory"
          :filterYearMethod="filterYearMethod"
        />
        <div class="section-header">
          <h2>
            {{`${filmsListType}列表`}}
            <span>{{$route.name}}</span>
            <b-button
              id="show-btn"
              @click="$bvModal.show('new_film')"
              v-if="isLogin">
              <font-awesome-icon icon="plus-circle" />
              {{`新增${filmsListType}`}}
            </b-button>
          </h2>
        </div>
        <div
          class="isLoading"
          v-show="isLoading"
        >
          <font-awesome-icon icon="spinner" spin/>
        </div>
        <div class="row list_content" v-if="filmsData.length > 0">
          <div class="item col-lg-4 col-sm-6"
            v-for="(item, i) in filmsData"
            :key="i"
          >
            <nuxt-link :to="{ name: 'filmDetails-id', params: {id: item.imdb_id}}">
              <div class="image">
                <img :src="item.wallpaper" />
              </div>
              <div class="film_content">
                <div style="display: none;">{{item.current_key}}</div>
                <h3 class="name">{{item.tw_name}}</h3>
                <div class="rates" v-if="item.imdb_rates && sortBy === 'imdbRates'">
                  <b class="title">IMDB：</b>
                  <span v-for="(star, j) in rateStarWithEmpty(item.imdb_rates)"
                      :key="j">
                    <font-awesome-icon v-if="star==='star'" icon="star" />
                    <font-awesome-icon v-if="star==='half'" icon="star-half-alt" />
                    <font-awesome-icon v-if="star==='empty'" :icon="['far', 'star']"/>
                  </span>
                  <b>{{item.imdb_rates.toFixed(1)}}</b>
                </div>
                <div class="rates" v-else-if="item.my_rate && sortBy === 'myRates'">
                  <b class="title">我的評分：</b>
                  <span v-for="(star, j) in rateStarWithEmpty(item.my_rate)"
                      :key="j">
                    <font-awesome-icon v-if="star==='star'" icon="star" />
                    <font-awesome-icon v-if="star==='half'" icon="star-half-alt" />
                    <font-awesome-icon v-if="star==='empty'" :icon="['far', 'star']"/>
                  </span>
                  <b v-if="item.my_rate">{{item.my_rate.toFixed(1)}}</b>
                </div>
                <!--
                <div class="area">
                  <b>地區：</b>{{item.area}}
                </div>
                <div class="categories">
                  <b>種類</b>
                  <div>
                    <span v-for="(cate, i) in objToArray(item.categories)"
                      :key="i">
                    {{cate}}
                    </span>
                  </div>
                </div>
                <div class="director" v-if="item.type === 'movies' && item.director">
                  <b>導演：</b>
                  <div>
                    <span>{{item.director}}</span>
                  </div>
                </div>
                <div class="writers" v-else-if="item.type === 'series' && item.writers">
                  <b>編劇：</b>
                  <div>
                    <span v-for="(w, i) in objToArray(item.writers).slice(0, 3)"
                      :key="i">
                    {{w}}
                    </span>
                    <span v-if="objToArray(item.writers).length > 3">...</span>
                  </div>
                </div>
                <div class="cast" v-if="objToArray(item.cast)">
                  <b>主演：</b>
                  <div>
                    <span v-for="(c, i) in objToArray(item.cast).slice(0,3)"
                      :key="i">
                    {{c}}
                    </span>
                  </div>
                </div> -->
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="row list_content" v-else-if="filmsData.length === 0 && isLoading === false">
          <p class="no_result">沒有篩選結果</p>
        </div>
      </div>
    </div>
    <NewFilmModal
      :nextKey="nextKey"
      :filmsListType="filmsListType"
      :relatedDatas="relatedDatas"
      :areasData="areasData"
      :categoriesData="categoriesData"
      @add_film_submit="(newFilmData) => add_film(newFilmData)"
    />
    <SuccessModal
      :successTitle="successTitle"
    />
  </div>
</template>

<script>
  import { rateStarWithEmpty } from '~/plugins/helper';
  import { objToArray } from '~/plugins/helper';
  import * as firebase from 'firebase';
  import BannerSlide from '~/components/BannerSlide';
  import FilterTools from '~/components/FilterTools';
  import NewFilmModal from '~/components/admin/NewFilmModal';
  import SuccessModal from '~/components/admin/SuccessModal';

  export default {
    data () {
      return {
        swiperBanner: {
          speed: 800,
          loop: true,
          effect: 'fade',
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: '.banner .swiper-button-next',
            prevEl: '.banner .swiper-button-prev',
          },
        },
        filmsListType: '',
        directorData: [],
        // currentSelectedArea: '全部',
        // currentSelectedCategory: '00',
        // currentSelectedYear: '全部',
        sortBy: 'imdbRates',
        maxKey: 0,
        nextKey: 0,
        areasData: [],
        categoriesData: [],
        successTitle: '',
      }
    },
    components: {
      BannerSlide,
      FilterTools,
      NewFilmModal,
      SuccessModal,
    },
    created() {
      this.filmsListType = this.$route.name === 'movies' ? '電影' : '影集';
      const { filmsListType } = this;
      if (filmsListType === "電影") {
        this.$store.dispatch('loadedMoviesListBanners')
        this.$store.dispatch('loadedMovies')
      }  else if (filmsListType === "影集") {
        this.$store.dispatch('loadedSeriesListBanners');
        this.$store.dispatch('loadedSeries');
      }

      // 讀取相關續作資料
      this.$store.dispatch('loadedRelatedDatas');
      this.$store.dispatch('loadedAreasData');
      this.$store.dispatch('loadedAllFilmsKeys');
      this.$store.dispatch('loadedCategoriesData');
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin;
      },
      allFilmsKeys() {
        return this.$store.state.allFilmsKeys
      },
      filmsData() {
        const routeType = this.$route.name
        let data = []
        const sortBy = this.sortBy

        if(routeType === 'movies') {
          data = this.$store.state.movies.filter(item=> item !==null).sort((a,b) => {
            return sortBy === 'imdbRates' ? b.imdb_rates - a.imdb_rates : b.my_rate - a.my_rate;
          })
        } else if (routeType === 'series') {
          data = this.$store.state.series.filter(item=> item !==null).sort((a,b) => {
            return sortBy === 'imdbRates' ? b.imdb_rates - a.imdb_rates : b.my_rate - a.my_rate;
          })
        }

        return(data)

        // const currentSelectedArea = this.currentSelectedArea;
        // const currentSelectedCategory = this.currentSelectedCategory;
        // const currentSelectedYear = this.currentSelectedYear;

        // if(currentSelectedArea !== '全部' && currentSelectedCategory !== '00' && currentSelectedYear !== '全部' ) { // 如果都不是選全部
        //   const filteredData = data.filter(f => {
        //     return f.area.search(currentSelectedArea) !== -1
        //   }).filter(c => {
        //     const categoriesKey = Object.keys(c.categories || {})
        //     return categoriesKey.includes(currentSelectedCategory)
        //   }).filter(y => {
        //     return y.year === currentSelectedYear
        //   })
        //   return filteredData
        // } else if(currentSelectedArea === '全部' && currentSelectedCategory !== '00' && currentSelectedYear !== '全部') {
        //   const filteredData = data.filter(c => {
        //     const categoriesKey = Object.keys(c.categories || {})
        //     return categoriesKey.includes(currentSelectedCategory)
        //   }).filter(y => {
        //     return y.year === currentSelectedYear
        //   })
        //   return filteredData
        // } else if (currentSelectedArea !== '全部' && currentSelectedCategory === '00' && currentSelectedYear !== '全部') {
        //   const filteredData = data.filter(f => {
        //     return f.area.search(currentSelectedArea) !== -1
        //   }).filter(y => {
        //     return y.year === currentSelectedYear
        //   })
        //   return filteredData
        // } else if (currentSelectedArea !== '全部' && currentSelectedCategory !== '00' && currentSelectedYear === '全部') {
        //   const filteredData = data.filter(f => {
        //     return f.area.search(currentSelectedArea) !== -1
        //   }).filter(c => {
        //     const categoriesKey = Object.keys(c.categories || {})
        //     return categoriesKey.includes(currentSelectedCategory)
        //   })
        //   return filteredData
        // } else if (currentSelectedArea !== '全部' && currentSelectedCategory === '00' && currentSelectedYear === '全部' ) {
        //   const filteredData = data.filter(f => {
        //     return f.area.search(currentSelectedArea) !== -1
        //   })
        //   return filteredData
        // } else if (currentSelectedArea === '全部' && currentSelectedCategory !== '00' && currentSelectedYear === '全部' ) {
        //   const filteredData = data.filter(c => {
        //     const categoriesKey = Object.keys(c.categories || {})
        //     return categoriesKey.includes(currentSelectedCategory)
        //   })
        //   return filteredData
        // } else if (currentSelectedArea === '全部' && currentSelectedCategory === '00' && currentSelectedYear !== '全部' ) {
        //   const filteredData = data.filter(y => {
        //     return y.year === currentSelectedYear
        //   })
        //   return filteredData
        // } else {
        //   return data
        // }
      },
      bannerData() {
        const routeType = this.$route.name
        if(routeType === 'movies') {
          return this.$store.state.moviesListBanners
        } else if (routeType === 'series') {
          return this.$store.state.seriesListBanners
        }
        return []
      },
      listBannersIsLoading() {
        const { filmsListType } = this;
        return this.$store.state.listBannersIsLoading;
      },
      relatedDatas() {
        return this.$store.state.relatedData
      },
      areasDataInDb() {
        return this.$store.state.areasData
      },
      categoriesInDb() {
        return this.$store.state.categoriesData
      },
      isLoading() {
        const { filmsListType } = this;
        return this.filmsListType === '電影' ? this.$store.state.moviesIsLoading : this.$store.state.seriesIsLoading
      },
    },
    watch: {
      allFilmsKeys(keys) {
        if(keys.length > 0) {
          const emptyIndex = keys.findIndex(item => item === undefined)
          if (emptyIndex > -1) {
            console.log('hasEmptyFilm')
            this.nextKey = emptyIndex;
          } else {
            keys.forEach(item => {
              this.maxKey = item > this.maxKey ? item : this.maxKey
            });
            this.nextKey = this.maxKey + 1;
          }
        }
        console.log('The next new film key is',this.nextKey)
      },
      categoriesInDb(datas) {
        if (datas) {
          this.categoriesData = datas.map((item) => (
              {
                ...item,
                checked: false,
              }
            )
          );
        }
      },
      areasDataInDb(datas) {
        if (datas) {
          this.areasData = datas.map((item) => (
              {
                ...item,
                checked: false,
              }
            )
          );
        }
      },
    },
    methods: {
      rateStarWithEmpty(rates) {
        return rateStarWithEmpty(rates)
      },
      objToArray(obj) {
        // console.log(objToArray(obj),'obj')
        return objToArray(obj)
      },
      filterAreaMethod(name) {
        this.currentSelectedArea = name
        // console.log(data)
      },
      filterCategory(key) {
        this.currentSelectedCategory = key
      },
      filterYearMethod(key) {
        this.currentSelectedYear = key
      },
      add_film(newFilmData) {
        const nextKey = this.nextKey;
        console.log(newFilmData)

        // firebase.database().ref(`films/${nextKey}`).set(
        //   newFilmData
        // ).then(() => {
        //   this.successTitle = '新增影片成功'
        //   this.$bvModal.show('success-modal')
        //   location.reload()
        // }).catch((error) => {
        //   this.successTitle = '新增影片失敗'
        //   this.$bvModal.show('success-modal')
        //   console.log(error)
        // });
      }
      // bannerRWD() {
      //   const bannerWidth = this.$refs.bannerSlide.clientWidth;
      //   return bannerRWD(bannerWidth);
      // }
    }
  };
</script>

<style lang="scss">
  @import "~/assets/scss/films.scss";
</style>