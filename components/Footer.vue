<template>
  <footer>
    <div class="container">
      <div class="social">
        <div class="facebook">
          <a href="https://www.facebook.com/haochiang.chien" target="_blank">
            <font-awesome-icon :icon="['fab', 'facebook-square']" />
          </a>
        </div>
        <div class="github">
          <a href="https://github.com/potter80511" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
        </div>
        <div class="youtube">
          <a href="https://www.youtube.com/channel/UCzQj08-n95D_aftgctWYdng" target="_blank">
            <font-awesome-icon :icon="['fab', 'youtube']" />
          </a>
        </div>
        <div class="instagram">
          <a href="https://www.instagram.com/johnny19910511/" target="_blank">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
        </div>
        <div class="line">
          <a href="" target="_blank">
            <font-awesome-icon :icon="['fab', 'line']" />
          </a>
        </div>
      </div>
    </div>
    <div class="copy_right">
      <div class="container">
        <span>Copyright ©  2019 All Rights Reserved by Johnny Chien</span>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/footer.scss";
</style>