<template>
  <header id="header">
    <div class="h_wrap">
      <div class="logo">
        <nuxt-link
          to="/"
          class="navbarLink"
        >
          <span>My</span>
          <strong>IMDB</strong>
        </nuxt-link>
      </div>
      <div class="menu">
        <div class="main_nav desktop">
          <nuxt-link
            to="/"
          >
            HOME
          </nuxt-link>
          <nuxt-link
            to="/movies"
          >
            Movies
          </nuxt-link>
          <nuxt-link
            to="/series"
          >
            Series
          </nuxt-link>
          <a
            href="javacript: void(0);"
            @click="logout"
            v-if="isLogin"
          >Logout</a>
          <b-button
            id="show-login-btn"
            @click="$bvModal.show('login')"
            v-else
          >
            login
          </b-button>
        </div>
        <font-awesome-icon icon="bars" ref="menuBar" />
      </div>
    </div>
    <div class="mobile" ref="mobile">
      <div class="mobile_block" ref="mobile_block"></div>
      <div class="mobile_menu">
        <div class="main_nav">
          <nuxt-link
              to="/"
              class="navbarLink"
            >
              HOME
          </nuxt-link>
          <nuxt-link
            to="/movies"
            class="navbarLink"
          >
            Movies
          </nuxt-link>
          <nuxt-link
            to="/series"
            class="navbarLink"
          >
            Series
          </nuxt-link>
        </div>
      </div>
    </div>
    <LoginModal
      v-if="!isLogin"
      @login_submit="(name, password) => login(name, password)"
    />
  </header>
</template>

<script>
  import LoginModal from '~/components/admin/LoginModal';
  import * as firebase from 'firebase';

  export default {
    components: {
      LoginModal,
    },
    methods: {
      login(name, password) {
        firebase.auth().signInWithEmailAndPassword(name, password).then(cred => {
          const loginUser = cred.user.email;
          console.log(`${loginUser} is login`);
        });
      },
      logout() {
        firebase.auth().signOut().then((cred) => {
          console.log(`Admin is logout`)
        });
      },
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin;
      },
      // loginUser() {
      //   return this.$store.state.loginUser;
      // }
    },
    mounted() {

      // header 滾動時 fixed
      if(document.body.clientWidth > 991) {
        document.addEventListener('scroll', () => {
          if(window.pageYOffset > 0) {
            document.getElementById('header').classList.add("onScrolled");
          } else {
            document.getElementById('header').classList.remove("onScrolled");
          }
        })
      }

      // 手機版 menu drawer
      let mobileOn = false;
      this.$refs.menuBar.addEventListener('click', () => {
        mobileOn = !mobileOn;
        switch(mobileOn) {
          case true:
            this.$refs.mobile.classList.add("draw_in");
            break;
          case false:
            this.$refs.mobile.classList.remove("draw_in");
            break;
        }
      });
      this.$refs.mobile_block.addEventListener('click', () => {
        this.$refs.mobile.classList.remove("draw_in");
        mobileOn = false;
      });

      let navbarLink = document.getElementsByClassName('navbarLink')
      for(let i = 0; i < navbarLink.length; i++) {
        navbarLink[i].addEventListener('click', () => {
          this.$refs.mobile.classList.remove("draw_in");
          mobileOn = false;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~/assets/scss/header.scss";
</style>
