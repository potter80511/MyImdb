<template>
  <div :class="'input-group input-people' + ' ' + className">
    <div class="add_item_btn">
      <label>{{title}}</label>
      <font-awesome-icon icon="plus" @click="addHandler" />
    </div>
    <div v-if="inputsData.length > 0">
      <div
        class="input-people-input-group"
        v-for="(input, i) in inputsData"
        :key="i"
      >
        <InputPeopleInput
          :name="input.name"
          :deleteHandler="deleteHandler"
          :inputIndex="i"
          v-model="input.name"
        />
      </div>
      <!-- <div
        class="input-people-input-group"
        v-for="(input, i) in inputsData"
        :key="i"
      >
        <input
          type="text"
          v-model="input.name"
        />
        <font-awesome-icon icon="times" @click="deleteHandler(i)" />
      </div> -->
    </div>
  </div>
</template>

<script>
  import InputPeopleInput from '~/components/formElements/InputPeopleInput';
  export default {
    components: {
      InputPeopleInput,
    },
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
      addHandler: {
        type: Function,
        required: true,
      },
      deleteHandler: {
        type: Function,
        required: true,
      },
    },
    methods: {
    },
  }
</script>

<style lang="scss">
  @import "~/assets/scss/formElements/input_people.scss";
</style>