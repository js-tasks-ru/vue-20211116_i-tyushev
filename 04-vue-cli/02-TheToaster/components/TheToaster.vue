<template>
  <div class="toasts">
    <ui-toast toast-type="success">Toast Example</ui-toast>
    <ui-toast toast-type="success">Toast Example</ui-toast>
    <ui-toast toast-type="error">Error Toast Example</ui-toast>


<!--    <div class="toast toast_error">-->
<!--      <ui-icon class="toast__icon" icon="alert-circle" />-->
<!--      <span>Error Toast Example</span>-->
<!--    </div>-->
  </div>
</template>

<script>
import UiIcon from './UiIcon';
import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { UiIcon, UiToast },

  methods: {
    error: function (message) {
      console.log(message);
    },
    success: function (message) {
      console.log(message);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
