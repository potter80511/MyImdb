<template>
  <div class="banner" ref="bannerSlide">
    <div
      class="isLoading"
      v-show="isLoading"
    >
      <font-awesome-icon icon="spinner" spin/>
    </div>
    <div
      v-swiper:swiperBannerBg="swiperBanner"
      v-if="bannerData.length > 0 && background === true"
    >
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, i) in bannerData"
          :key="i"
          :style="{backgroundImage: 'url(' + item + ')', height: 50 + 'vw'}"
        >
        </div>
      </div>
    </div>
    <div
      v-swiper:swiperBannerSlide="swiperBanner"
      v-else-if="bannerData.length > 0"
    >
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, i) in bannerData"
          :key="i"
          >
          <img :src="item" />
        </div>
      </div>
    </div>
    <div class="swiper-button-prev swiper-button" slot="button-prev">
      <font-awesome-icon icon="chevron-left" />
    </div>
    <div class="swiper-button-next swiper-button" slot="button-next">
      <font-awesome-icon icon="chevron-right" />
    </div>
    <div class="swiper-pagination" slot="pagination" v-if="paginationOn"></div>
  </div>
</template>

<script>
  export default {
    props: {
      isLoading: {
        type: Boolean,
      },
      bannerData: {
        type: Array,
      },
      paginationOn: {
        type: Boolean,
        default: false
      },
      background: {
        default: false
      }
    },
    data() {
      return {
        swiperBanner: {
          speed: 800,
          loop: true,
          effect: 'fade',
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: '.banner .swiper-button-next',
            prevEl: '.banner .swiper-button-prev',
          },
          pagination: {
            el: '.banner .swiper-pagination',
            clickable: true,
          },
        },
      }
    }
  }
</script>