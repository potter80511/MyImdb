<template>
  <b-modal
    id="new_film"
    modal-class="new_film film_form_modal"
    :title="`新增${filmsListType}`"
    ok-title="新增"
    cancel-title="取消"
    @ok="add_film_submit"
  >
    <div class="container">
      <div id="new_film_form" class="form_modal">
        <div class="input-group">
          <label>劇名稱（原文）：</label>
          <input id="filmName" type="text" v-model="newFilmData.name" />
        </div>
        <div class="input-group">
          <label>劇名稱（中文）：</label>
          <input id="filmTwName" type="text" v-model="newFilmData.tw_name" />
        </div>
        <div class="input-group" v-show="filmsListType === '影集'">
          <span
            :class="[endCheck ? isCheckedClass : '', 'endCheck-check label-check']"
            @click="endCheckHandler"
          >
          </span>
          <label>是否完結？</label>
        </div>
        <div class="input-group film-related select-tool">
          <label>系列：</label>
          <div class="related-select">
            <select v-model="newFilmData.relatedId">
              <option value="" selected hidden>請選擇</option>
              <option value="">無</option>
              <option
                v-for="(item, i) in relatedDatas"
                :value="item.id"
                :key="i"
              >{{item.tw_name}}</option>
            </select>
            <font-awesome-icon icon="chevron-down" />
          </div>
        </div>
        <div class="input-group">
          <span
            :class="[favoriteCheck ? isCheckedClass : '', 'favorite-check label-check']"
            @click="favoriteCheckHandler"
          >
          </span>
          <label>是否為最愛影劇？</label>
        </div>
        <div class="input-group">
          <label>IMDB 評分：</label>
          <input id="filmImdbRate" type="text" v-model="newFilmData.imdbRates" />
        </div>
        <div class="input-group film-area select-tool">
          <label>地區：</label>
          <div class="area-select">
            <select v-model="newFilmData.area">
              <option value="" selected hidden>請選擇</option>
              <option
                v-for="(area, i) in areasData"
                :value="area.id"
                :key="i"
              >{{area.name}}</option>
            </select>
            <font-awesome-icon icon="chevron-down" />
          </div>
        </div>
        <!--
        <div class="input-group">
          <label>年份：</label>
          <input id="filmYear" type="text" />
        </div>
        <div class="input-group film-categories">
          <label>電影類型：</label>
          <div class="group">
            <div
              v-for="(categorieName, i) in categoriesName"
              :key="i"
            >
              <span
                :class="[categorieName.checked ? isCheckedClass : '', 'category-check label-check']"
                @click="categoiesCheckedHandler(categorieName.id)"
              >
              </span>
              <label>{{ categorieName.name }}</label>
            </div>
          </div>
        </div>
        <div class="input-group">
          <label>電影簡述：</label>
          <input id="filmBrief" type="textarea" />
        </div>
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
        </div>
         -->
      </div>
    </div>
  </b-modal>
</template>

<script>

export default {
  props: {
    filmsListType: {
      type: String,
    },
    relatedDatas: {
      type: Array,
      required: true,
    },
    areasData: {
      type: Array,
      required: true,
    },
    add_film: {
      type: Function,
    },
  },
  data () {
    return {
      newFilmData: {
        area: '',
        imdbRates: '',
        name: '',
        relatedId: '',
        tw_name: '',
      },
      favoriteCheck: false,
      endCheck: false,
      isCheckedClass: 'is-checked',
      // areaDatas: [
      //   '美國',
      //   '英國',
      //   '韓國',
      //   '泰國',
      //   '日本',
      //   '印度',
      //   '西班牙'
      // ],
      castInputs: [],
      categoriesName: [
        {
          id: '01',
          name: '動作',
          checked: false,
        },
        {
          id: '02',
          name: '犯罪',
          checked: false,
        },
        {
          id: '03',
          name: '愛情',
          checked: false,
        },
        {
          id: '04',
          name: '科幻',
          checked: false,
        },
        {
          id: '05',
          name: '驚悚',
          checked: false,
        },
        {
          id: '06',
          name: '恐怖',
          checked: false,
        },
        {
          id: '07',
          name: '劇情',
          checked: false,
        },
        {
          id: '08',
          name: '喜劇',
          checked: false,
        },
        {
          id: '09',
          name: '家庭',
          checked: false,
        },
        {
          id: '10',
          name: '戰爭',
          checked: false,
        },
        {
          id: '11',
          name: '傳記',
          checked: false,
        },
        {
          id: '12',
          name: '動畫',
          checked: false,
        },
        {
          id: '13',
          name: '音樂',
          checked: false,
        },
        {
          id: '14',
          name: '奇幻',
          checked: false,
        },
        {
          id: '15',
          name: '溫馨',
          checked: false,
        },
      ],
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
    endCheckHandler() {
      this.endCheck = !this.endCheck;
    },
    favoriteCheckHandler() {
      this.favoriteCheck = !this.favoriteCheck;
    },
    categoiesCheckedHandler(id) {
      const categoriesName = this.categoriesName;
      categoriesName.forEach(item => {
        if(item.id === id) {
          item.checked = !item.checked
        }
      });
    },
    add_film_submit() {
      const {
        endCheck,
        favoriteCheck,
        filmsListType,
        castInputs,
        categoriesName,
        seasonsInputs,
      } = this;

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


      // const summary = filmsListType === '電影' ? document.getElementById("filmSummary").value : '';

      // const type = filmsListType === '影集' ? 'series' : 'movies';


      // const checkedCategories = categoriesName.filter(item => ( // 先篩選被勾選的
      //   item.checked === true
      // )).map(item => { //再組出[{01: name1}, {02: name2}]
      //   const id = item.id;
      //   return {
      //     [id]: item.name,
      //   }
      // });
      // const filmCategories = checkedCategories.reduce((result, item) => { // 再轉成{01:name1, 02:name2}
      //   const key = Object.keys(item)[0]; // key name 01, 02, ...
      //   result[key] = item[key];
      //   return result;
      // }, {});
      // console.log(area);

      const newFilmData = {
        ...this.newFilmData,
        ends: endCheck,
        favorite: favoriteCheck,
      };

      this.$emit('add_film_submit', newFilmData);
    }
  }
}
</script>

<style lang="scss">
  @import "~/assets/scss/film_modal.scss";
</style>
<style lang="scss" scoped>
  @import "~/assets/scss/new_film.scss";
</style>
