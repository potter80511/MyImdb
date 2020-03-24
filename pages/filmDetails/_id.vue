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
                  <div class="favorite_crown" v-if="filmData.rates >= 8">
                    <font-awesome-icon icon="crown" />{{filmData.rates}}
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
                <div class="rates">
                  <b>IMDB 評分：</b>
                  <span v-for="(star, j) in rateTenStar(filmData.rates)"
                        :key="j">
                    <font-awesome-icon v-if="star==='star'" icon="star" />
                    <font-awesome-icon v-if="star==='half'" icon="star-half-alt" />
                    <font-awesome-icon v-if="star==='empty'" :icon="['far', 'star']"/>
                  </span>
                  <b>{{filmData.rates.toFixed(1)}} 分</b>
                  <a
                    class="go_imdb"
                    :href="`https://www.imdb.com/title/${filmData.imdb_id}`"
                    target="_blank"
                  >
                    <font-awesome-icon icon="arrow-right" />
                    <font-awesome-icon :icon="['fab', 'imdb']" />
                  </a>
                </div>
                <div class="my_rate" v-if="filmData.my_rate">
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
                <div class="type">
                  <b>類型：</b>
                  <router-link :to="'/series'" v-if="filmData.type === 'series'">影集</router-link>
                  <router-link :to="'/movies'" v-else-if="filmData.type === 'movies'">電影</router-link>
                </div>
                <div class="area" v-if="filmData.area !== ''">
                  <b>地區：</b>
                  <div>
                    <span>{{filmData.area}}</span>
                  </div>
                </div>
                <div class="director" v-if="filmData.type === 'movies' && filmData.director">
                  <b>導演：</b>
                  <div>
                    <span>{{filmData.director}}</span>
                  </div>
                </div>
                <div class="writers"
                  v-else-if="filmData.type === 'series' && writersData.length > 0"
                >
                  <b>編劇：</b>
                  <div>
                    <span v-for="(item, i) in writersData"
                          :key="i"
                    >{{item}}</span>
                  </div>
                </div>
                <div class="categories" v-if="cateData.length > 0">
                  <b>種類：</b>
                  <div>
                    <span v-for="(item, i) in cateData"
                          :key="i"
                    >{{item}}</span>
                  </div>
                </div>
                <div class="casts" v-if="castData">
                  <b>主演：</b>
                  <div>
                    <span v-for="(item, i) in castData"
                          :key="i"
                    >{{item}}</span>
                  </div>
                </div>
                <div class="year" v-if="filmData.year">
                  <b>年份：</b>
                  <span>{{filmData.year}} 年</span>
                </div>
                <div class="end" v-if="filmData.type === 'series'">
                  <span class="still" v-if="filmData.still">
                    未完結
                    <span class="total" v-if="filmData.seasons.length > 0">，目前季數 <b>{{filmData.seasons.length}}</b> 季</span>
                  </span>
                  <span v-else>
                    已完結
                    <span class="total" v-if="filmData.seasons.length > 0">，共 <b>{{filmData.seasons.length}}</b> 季</span>
                  </span>
                </div>
                <div class="brief" v-if="filmData.brief">
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
                <FilmModal
                  :filmData="filmData"
                  :areaDatas="areaDatas"
                  :categoryNames="categoryNames"
                  :endCheck="endCheck"
                  :favoriteCheck="favoriteCheck"
                  @endCheckHandler="(newEnds) => endCheckChange(newEnds)"
                  @favoriteCheckHandler="(newFavorite) => favoriteCheckChange(newFavorite)"
                  @categoiesCheckedHandler="(categories) => categoiesCheckChange(categories)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="series_intro" v-if="filmData.type === 'series'">
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
  import FilmModal from '~/components/admin/FilmModal';

  export default {
    components: {
      BannerSlide,
      RelatedFilmsSwiper,
      FilmModal,
    },
    data() {
      return {
        filmData: {
          area: "",
          brief: "",
          categories: {},
          cast: {},
          director: "",
          favorite: false,
          imdb_id: "",
          my_rate: 0,
          name: "",
          page_banners: {},
          rates: 0,
          related: "",
          still: false,
          summary: "",
          trailer: "",
          tw_name: "",
          type: "",
          wallpaper: "",
          year: 0
        },
        areaDatas: [
          '美國',
          '英國',
          '韓國',
          '泰國',
          '日本',
          '印度',
          '西班牙'
        ],
        categoryNames: [
          {
            id: 1,
            name: '動作',
            checked: false,
          },
          {
            id: 2,
            name: '犯罪',
            checked: false,
          },
          {
            id: 3,
            name: '愛情',
            checked: false,
          },
          {
            id: 4,
            name: '科幻',
            checked: false,
          },
          {
            id: 5,
            name: '驚悚',
            checked: false,
          },
          {
            id: 6,
            name: '恐怖',
            checked: false,
          },
          {
            id: 7,
            name: '劇情',
            checked: false,
          },
          {
            id: 8,
            name: '喜劇',
            checked: false,
          },
          {
            id: 9,
            name: '家庭',
            checked: false,
          },
          {
            id: 10,
            name: '戰爭',
            checked: false,
          },
          {
            id: 11,
            name: '傳記',
            checked: false,
          },
          {
            id: 12,
            name: '動畫',
            checked: false,
          },
          {
            id: 13,
            name: '音樂',
            checked: false,
          },
          {
            id: 14,
            name: '奇幻',
            checked: false,
          },
          {
            id: 15,
            name: '溫馨',
            checked: false,
          },
        ],
        bannerData: [],
        writersData: [],
        castData: [],
        cateData: [],
        relatedData: [],
        sameDirectorData: [],
        showCrown: false,
        seasonShowTarget: "season1",
        endCheck: false,
        favoriteCheck: false,
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin;
      },
      getFilmData() {
        return this.$store.state.currentFilm //獲取電影資料
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
    },
    created() {
      this.$store.dispatch('loadedFilm', this.$route.params.id)
    },
    watch: {
      getFilmData(val) {
        if (val) {
          this.filmData = val //這頁整包電影資料

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


          //輪播主圖資料
          // console.log(val)
          if(val.page_banners) {
            this.bannerData = objToArray(val.page_banners)
          }

          //導演資料
          if (val.writers){
            this.writersData = objToArray(val.writers)
          }

          // 地區資料
          if (val.area) {
            this.area = val.area;
          }

          //種類資料
          if(val.categories) {
            this.cateData = objToArray(val.categories)
          }
          //是否顯示皇冠
          const cateData = this.cateData;
          if (cateData.includes('動畫') && val.rates >= 7) {
            this.showCrown = true;
          } else if (cateData.includes('喜劇') && !cateData.includes('動畫')) {
            this.showCrown = true;
          } else if (cateData.includes('恐怖') && val.rates >= 6) {
            this.showCrown = true;
          } else if (val.rates >= 8) {
            this.showCrown = true;
          }
          //filmData.rates >= 8 || cateData.includes('恐怖') || cateData.includes('喜劇') && filmData.rates >= 6.5 || cateData.includes('動畫') && filmData.rates >= 7

          //演員資料
          this.castData = objToArray(val.cast)

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