<template>
  <div class="toasts">
    <ui-toast v-for="toast in toasts" :key="toast.id" :toast-type="toast.type">{{ toast.message }}</ui-toast>
  </div>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    error(message) {
      this.createToast('error', message);
    },
    success(message) {
      this.createToast('success', message);
    },
    createToast(type, message, msTimeToLive = 5000) {
      const toast = { type: type, message: message }

      toast.id = setTimeout(() => {
        const removeIndex = this.toasts.indexOf(toast);
        this.deleteToast(removeIndex, 1);
      }, msTimeToLive);

      this.toasts.push(toast);
    },
    deleteToast(index) {
      this.toasts.splice(index, 1);
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
