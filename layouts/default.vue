<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
    <BackToTop />
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer';
import BackToTop from '~/components/BackToTop';

export default {
  components: {
    Header,
    Footer,
    BackToTop,
  },
  created() {
    this.$store.dispatch('loadedMovies')
    this.$store.dispatch('loadedSeries')
    this.$store.dispatch('loginState')
  },
}
</script>

<style lang="scss">
  @import "~/assets/scss/theme.scss";
</style>
