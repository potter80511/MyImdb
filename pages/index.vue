<template>
  <div class="home">
    <BannerSlide
      :bannerData="indexBannerData"
      :paginationOn="true"
      :isLoading="seriesIsLoading"
    />
    <IndexList
      :blockId="'series'"
      :type="'series'"
      :blockClass="'series_list'"
      :sectionTitle="'最愛影集'"
      :subTitle="'Favorite Series'"
      :filmsData="seriesData"
      :isLoading="seriesIsLoading"
    />
    <IndexList
      :blockId="'movies'"
      :type="'movies'"
      :blockClass="'movies_list'"
      :sectionTitle="'最愛電影'"
      :subTitle="'Favorite Movies'"
      :filmsData="moviesData"
      :isLoading="moviesIsLoading"
    />
  </div>
</template>

<script>
  import { rateStarWithEmpty } from '~/plugins/helper';
  import IndexList from '~/components/index_lists/IndexList';
  import BannerSlide from '~/components/BannerSlide';

  export default {
    components: {
      IndexList,
      BannerSlide,
    },
    computed: {
      moviesIsLoading() {
        return this.$store.state.moviesIsLoading
      },
      seriesIsLoading() {
        return this.$store.state.seriesIsLoading
      },
      moviesData() {
        return this.$store.getters.filterFavoriteMovies.sort((a,b) => {
          return b.rates - a.rates;
        })
      },
      seriesData() {
        return this.$store.getters.filterFavoriteSeries.sort((a,b) => {
          return b.rates - a.rates;
        })
      },
      indexBannerData() {
        return this.$store.getters.filterIndexBanner;
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
