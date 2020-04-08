<template>
  <div class="input-group select-tool film-related">
    <label>{{title}}：</label>
    <div class="related-select">
      <select :value="data_id" @input="$emit('input', $event.target.value)">
        <option value="" selected hidden>請選擇</option>
        <option value="">無</option>
        <option
          v-for="(item, i) in optionDatas"
          :value="item.id"
          :key="i"
        >{{item.tw_name}}</option>
      </select>
      <font-awesome-icon icon="chevron-down" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
      },
      data_id: {
        type: String,
        required: true,
      },
      optionDatas: {
        type: Array,
        required: true,
      },
    },
  }
</script>
