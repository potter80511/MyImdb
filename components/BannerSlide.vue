<template>
  <div class="banner" ref="bannerSlide">
    <div
      class="isLoading"
      v-show="isLoading"
      :style="{height: bannerDefaultHeight + 'vw'}"
    >
      <font-awesome-icon icon="spinner" spin/>
    </div>
    <div
      v-swiper:swiperBannerBg="swiperBanner"
      v-if="bannerData.length > 0 && background"
    >
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, i) in bannerData"
          :key="i"
          :style="{backgroundImage: 'url(' + item.url + ')', height: bannerDefaultHeight + 'vw'}"
        >
        </div>
      </div>
    </div>
    <div
      v-swiper:swiperBannerSlide="swiperBanner"
      v-else-if="bannerData.length > 0 && !background"
    >
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, i) in bannerData"
          :key="i"
          >
          <img :src="item.url" />
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
      bannerDefaultHeight: {
        type: Number,
        default: 50,
      },
      paginationOn: {
        type: Boolean,
        default: false,
      },
      background: {
        type: Boolean,
        default: false,
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