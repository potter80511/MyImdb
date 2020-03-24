<template>
  <div id="back_to_top"
    @click="BackToTop()"
    :class="{'show' : isShowBackTop}"
  >
    <font-awesome-icon icon="chevron-up" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShowBackTop: false,
      }
    },
    mounted() {
      let headerHeight = document.getElementById('header').clientHeight
      document.addEventListener('scroll', () => {
        if(window.pageYOffset > headerHeight){
          this.isShowBackTop = true;
        } else {
          this.isShowBackTop = false;
        }
      });
    },
    methods: {
      BackToTop() {
        let four = 0;
        const ForScrollBy = (e) => {
          if(window.pageYOffset <= 0){
            clearInterval(four);
          }else{
            window.scrollBy(0,-30);
          }
        }
        four = setInterval(ForScrollBy,0.5);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/color.scss";
  #back_to_top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 1;
    background: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 5px #000;
    cursor: pointer;
    opacity: 0;
    transition: all .3s;
    &.show {
      opacity: 1;
    }
    svg {
      color: $iron-gray;
    }
  }
</style>