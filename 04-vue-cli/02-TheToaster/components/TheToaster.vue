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
      toastIndex: 0,
    };
  },

  methods: {
    error(message) {
      this.createToast('error', message, 2000);
    },
    success(message) {
      this.createToast('success', message, 5000);
    },
    createToast(type, message, msTimeToLive = 5000) {
      const toastId = ++this.toastIndex;
      this.toasts.push({ id: toastId, type: type, message: message });
      setTimeout(() => {
        const removeIndex = this.toasts.findIndex((item) => item.id === toastId);
        this.toasts.splice(removeIndex, 1);
      }, msTimeToLive);
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
