<template>
  <div :id="blockId" :class="'lists ' + blockClass">
    <div class="container">
      <nuxt-link :to="'/' + type" v-if="type === 'series'" class="more">
        更多影集
        <font-awesome-icon icon="angle-double-right" />
      </nuxt-link>
      <nuxt-link :to="'/' + type" v-else-if="type === 'movies'" class="more">
        更多電影
        <font-awesome-icon icon="angle-double-right" />
      </nuxt-link>
      <div class="section-header">
        <h2>{{sectionTitle}}<span>{{subTitle}}</span></h2>
      </div>
      <div
        class="isLoading"
        v-show="isLoading"
      >
        <font-awesome-icon icon="spinner" spin/>
      </div>
      <div
        v-swiper:indexListSwiper="swiperOpitons"
        v-if="filmsData.length > 0"
      >
        <div class="swiper-wrapper">
          <div class="swiper-slide"
            v-for="(item, i) in filmsData"
            :key="i">
            <IndexListSwiperSlide
              :imdbId="item.imdb_id"
              :wallpaper="item.wallpaper"
              :rates="item.rates"
              :name="item.tw_name"
              :brief="item.brief"
              :id="item.id"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-button-prev swiper-button" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button" slot="button-next"></div>
  </div>
</template>

<script>
  import IndexListSwiperSlide from './IndexListSwiperSlide';

  export default {
    props: {
      isLoading: {
        type: Boolean,
      },
      blockId: {
        type: String,
        default: '',
      },
      blockClass: {
        type: String,
        default: '',
      },
      sectionTitle: {
        type: String,
        default: '',
        required: true
      },
      subTitle: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: '/',
      },
      filmsData: {
        type: Array,
        default: [],
        required: true
      },
    },
    components: {
      IndexListSwiperSlide
    },
    data() {
      return {
        swiperOpitons: {
          slidesPerView: 5,
          spaceBetween: 30,
          speed: 800,
          loop: true,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          breakpoints: {
            1199: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
            },
            575: {
              slidesPerView: 2,
            },
          },
          navigation: {
            nextEl: '#' + this.blockId + ' .swiper-button-next',
            prevEl: '#' + this.blockId + ' .swiper-button-prev',
          }
        },
      }
    }
  }
</script>

<style lang="scss">

</style>