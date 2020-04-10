<template>
  <div class="film_details">
    <BannerSlide
      :bannerData="bannerData"
    />
    <div class="container">
      <div class="main">
        <div class="row main_info">
          <div class="row">
            <div class="wallpaper col-md-4">
              <div class="film_title mobile">
                <h1>
                  <div class="favorite_crown" v-if="filmData.imdb_rates >= 8">
                    <font-awesome-icon icon="crown" />{{filmData.imdb_rates}}
                  </div>
                  {{filmData.name}}
                </h1>
                <h2 class="tw_name" v-if="filmData.tw_name">
                  <b>中文片名：</b>
                  <span>{{filmData.tw_name}}</span>
                </h2>
              </div>
              <img :src="filmData.wallpaper" />
            </div>
            <div class="words col-md-8">
              <div class="film_title desktop">
                <h1>
                  <div class="favorite_crown" v-if="showCrown">
                    <font-awesome-icon icon="crown" />
                  </div>
                  {{filmData.name}}
                </h1>
                <h2 class="tw_name" v-if="filmData.tw_name">
                  <b>中文片名：</b>
                  <span>{{filmData.tw_name}}</span>
                </h2>
              </div>
              <div class="film_info">
                <div class="rates label_data">
                  <b>IMDB 評分：</b>
                  <span v-for="(star, j) in rateTenStar(filmData.imdb_rates)"
                        :key="j">
                    <font-awesome-icon v-if="star==='star'" icon="star" />
                    <font-awesome-icon v-if="star==='half'" icon="star-half-alt" />
                    <font-awesome-icon v-if="star==='empty'" :icon="['far', 'star']"/>
                  </span>
                  <b>{{filmData.imdb_rates.toFixed(1)}} 分</b>
                  <a
                    class="go_imdb"
                    :href="`https://www.imdb.com/title/${filmData.imdb_id}`"
                    target="_blank"
                  >
                    <font-awesome-icon icon="arrow-right" />
                    <font-awesome-icon :icon="['fab', 'imdb']" />
                  </a>
                </div>
                <div class="my_rate label_data" v-if="filmData.my_rate">
                  <font-awesome-icon icon="check" />
                  <b>我的評分：</b>
                  <span v-for="(star, j) in rateTenStar(filmData.my_rate)"
                          :key="j">
                    <font-awesome-icon v-if="star==='star'" icon="star" />
                    <font-awesome-icon v-if="star==='half'" icon="star-half-alt" />
                    <font-awesome-icon v-if="star==='empty'" :icon="['far', 'star']"/>
                  </span>
                  <b>{{filmData.my_rate.toFixed(1)}} 分</b>
                </div>
                <div class="type label_data">
                  <b>類型：</b>
                  <router-link :to="'/series'" v-if="filmData.type === 'series'">影集</router-link>
                  <router-link :to="'/movies'" v-else-if="filmData.type === 'movies'">電影</router-link>
                </div>
                <div class="end label_data" v-if="filmData.type === 'series'">
                  <span v-if="filmData.ends">
                    已完結
                    <span class="total" v-if="filmData.seasons && filmData.seasons.length > 0">，共 <b>{{filmData.seasons.length}}</b> 季</span>
                  </span>
                  <span class="still" v-else>
                    未完結
                    <span class="total" v-if="filmData.seasons && filmData.seasons.length > 0">，目前季數 <b>{{filmData.seasons.length}}</b> 季</span>
                  </span>
                </div>
                <LabelData
                  v-if="filmData.area.length > 0"
                  className="area"
                  title="地區"
                  :multipleDatas="filmData.area"
                />
                <LabelData
                  v-if="filmData.directors && filmData.directors.length > 0"
                  className="directors"
                  title="導演"
                  :multipleDatas="filmData.directors"
                />
                <LabelData
                  v-if="filmData.writers.length > 0"
                  className="writers"
                  title="編劇"
                  :multipleDatas="filmData.writers"
                />
                <LabelData
                  v-if="filmData.categories && filmData.categories.length > 0"
                  className="categories"
                  title="種類"
                  :multipleDatas="filmData.categories"
                />
                <LabelData
                  v-if="filmData.cast && filmData.cast.length > 0"
                  className="cast"
                  title="主演"
                  :multipleDatas="filmData.cast"
                />
                <LabelData
                  v-if="filmData.year"
                  className="year"
                  title="年份"
                  :singleData="filmData.year + ' 年'"
                />
                <div class="brief label_data" v-if="filmData.brief">
                  <b>簡述：</b>
                  <p>{{filmData.brief}}</p>
                </div>
                <div class="favorite" v-if="filmData.favorite">
                  <span v-if="filmData.type === 'movies'">最愛電影</span>
                  <span v-else-if="filmData.type === 'series'">最愛影集</span>
                </div>
                <b-button
                  id="show-btn"
                  @click="$bvModal.show('film_modal')"
                  v-if="isLogin">
                  <font-awesome-icon icon="plus-circle"
                />
                  編輯影片資訊
                </b-button>
                <NewFilmModal
                  :newFilmData="filmData"
                  actionType="edit"
                  :filmsListType="filmsListType"
                  :imdb_rates="String(filmData.imdb_rates)"
                  :my_rate="String(filmData.my_rate)"
                  :directorInputs="filmData.directors"
                  :castInputs="filmData.cast"
                  :writerInputs="filmData.writers"
                  :pageBannersInputs="filmData.page_banners"
                  :seasonsInputs="filmData.seasons"
                  :relatedDatas="relatedDatas"
                  :entertainmentData="entertainmentDatas"
                  :areasData="areasData"
                  :categoriesData="categoriesData"
                  :favoriteCheck="favoriteCheck"
                  :endCheck="endCheck"
                  @add_film_submit="(newFilmData) => updateFilm(newFilmData)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="series_intro" v-if="filmData.type === 'series' && filmData.seasons">
          <div class="season_tag">
            <a
              v-for="(item, i) in filmData.seasons"
              :key="i" href="javascript: void(0);"
              @click="switchSeasonHandler(`season${i+1}`)"
              :class="{active:seasonShowTarget==`season${i+1}`}"
            >
              第 {{i + 1}} 季
            </a>
          </div>
          <div class="seasons">
            <div class="main_intro season"
              v-for="(item, i) in filmData.seasons"
              :key="i"
              :id="`season${i+1}`"
              :class="{active:seasonShowTarget==`season${i+1}`}"
            >
              <h2>第 {{i+1}} 季<span v-if="item.name"> - {{item.name}}</span></h2>
              <div class="blocks">
                <h3><span class="circle"></span>劇情介紹</h3>
                <div v-if="item.sum" v-html="item.sum"></div>
                <div v-else>
                  <p>尚無劇情介紹</p>
                </div>
              </div>
              <div class="blocks" v-show="item.trailer !== ''">
                <h3><span class="circle"></span>預告</h3>
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe class="embed-responsive-item" :src="`https://www.youtube.com/embed/${item.trailer}`" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main_intro" v-else>
          <div class="blocks">
            <h3><span class="circle"></span>劇情介紹</h3>
            <div v-html="filmData.summary"></div>
          </div>
          <div class="blocks" v-if="filmData.trailer">
            <h3><span class="circle"></span>預告</h3>
            <div class="embed-responsive embed-responsive-16by9">
              <iframe class="embed-responsive-item" :src="`https://www.youtube.com/embed/${filmData.trailer}`" allowfullscreen></iframe>
            </div>
          </div>
          <div class="blocks related" v-if="relatedData.length > 0">
            <h3><span class="circle"></span>{{filmData.related}} 系列</h3>
            <div class="content">
              <RelatedFilmsSwiper
                :relatedData="relatedData"
                :blockClass="'related'"
              />
            </div>
          </div>
          <div class="blocks related" v-if="sameDirectorData.length > 0">
            <h3><span class="circle"></span>{{filmData.director}} 執導相關作品</h3>
            <div class="content">
              <RelatedFilmsSwiper
                :relatedData="sameDirectorData"
                :blockClass="'related'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { rateTenStar } from '~/plugins/helper';
  import { objToArray } from '~/plugins/helper';
  import BannerSlide from '~/components/BannerSlide';
  import RelatedFilmsSwiper from '~/components/relatedFilmSwiper/RelatedFilmsSwiper';
  import NewFilmModal from '~/components/admin/NewFilmModal';
  import LabelData from '~/components/page/LabelData';

  export default {
    components: {
      BannerSlide,
      RelatedFilmsSwiper,
      NewFilmModal,
      LabelData,
    },
    props: {
      filmType: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        filmData: {
          area: "",
          brief: "",
          categories: [],
          cast: [],
          directors: [],
          favorite: false,
          imdb_id: "",
          my_rate: 0,
          name: "",
          page_banners: {},
          imdb_rates: 0,
          related: "",
          still: false,
          summary: "",
          trailer: "",
          tw_name: "",
          type: "",
          wallpaper: "",
          writers: [],
          year: 0
        },
        filmsListType: "",
        areasData: [],
        directorsData: [],
        categoriesData: [],
        bannerData: [],
        relatedData: [],
        sameDirectorData: [],
        showCrown: false,
        seasonShowTarget: "season1",
        endCheck: false,
        favoriteCheck: false,
      }
    },
    created() {
      this.$store.dispatch('loadedMovieFilm', [this.filmType, this.$route.params.id])
      this.$store.dispatch('loadedRelatedDatas');
      this.$store.dispatch('loadedEntertainmentData');
      this.$store.dispatch('loadedAreasData');
      this.$store.dispatch('loadedCategoriesData');
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin;
      },
      getFilmData() {
        return this.$store.state.currentMovieFilm //獲取電影資料
      },
      relatedDatas() {
        return this.$store.state.relatedData
      },
      entertainmentDatas() {
        return this.$store.state.entertainmentData
      },
      areasDataInDb() {
        return this.$store.state.areasData
      },
      categoriesInDb() {
        return this.$store.state.categoriesData
      },
    },
    methods: {
      endCheckChange(newEnds) {
        this.endCheck = newEnds;
      },
      favoriteCheckChange(newFavorite) {
        this.favoriteCheck = newFavorite;
      },
      categoiesCheckChange(newCategories) {
        this.categoryNames = newCategories
      },
      rateTenStar(rates) {
        return rateTenStar(rates)
      },
      switchSeasonHandler(target) {
        this.seasonShowTarget = target;
      },
      checkItemsDataFactory(datas, filmDatas) {
        const result = datas.map((item) => (
            {
              ...item,
              checked: false,
            }
          )
        );
        result.forEach((item) => {
          filmDatas.forEach((checkedItem) => {
            if (checkedItem.id === item.id) {
              item.checked = true;
            }
          });
        });
        return result;
      },
      updateFilm(newFilmData) {
        console.log(newFilmData);
      },
    },
    watch: {
      categoriesInDb(datas) {
        if (datas) {
          this.categoriesData = this.checkItemsDataFactory(datas, this.filmData.categories);
        }
      },
      areasDataInDb(datas) {
        if (datas) {
          this.areasData = this.checkItemsDataFactory(datas, this.filmData.area);
        }
      },
      getFilmData(val) {
        if (val) {
          this.filmData = val //這頁整包電影資料
          this.filmsListType = this.filmData.type === 'movies' ? '電影' : '影集';

          // 編輯modal是否完結
          if (val.ends) {
            this.endCheck = val.ends
          } else {
            this.endCheck = false
          }

          // 編輯modal是否為最愛
          if (val.favorite) {
            this.favoriteCheck = val.favorite
          } else {
            this.favoriteCheck = false
          }

          //是否顯示皇冠
          const cateData = val.categories.map(item => (item.name));
          if (cateData.includes('動畫') && val.imdb_rates >= 7) {
            this.showCrown = true;
          } else if (cateData.includes('喜劇') && !cateData.includes('動畫')) {
            this.showCrown = true;
          } else if (cateData.includes('恐怖') && val.imdb_rates >= 6) {
            this.showCrown = true;
          } else if (val.imdb_rates >= 8) {
            this.showCrown = true;
          }
          //filmData.rates >= 8 || cateData.includes('恐怖') || cateData.includes('喜劇') && filmData.rates >= 6.5 || cateData.includes('動畫') && filmData.rates >= 7

          //季數
          if(val.seasons) {
            this.seasons = val.seasons;
          }

          const data = this.$store.state.movies;
          //相關續作資料
          const dataRelated = val.related
          const filterData = data.filter((rel) => {
            return rel.related && rel.related === dataRelated && rel.name !== val.name;
          });
          this.relatedData = filterData.sort((a,b) => {
            return a.year - b.year;
          });

          //相關續作資料
          const directorRelated = val.director
          const filterDirectorData = data.filter((rel) => {
            return rel.director && rel.director === directorRelated && rel.name !== val.name;
          });
          this.sameDirectorData = filterDirectorData.sort((a,b) => {
            return b.year - a.year;
          });
        }
      },
    }
  }
</script>

<style lang="scss">
  @import "~/assets/scss/film_details.scss";
</style>