<template>
  <div class="toast" :class="toastClass">
    <ui-icon class="toast__icon" :icon="toastIcon" />
    <span><slot /></span>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

const toastOptions = {
  success: { class: 'toast_success', icon: 'check-circle' },
  error: { class: 'toast_error', icon: 'alert-circle' },
};

export default {
  name: 'UiToast',

  toastOptions,

  components: { UiIcon },

  props: {
    toastType: {
      type: String,
      required: true,
      validator: (item) => Object.keys(toastOptions).includes(item),
    },
  },

  computed: {
    toastClass() {
      return toastOptions[this.toastType]['class'];
    },
    toastIcon() {
      return toastOptions[this.toastType]['icon'];
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
