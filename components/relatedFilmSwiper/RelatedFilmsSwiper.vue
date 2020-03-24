<template>
  <div
    v-swiper:relatedSwiper="relatedSwiperOpitons"
    v-if="relatedData.length > 0"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide item"
        v-for="(related, i) in relatedData"
        :key="i"
      >
        <img :src="related.wallpaper" />
        <a :href="'/filmDetails/' + related.imdb_id">
          <span>{{related.tw_name}}</span>
        </a>
      </div>
    </div>
    <div class="swiper-button-prev swiper-button" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button" slot="button-next"></div>
  </div>
</template>

<script>
  export default {
    props: {
      relatedData: {
        type: Array,
      },
      blockClass: {
        type: String,
      }
    },
    data() {
      return {
        relatedSwiperOpitons: {
          slidesPerView: 6,
          spaceBetween: 30,
          speed: 800,
          // autoplay: {
          //   delay: 4000,
          //   disableOnInteraction: false,
          // },
          breakpoints: {
            1199: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 3,
            },
          },
          navigation: {
            nextEl: '.' + this.blockClass + ' .swiper-button-next',
            prevEl: '.' + this.blockClass + ' .swiper-button-prev',
          }
        },
      }
    }
  }
</script>