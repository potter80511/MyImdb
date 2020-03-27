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
        <SingleInput
          title="劇名稱（原文）"
          id="filmName"
          :inputData="newFilmData.name"
          v-model="newFilmData.name"
        />
        <SingleInput
          title="劇名稱（中文）"
          id="filmTwName"
          :inputData="newFilmData.tw_name"
          v-model="newFilmData.tw_name"
        />
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
            <select v-model="newFilmData.related_id">
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
        <SingleInput
          title="IMDB 評分"
          id="filmImdbRate"
          :inputData="newFilmData.imdb_rates"
          v-model="newFilmData.imdb_rates"
        />
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
        <SingleInput
          title="年份"
          id="filmYear"
          :inputData="newFilmData.year"
          v-model="newFilmData.year"
        />
        <div class="input-group film-categories">
          <label>電影類型：</label>
          <div class="group">
            <div
              v-for="(category, i) in categoriesData"
              :key="i"
            >
              <span
                :class="[category.checked ? isCheckedClass : '', 'category-check label-check']"
                @click="categoriesCheckedHandler(category.id)"
              >
              </span>
              <label>{{ category.name }}</label>
            </div>
          </div>
        </div>
        <SingleInput
          title="電影簡述"
          id="filmBrief"
          :inputData="newFilmData.brief"
          v-model="newFilmData.brief"
        />
        <InputMultiple
          dataType="people"
          title="導演"
          className="directors"
          :inputsData="directorInputs"
          :addHandler="addDirectorHandler"
          :deleteHandler="deleteDirectorHandler"
        />
        <InputMultiple
          dataType="people"
          title="編劇"
          className="writers"
          :inputsData="writerInputs"
          :addHandler="addWriterHandler"
          :deleteHandler="deleteWriterHandler"
        />
        <InputMultiple
          dataType="people"
          title="演員"
          className="cast"
          :inputsData="castInputs"
          :addHandler="addCastHandler"
          :deleteHandler="deleteCastHandler"
        />
        <SingleInput
          title="IMDB ID"
          id="filmImdbId"
          :inputData="newFilmData.imdb_id"
          v-model="newFilmData.imdb_id"
        />
        <SingleInput
          title="我的評分"
          id="filmMyRate"
          :inputData="newFilmData.my_rate"
          v-model="newFilmData.my_rate"
        />
        <SingleInput
          title="預告ID"
          id="filmTrailer"
          :inputData="newFilmData.trailer"
          v-model="newFilmData.trailer"
          v-show="filmsListType === '電影'"
        />
        <SingleInput
          title="海報連結"
          id="filmWallpaper"
          :inputData="newFilmData.wallpaper"
          v-model="newFilmData.wallpaper"
        />
        <SingleInput
          title="劇情大綱"
          id="filmSummary"
          inputType="textarea"
          :inputData="newFilmData.summary"
          v-model="newFilmData.summary"
        />
        <InputMultiple
          v-show="filmsListType === '影集'"
          dataType="seasons"
          title="新增季"
          :inputsData="seasonsInputs"
          :addHandler="addSeasonsHandler"
          :deleteHandler="deleteSeasonHandler"
        />
      </div>
    </div>
  </b-modal>
</template>

<script>
  import { capitalize, addInputHandler, deleteInputHandler, inputPeaple } from '~/plugins/helper';
  import InputMultiple from '~/components/formElements/InputMultiple';
  import SingleInput from '~/components/formElements/SingleInput';

  export default {
    components: {
      InputMultiple,
      SingleInput,
    },
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
      categoriesData: {
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
          brief: '',
          imdb_id: '',
          imdb_rates: '',
          my_rate: '',
          name: '',
          related_id: '',
          summary: '',
          trailer: '',
          tw_name: '',
          wallpaper: '',
          year: '',
        },
        favoriteCheck: false,
        endCheck: false,
        isCheckedClass: 'is-checked',
        castInputs: [],
        writerInputs: [],
        directorInputs: [],
        seasonsInputs: [],
      }
    },
    methods: {
      addCastHandler() {
        const castInputs = this.castInputs;
        addInputHandler(castInputs)
      },
      deleteCastHandler(inputIndex) {
        const castInputs = this.castInputs;
        deleteInputHandler(castInputs, inputIndex)
      },
      addWriterHandler() {
        const writerInputs = this.writerInputs;
        addInputHandler(writerInputs)
      },
      deleteWriterHandler(inputIndex) {
        const writerInputs = this.writerInputs;
        deleteInputHandler(writerInputs, inputIndex)
      },
      addDirectorHandler() {
        const directorInputs = this.directorInputs;
        addInputHandler(directorInputs)
      },
      deleteDirectorHandler(inputIndex) {
        const directorInputs = this.directorInputs;
        deleteInputHandler(directorInputs, inputIndex)
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
      deleteSeasonHandler(inputIndex) {
        const seasonsInputs = this.seasonsInputs;
        deleteInputHandler(seasonsInputs, inputIndex)
      },
      endCheckHandler() {
        this.endCheck = !this.endCheck;
      },
      favoriteCheckHandler() {
        this.favoriteCheck = !this.favoriteCheck;
      },
      categoriesCheckedHandler(id) {
        const categoriesData = this.categoriesData;
        categoriesData.forEach(item => {
          if(item.id === id) {
            item.checked = !item.checked
          }
        });
        this.$emit('categoiesCheckedHandler',categoriesData);
      },
      add_film_submit() {
        const {
          endCheck,
          favoriteCheck,
          filmsListType,
          directorInputs,
          writerInputs,
          castInputs,
          categoriesData,
          seasonsInputs,
        } = this;

        // categories result  分類的結果
        const categories = categoriesData
          .filter(item => (item.checked === true))
          .map(item => (
              {
                id: item.id,
                name: item.name
              }
            )
          );

        // directors result  導演的結果
        const directors = inputPeaple(directorInputs);
        // cast writers  編劇的結果
        const writers = inputPeaple(writerInputs);
        // cast result  演員的結果
        const cast = inputPeaple(castInputs);

        const newFilmData = {
          ...this.newFilmData,
          ends: endCheck,
          favorite: favoriteCheck,
          categories,
          cast,
          directors,
          writers,
          seasonsInputs,
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
