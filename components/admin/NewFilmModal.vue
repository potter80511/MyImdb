<template>
  <b-modal
    :id="id"
    :modal-class="`film_form_modal ${className}`"
    :title="`${action}${filmsListType}`"
    ok-title="送出"
    cancel-title="取消"
    @ok="add_film_submit"
  >
    <div class="container">
      <div id="new_film_form" class="form_modal">
        <div class="flex-group">
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
        </div>
        <div class="flex-group">
          <SingleInput
            title="年份"
            id="filmYear"
            :inputData="newFilmData.year"
            v-model="newFilmData.year"
          />
          <SingleInput
            title="IMDB ID"
            id="filmImdbId"
            :inputData="newFilmData.imdb_id"
            v-model="newFilmData.imdb_id"
          />
        </div>
        <div class="flex-group number-group">
          <SingleInput
            title="IMDB 評分"
            id="filmImdbRate"
            inputType="number"
            :inputData="imdb_rates"
            v-model="imdb_rates"
            :inputWrap="true"
          />
          <SingleInput
            title="我的評分"
            id="filmMyRate"
            inputType="number"
            :inputData="my_rate"
            v-model="my_rate"
            :inputWrap="true"
          />
        </div>
        <div class="flex-group check-group no_wrap">
          <div class="input-group" v-show="filmsListType === '影集'">
            <span
              :class="[endCheck ? isCheckedClass : '', 'endCheck-check label-check']"
              @click="endCheckHandler"
            >
            </span>
            <label>完結</label>
          </div>
          <div class="input-group">
            <span
              :class="[favoriteCheck ? isCheckedClass : '', 'favorite-check label-check']"
              @click="favoriteCheckHandler"
            >
            </span>
            <label>最愛影劇</label>
          </div>
        </div>
        <div class="flex-group select-group no_wrap">
          <SelectTool
            title="系列"
            className="film-related"
            :data_id="newFilmData.related_id"
            v-model="newFilmData.related_id"
            :optionDatas="relatedDatas"
          />
          <SelectTool
            title="製片商"
            className="film-enter"
            :data_id="newFilmData.et_id"
            v-model="newFilmData.et_id"
            :optionDatas="entertainmentData"
          />
        </div>
        <SingleInput
          title="海報連結"
          id="filmWallpaper"
          :inputData="newFilmData.wallpaper"
          v-model="newFilmData.wallpaper"
          :inputWrap="true"
        />
        <InputMultiple
          dataType="banner"
          title="內頁主圖"
          className="page_banner"
          :inputsData="pageBannersInputs"
          :addHandler="addPageBanner"
          :deleteHandler="deletePageBanner"
        />
        <SingleInput
          title="預告ID"
          id="filmTrailer"
          :inputData="newFilmData.trailer"
          v-model="newFilmData.trailer"
          v-show="filmsListType === '電影'"
        />
        <CheckItems
          title="地區"
          className="film-area"
          :inputsData="areasData"
          @checkHandler="(inputsData) => areasCheckedHandler(inputsData)"
        />
        <CheckItems
          title="電影類型"
          className="film-categories"
          :inputsData="categoriesData"
          @checkHandler="(inputsData) => categoriesCheckedHandler(inputsData)"
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
          className="creators"
          :inputsData="creatorInputs"
          :addHandler="addCreatorHandler"
          :deleteHandler="deleteCreatorHandler"
        />
        <InputMultiple
          dataType="people"
          title="小說原創"
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
          title="電影簡述"
          id="filmBrief"
          inputType="textarea"
          :inputData="newFilmData.brief"
          v-model="newFilmData.brief"
          :inputWrap="true"
          rows="3"
        />
        <SingleInput
          title="劇情大綱"
          id="filmSummary"
          inputType="textarea"
          :inputData="newFilmData.summary"
          v-model="newFilmData.summary"
          :inputWrap="true"
          rows="6"
        />
        <InputMultiple
          v-show="filmsListType === '影集'"
          dataType="seasons"
          title="新增季"
          :inputsData="seasonsInputs"
          v-model="newFilmData.seasons"
          :addHandler="addSeasonsHandler"
          :deleteHandler="deleteSeasonHandler"
        />
      </div>
    </div>
  </b-modal>
</template>

<script>
  import { addInputHandler, deleteInputHandler, inputPeaple, inputArray } from '~/plugins/helper';
  import InputMultiple from '~/components/formElements/InputMultiple';
  import SingleInput from '~/components/formElements/SingleInput';
  import CheckItems from '~/components/formElements/CheckItems';
  import SelectTool from '~/components/formElements/SelectTool';

  export default {
    components: {
      InputMultiple,
      SingleInput,
      CheckItems,
      SelectTool,
    },
    props: {
      newFilmData: {
        type: Object,
        default: () => {
          return {
            brief: '',
            et_id: '',
            imdb_id: '',
            name: '',
            my_rate: '',
            related_id: '',
            summary: '',
            trailer: '',
            tw_name: '',
            wallpaper: '',
            year: '',
          }
        }
      },
      id: {
        type: String,
        default: 'film_modal',
      },
      className: {
        type: String,
      },
      actionType: {
        type: String,
        required: true,
      },
      nextKey: {
        type: Number,
        required: true,
      },
      filmsListType: {
        type: String,
      },
      imdb_rates: {
        type: String,
        default: '',
      },
      my_rate: {
        type: String,
        default: '',
      },
      relatedDatas: {
        type: Array,
        required: true,
      },
      entertainmentData: {
        type: Array,
        required: true,
      },
      areasData: {
        type: Array,
        required: true,
      },
      directorInputs: {
        type: Array,
        default: () => [],
      },
      castInputs: {
        type: Array,
        default: () => [],
      },
      creatorInputs: {
        type: Array,
        default: () => [],
      },
      writerInputs: {
        type: Array,
        default: () => [],
      },
      pageBannersInputs: {
        type: Array,
        default: () => [],
      },
      seasonsInputs: {
        type: Array,
        default: () => [],
      },
      categoriesData: {
        type: Array,
        required: true,
      },
      favoriteCheckProps: {
        type: Boolean,
        default: false,
      },
      endCheckProps: {
        type: Boolean,
        default: false,
      },
      add_film: {
        type: Function,
      },
    },
    data () {
      return {
        action: '',
        isCheckedClass: 'is-checked',
        favoriteCheck: false,
        endCheck: false,
      }
    },
    created() {
      this.action = this.actionType === 'add' ? '新增' : '編輯';
    },
    watch: {
      favoriteCheckProps (val) {
        if (val) {
          this.favoriteCheck = val;
        }
      },
      endCheckProps (val) {
        if (val) {
          this.endCheck = val;
        }
      },
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
      addPageBanner() {
        const pageBannersInputs = this.pageBannersInputs;
        addInputHandler(pageBannersInputs, true)
      },
      deletePageBanner(inputIndex) {
        const pageBannersInputs = this.pageBannersInputs;
        deleteInputHandler(pageBannersInputs, inputIndex)
      },
      addCreatorHandler() {
        const creatorInputs = this.creatorInputs;
        addInputHandler(creatorInputs)
      },
      deleteCreatorHandler(inputIndex) {
        const creatorInputs = this.creatorInputs;
        deleteInputHandler(creatorInputs, inputIndex)
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
          year: '',
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
      areasCheckedHandler(areasData) {
        this.$emit('areasCheckedHandler', areasData);
      },
      categoriesCheckedHandler(categoriesData) {
        this.$emit('categoiesCheckedHandler',categoriesData);
      },
      add_film_submit() {
        const {
          nextKey,
          endCheck,
          favoriteCheck,
          filmsListType,
          imdb_rates,
          my_rate,
          pageBannersInputs,
          directorInputs,
          creatorInputs,
          writerInputs,
          castInputs,
          areasData,
          categoriesData,
          seasonsInputs,
        } = this;

        // areas result  地區的結果
        const area = inputArray(areasData);

        // categories result  分類的結果
        const categories = inputArray(categoriesData);

        // page banners result  內頁主圖的結果
        const page_banners = pageBannersInputs;
        // directors result  導演的結果
        const directors = inputPeaple(directorInputs);
        // cast writers  編劇的結果
        const creators = inputPeaple(creatorInputs);
        // cast writers  小說原創的結果
        const writers = inputPeaple(writerInputs);
        // cast result  演員的結果
        const cast = inputPeaple(castInputs);

        const type = filmsListType === '電影' ? 'movies' : 'series';

        const newFilmData = {
          ...this.newFilmData,
          ends: endCheck,
          favorite: favoriteCheck,
          imdb_rates: Number(imdb_rates),
          my_rate: Number(my_rate),
          area,
          categories,
          cast,
          page_banners,
          directors,
          creators,
          writers,
          seasons: seasonsInputs,
          type,
          current_key: nextKey,
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
