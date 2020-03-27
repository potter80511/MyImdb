<template>
  <div class="input-group">
    <label>{{title}}：</label>
    <input :id="id" :type="inputType" :value="inputData"  @input="$emit('input', $event.target.value)" />
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