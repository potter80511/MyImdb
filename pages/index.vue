<template>
  <div class="home">
    <BannerSlide
      :bannerData="indexBannerData"
      :paginationOn="true"
      :isLoading="bannerIsLoading"
    />
    <IndexList
      :blockId="'series'"
      :type="'series'"
      :blockClass="'series_list'"
      :sectionTitle="'最愛影集'"
      :subTitle="'Favorite Series'"
      :filmsData="[]"
      :isLoading="seriesIsLoading"
    />
    <IndexList
      :blockId="'movies'"
      :type="'movies'"
      :blockClass="'movies_list'"
      :sectionTitle="'最愛電影'"
      :subTitle="'Favorite Movies'"
      :filmsData="[]"
      :isLoading="moviesIsLoading"
    />
  </div>
</template>

<script>
  import { rateStarWithEmpty } from '~/plugins/helper';
  import IndexList from '~/components/index_lists/IndexList';
  import BannerSlide from '~/components/BannerSlide';

  export default {
    created() {
      this.$store.dispatch('loadedIndexBanners')
    },
    components: {
      IndexList,
      BannerSlide,
    },
    computed: {
      indexBannerData() {
        console.log(this.$store.state.indexBanners)
        return this.$store.state.indexBanners;
      },
      bannerIsLoading() {
        return this.$store.state.indexBannersIsLoading
      },
      moviesIsLoading() {
        return this.$store.state.moviesIsLoading
      },
      seriesIsLoading() {
        return this.$store.state.seriesIsLoading
      },
      moviesData() {
        // return this.$store.getters.filterFavoriteMovies.sort((a,b) => {
        //   return b.rates - a.rates;
        // })
      },
      seriesData() {
        // return this.$store.getters.filterFavoriteSeries.sort((a,b) => {
        //   return b.rates - a.rates;
        // })
      },
    },
    methods: {
      // bannerRWD() {
      //   const bannerWidth = this.$refs.bannerSlide.clientWidth;
      //   return bannerRWD(bannerWidth);
      // }
    }
  };
</script>
<style lang="scss">
  @import "../assets/scss/home.scss";
</style>
