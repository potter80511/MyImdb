<template>
  <b-modal
    id="film_modal"
    modal-class="film_modal film_form_modal"
    title="編輯影片資訊"
    ok-title="更新"
    cancel-title="取消"
    @ok="update_film_submit"
  >
    <div class="container">
      <div id="edit_film_form" class="form_modal">
        <div class="input-group">
          <label>劇名稱（原文）：</label>
          <input id="filmName" type="text" v-model="filmData.name" />
        </div>
        <div class="input-group">
          <label>劇名稱（中文）：</label>
          <input id="filmTwName" type="text" v-model="filmData.tw_name" />
        </div>
        <div class="input-group select-tool">
          <label>影片類型：</label>
          <div class="area-select">
            <select v-model="filmData.type">
              <option value="series">影集</option>
              <option value="movies">電影</option>
            </select>
            <font-awesome-icon icon="chevron-down" />
          </div>
        </div>
        <div class="input-group" v-show="filmData.type === 'series'">
          <span
            :class="[endCheck ? isCheckedClass : '', 'endCheck-check label-check']"
            @click="endCheckHandler(filmData.ends)"
          >
          <span>{{filmData.ends}}</span>
          </span>
          <label>是否完結？</label>
        </div>
        <div class="input-group">
          <label>系列：</label>
          <input id="filmRelated" type="text" v-model="filmData.related" />
        </div>
        <div class="input-group">
          <span
            :class="[favoriteCheck ? isCheckedClass : '', 'favorite-check label-check']"
            @click="favoriteCheckHandler(filmData.favorite)"
          >
          </span>
          <label>是否為最愛影劇？</label>
        </div>
        <div class="input-group">
          <label>IMDB 評分：</label>
          <input id="filmImdbRate" type="text" :value="filmData.rates"
            @input="newFilmData.rates = $event.target.value"
          />
        </div>
        <div class="input-group film-area select-tool">
          <label>地區：</label>
          <div class="area-select">
            <select v-model="filmData.area">
              <option
                v-for="(area, i) in areaDatas"
                :value="area"
                :key="i"
              >{{area}}</option>
            </select>
            <font-awesome-icon icon="chevron-down" />
          </div>
        </div>
        <div class="input-group">
          <label>年份：</label>
          <input id="filmYear" type="text" v-model="filmData.year" />
        </div>
        <div class="input-group film-categories">
          <label>電影類型：</label>
          <div class="group">
            <div
              v-for="(categoryName, i) in categoryNames"
              :key="i"
            >
              <span
                :class="[categoryName.checked ? isCheckedClass : '', 'category-check label-check']"
                @click="categoiesCheckedHandler(categoryName.id)"
              >
              </span>
              <label>{{ categoryName.name }}</label>
            </div>
          </div>
        </div>
        <div class="input-group">
          <label>電影簡述：</label>
          <input id="filmBrief" type="textarea" v-model="filmData.brief" />
        </div>
        <!--
        <div class="input-group">
          <label>導演：</label>
          <input id="filmDirector" type="text" />
        </div>
        <div class="input-group cast">
          <div class="add_item_btn">
            <label>演員</label>
            <font-awesome-icon icon="plus" @click="addCastHandler" />
          </div>
          <div v-if="castInputs.length > 0">
            <div
              v-for="(castInput, i) in castInputs"
              :key="i"
            >
              <input
                :id="`cast_${castInput.id}`"
                type="text"
                v-model="castInput.castName"
              />
              <font-awesome-icon icon="times" @click="deleteCastHandler(castInput.id, i)" />
            </div>
          </div>
        </div>
        <div class="input-group">
          <label>IMDB ID：</label>
          <input id="filmImdbId" type="text" />
        </div>
        <div class="input-group">
          <label>我的評分：</label>
          <input id="filmMyRate" type="text" />
        </div>
        <div class="input-group">
          <label>預告ID：</label>
          <input id="filmTrailer" type="text" />
        </div>
        <div class="input-group">
          <label>海報連結：</label>
          <input id="filmWallpaper" type="text" />
        </div>
        <div class="input-group" v-if="filmsListType === '電影'">
          <label>劇情大綱：</label>
          <input id="filmSummary" type="textarea" />
        </div>
        <div
          v-else-if="filmsListType === '影集'"
          class="add_seasons_group"
        >
          <div class="add_item_btn">
            <label>新增季</label>
            <font-awesome-icon icon="plus" @click="addSeasonsHandler" />
          </div>
          <div
            class="seasons_group"
            v-for="(item, i) in seasonsInputs"
            :key="i">
            <div class="title">
              <h3>第 {{i+1}} 季</h3>
              <font-awesome-icon icon="times" @click="deleteSeasonHandler(seasonsInput.id, i)" />
            </div>
            <div class="input-group">
              <label>季名稱：</label>
              <input
                id="seasonSummary"
                type="textarea"
                v-model="item.name"
              />
            </div>
            <div class="input-group">
              <label>預告：</label>
              <input id="seasonTrailer" type="text" v-model="item.trailer" />
            </div>
            <div class="input-group">
              <label>劇情大綱：</label>
              <input id="seasonSummary" type="textarea" v-model="item.sum" />
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </b-modal>
</template>

<script>

export default {
  props: {
    filmData: {
      type: Object,
      required: true,
    },
    areaDatas: {
      type: Array,
      required: true,
    },
    categoryNames: {
      type: Array,
      required: true,
    },
    endCheck: {
      type: Boolean,
      required: true,
    },
    favoriteCheck: {
      type: Boolean,
      required: true
    },
    add_film: {
      type: Function,
    },
  },
  data () {
    return {
      newFilmData: {
        categories: [],
        rates: 0,
      },
      isCheckedClass: 'is-checked',
      castInputs: [],
      seasonsInputs: [],
    }
  },
  methods: {
    addCastHandler() {
      const castInputs = this.castInputs;
      const castInputId = castInputs.length + 1;
      castInputs.push({
        id: castInputId
      });
    },
    addSeasonsHandler() {
      const seasonsInputs = this.seasonsInputs;
      const seasonsInputId = seasonsInputs.length + 1;
      seasonsInputs.push({
        id: seasonsInputId,
        name: '',
        sum: '',
        trailer: '',
      });
    },
    deleteCastHandler(id, inputIndex) {
      const castInputs = this.castInputs;
      castInputs.splice(inputIndex, 1);
      castInputs.forEach((item, index) => {
        item.id = index + 1;
      });
    },
    endCheckHandler(ends) {
      this.filmData.ends = !ends;
      this.$emit('endCheckHandler', this.filmData.ends);
    },
    favoriteCheckHandler(favorite) {
      this.filmData.favorite = !favorite;
      this.$emit('favoriteCheckHandler', this.filmData.favorite);
    },
    categoiesCheckedHandler(id) {
      const categoryNames = this.categoryNames;
      categoryNames.forEach(item => {
        if(item.id === id) {
          item.checked = !item.checked
        }
      });
      this.$emit('categoiesCheckedHandler', categoryNames);
    },
    update_film_submit() {
      const {
        castInputs,
        categoryNames,
        seasonsInputs,
        filmData,
        newFilmData,
      } = this;

      console.log(filmData);
      // let director = document.getElementById("filmDirector").value;

      // let castNameArray = [];
      // castInputs.forEach((item, index) => {  // 先做出[{01: a}, {02: b}]
      //   let keyName = 0;
      //   if (index < 9) {
      //     keyName = '0' + (index + 1);
      //   } else {
      //     keyName = index + 1;
      //   }
      //   castNameArray.push({
      //     [keyName]: item.castName
      //   });
      // });
      // const filmCasts = castNameArray.reduce((result, item) => { // 再轉成{01:a, 02:b}
      //   const key = Object.keys(item)[0]; // key name 01, 02, ...
      //   result[key] = item[key];
      //   return result;
      // }, {});
      // result是前一個（初始為空物件{}），item是當前
      // 原本長這樣[{01: a}, {02: b}]
      // 第一次 Object.keys(item) = ['01']，所以const key = '01'
      // result 原本是 {}，result['01'] = item['01']就是 a ，所以就變成{'01': a,}
      // 第二次 Object.keys(item) = ['02']，所以const key = '02'
      // result 原本是 {'01': a,}，result['02'] = item['02']就是 b ，所以就變成{'01': a,'02': b,}

      // let imdbId = document.getElementById("filmImdbId").value;
      // let myRate = document.getElementById("filmMyRate").value;

      // const summary = filmsListType === '電影' ? document.getElementById("filmSummary").value : '';
      // let trailer = document.getElementById("filmTrailer").value;

      // const type = filmsListType === '影集' ? 'series' : 'movies';

      // let wallpaper = document.getElementById("filmWallpaper").value;

      const checkedCategories = categoryNames.filter(item => (
        item.checked === true
      ));
      newFilmData.categories = [...checkedCategories];

      // 電影類型未改變時
      if (newFilmData.categories.length === 0) {
        newFilmData.categories = filmData.categories
      }

      // IMDB評分未改變時
      if (newFilmData.rates === 0) {
        newFilmData.rates = filmData.rates
      }

      const {
        categories,
        rates,
      } = newFilmData;

      const updatedFilmData = {
        ...filmData,
        categories,
        rates,
      };
      console.log(updatedFilmData)

      // this.$emit('add_film_submit', newFilmData);
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/new_film.scss";
</style>
<style lang="scss">
  @import "~/assets/scss/film_modal.scss";
</style>
