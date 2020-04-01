<template>
  <div :class="`add_group add_${dataType}_group` + ' ' + className">
    <div class="add_item_btn">
      <label>{{title}}</label>
      <font-awesome-icon icon="plus" @click="addHandler" />
    </div>
    <div v-if="inputsData.length > 0">
      <div
        v-show="dataType === 'people' || dataType === 'banner'"
        class="input-people-input-group input-group"
        v-for="(input, i) in inputsData"
        :key="className + '_' +i"
      >
        <input
          v-if="dataType === 'people'"
          type="text"
          v-model="input.name"
        />
        <input
          v-else-if="dataType === 'banner'"
          type="text"
          v-model="input.url"
        />
        <font-awesome-icon icon="times" @click="deleteHandler(i)" />
      </div>
      <div
        v-show="dataType === 'seasons'"
        class="seasons_group input-group"
        v-for="(item, i) in inputsData"
        :key="'season_' + i">
        <div class="title">
          <h3>第 {{i+1}} 季</h3>
          <font-awesome-icon icon="times" @click="deleteHandler(i)" />
        </div>
        <div class="input-group">
          <label>季名稱：</label>
          <input
            :id="`seasonSummary${i}`"
            type="textarea"
            v-model="item.name"
          />
        </div>
        <div class="input-group">
          <label>預告：</label>
          <input :id="`seasonTrailer${i}`" type="text" v-model="item.trailer" />
        </div>
        <div class="input-group">
          <label>劇情大綱：</label>
          <input :id="`seasonSummary${i}`" type="textarea" v-model="item.sum" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dataType: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      className: {
        type: String,
      },
      inputsData: {
        type: Array,
        required: true,
      },
      addHandler: {
        type: Function,
        required: true,
      },
      deleteHandler: {
        type: Function,
        required: true,
      },
    },
  }
</script>

<style lang="scss">
  @import "~/assets/scss/formElements/input_people.scss";
</style>