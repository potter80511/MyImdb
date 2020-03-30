<template>
  <div :class="'input-group film-check' + ` ${className}`">
    <label>{{title}}：</label>
    <div class="group">
      <div
        class="check-group"
        v-for="(item, i) in inputsData"
        :key="i"
      >
        <span
          :class="[item.checked ? isCheckedClass : '', 'category-check label-check']"
          @click="checkHandler(item.id)"
        >
        </span>
        <label>{{ item.name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
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
      // checkHandler: {
      //   type: Function,
      //   required: true,
      // },
    },
    data() {
      return {
        isCheckedClass: 'is-checked',
      }
    },
    methods: {
      checkHandler(id) {
        const inputsData = this.inputsData;
        inputsData.forEach(item => {
          if(item.id === id) {
            item.checked = !item.checked
          }
        });
        this.$emit('checkHandler',inputsData);
      },
    },
  }
</script>