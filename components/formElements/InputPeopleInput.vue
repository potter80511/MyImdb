<template>
  <div class="input-people-input-group">
    <input
      type="text"
      :value="name" @input="$emit('input', $event.target.value)"
    />
    <font-awesome-icon icon="times" @click="deleteHandler(inputIndex)" />
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      deleteHandler: {
        type: Function,
      },
      inputIndex: {
        type: Number
      }
    }
  }
</script>