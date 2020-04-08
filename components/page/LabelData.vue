<template>
  <div :class="`label_data multiple_items ${className}`">
    <b>{{title}}：</b>
    <div v-if="multipleDatas">
      <span v-for="(item, i) in multipleDatas" :key="i">
        {{item.name}}
      </span>
    </div>
    <span v-else>{{singleData}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
      },
      className: {
        type: String,
      },
      singleData: {
        type: String,
      },
      multipleDatas: {
        type: Array,
      },
    }
  }
</script>