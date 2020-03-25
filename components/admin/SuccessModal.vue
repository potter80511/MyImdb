<template>
  <b-modal
    id="success-modal"
    modal-class="success"
    title=""
    ok-title="ok"
    :hide-header="true"
    :ok-only="true"
  >
    <div class="success-content">
      <p>{{successTitle}}！</p>
    </div>
  </b-modal>
</template>

<script>
  export default {
    props: {
      successTitle: {
        type: String,
        required: true,
      },
    },
    methods: {
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