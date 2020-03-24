<template>
  <div>
    <div>
      <nuxt-link :to="{ name: 'filmDetails-id', params: {id: imdbId}}">
        <img :src="wallpaper">
      </nuxt-link>
    </div>
    <div class="list_content">
      <div style="display: none;">{{id}}</div>
      <div class="rates">
        <span v-for="(star, j) in rateStarWithEmpty(rates)"
              :key="j">
          <font-awesome-icon v-if="star==='star'" icon="star" />
          <font-awesome-icon v-if="star==='half'" icon="star-half-alt" />
          <font-awesome-icon v-if="star==='empty'" :icon="['far', 'star']"/>
        </span>
        <b>{{rates.toFixed(1)}}</b>
      </div>
      <div class="film_title">
        <h2>{{ name }}</h2>
      </div>
      <div class="discription">
        <p>{{ brief }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { rateStarWithEmpty } from '~/plugins/helper';

  export default {
    props: {
      id: {
        type: String,
        default: 0
      },
      imdbId: {
        type: String,
        default: '',
      },
      wallpaper: {
        type: String,
        default: '',
      },
      rates: {
        type: Number,
        default: 0,
      },
      name: {
        type: String,
        default: '',
      },
      brief: {
        type: String,
        default: '',
      },
    },
    methods: {
      rateStarWithEmpty(rates) {
        return rateStarWithEmpty(rates)
      },
    }
  };
</script>