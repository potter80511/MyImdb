<template>
  <div :class="['input-group', inputWrap ? wrapClass : '' ]">
    <label>{{title}}：</label>
    <textarea
      v-if="inputType === 'textarea'"
      :id="id"
      :value="inputData"
      @input="$emit('input', $event.target.value)"
      :class="[inputExtend ? extendClass : '']"
      :rows="rows"
    />
    <input
      v-else
      :id="id"
      :type="inputType"
      :value="inputData"
      @input="$emit('input', $event.target.value)"
      :class="[inputExtend ? extendClass : '']"
    />
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
      inputExtend: {
        type: Boolean,
        default: false,
      },
      inputWrap: {
        type: Boolean,
        default: false,
      },
      inputType: {
        type: String,
        default: 'text'
      },
      title: {
        type: String,
        required: true,
      },
      rows: {
        type: String,
        default: '',
      },
      inputData: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        extendClass: 'extend',
        wrapClass: 'wrap',
      }
    },
  }
</script>

<style lang="scss" scoped>
  label {
    margin: 0;
  }
  .extend {
    flex: 1;
  }
  .wrap {
    label {
      margin-bottom: 10px;
    }
    input, textarea {
      width: 100%;
    }
  }
</style>