<template>
  <b-modal
    :id="id ? `${id}-success-modal` : 'success-modal'"
    modal-class="success"
    title=""
    ok-title="ok"
    :hide-header="true"
    :ok-only="true"
    @ok="okSubmit"
  >
    <div class="success-content">
      <p>{{successTitle}}！</p>
    </div>
  </b-modal>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        default: '',
      },
      successTitle: {
        type: String,
        required: true,
      },
      // okSubmit: {
      //   type: Function,
      // },
    },
    methods: {
      okSubmit() {
        this.$emit('okSubmit');
      },
    }
  }
</script>

<style lang="scss">
  #success {
    p {
      margin: 0;
    }
  }
</style>