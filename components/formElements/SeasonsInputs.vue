<template>
  <div
    class="add_seasons_group"
  >
    <div class="add_item_btn">
      <label>新增季</label>
      <font-awesome-icon icon="plus" @click="addSeasonsHandler" />
    </div>
    <div
      class="seasons_group"
      v-for="(item, i) in seasonsInputs"
      :key="i">
      <div class="title">
        <h3>第 {{i+1}} 季</h3>
        <font-awesome-icon icon="times" @click="deleteSeasonHandler(seasonsInput.id, i)" />
      </div>
      <div class="input-group">
        <label>季名稱：</label>
        <input
          id="seasonSummary"
          type="textarea"
          v-model="item.name"
        />
      </div>
      <div class="input-group">
        <label>預告：</label>
        <input id="seasonTrailer" type="text" v-model="item.trailer" />
      </div>
      <div class="input-group">
        <label>劇情大綱：</label>
        <input id="seasonSummary" type="textarea" v-model="item.sum" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
      },
      className: {
        type: String,
      },
      inputType: {
        type: String,
        default: 'text'
      },
      title: {
        type: String,
        required: true,
      },
      inputData: {
        type: String,
        required: true,
      },
    },
  }
</script>