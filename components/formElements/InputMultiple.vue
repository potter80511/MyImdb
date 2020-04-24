<template>
  <div :class="`add_group add_${dataType}_group` + ' ' + className">
    <div class="add_item_btn" @click="toggle($event)">
      <label>{{title}}</label>
      <font-awesome-icon icon="plus" @click.stop="addHandler" />
      <font-awesome-icon icon="caret-down" class="arrow" />
    </div>
    <div
      class="toggle"
      ref="toggle"
      v-if="inputsData.length > 0 && (dataType === 'people' || dataType === 'banner')"
    >
      <div
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
    </div>
    <div
      class="toggle"
      ref="toggle"
      v-else-if="inputsData.length > 0 && dataType === 'seasons'"
    >
      <div
        class="seasons_group input-group"
        v-for="(item, i) in inputsData"
        :key="'season_' + i">
        <div class="title">
          <h3>第 {{i+1}} 季</h3>
          <font-awesome-icon icon="times" @click="deleteHandler(i)" />
        </div>
        <div class="input-group wrap">
          <label>季名稱：</label>
          <input
            :id="`seasonSummary${i}`"
            type="text"
            v-model="item.name"
          />
        </div>
        <div class="flex-group">
          <div class="input-group wrap">
            <label>年份：</label>
            <input :id="`seasonYear${i}`" type="text" v-model="item.year" />
          </div>
          <div class="input-group wrap">
            <label>預告：</label>
            <input :id="`seasonTrailer${i}`" type="text" v-model="item.trailer" />
          </div>
        </div>
        <div class="input-group wrap">
          <label>劇情大綱：</label>
          <textarea :id="`seasonSummary${i}`" v-model="item.sum" rows="6" />
        </div>
      </div>
    </div>
    <div ref="toggle" class="toggle" v-else-if="inputsData.length === 0">
      <p>尚無資料，請新增資料</p>
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
    data() {
      return {
        toggleOn: false,
        toggleClass: 'toggle_show'
      }
    },
    watch: {
      inputsData(to, from) {
        this.$nextTick(() => {
          this.$refs.toggle.style.maxHeight = this.$refs.toggle.scrollHeight + 'px';
        });
      }
    },
    methods: {
      toggle(event) {
        const target = event.target;
        const content = target.nextElementSibling;
        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
          content.style.maxHeight = '0';
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .toggle {
    overflow: hidden;
    transition: all .3s ease-in-out;
    max-height: 0;
  }
  @import "~/assets/scss/formElements/input_people.scss";
</style>