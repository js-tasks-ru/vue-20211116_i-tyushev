<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === 'loading' }"
      :style="background && `--bg-url: url(${background})`"
      @click="clickHandler"
    >
      <span class="image-uploader__text">{{ message }}</span>
      <input
        ref="input"
        v-bind="$attrs"
        accept="image/*"
        class="image-uploader__input"
        type="file"
        @change="uploadImage"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },
  emits: ['select', 'upload', 'remove', 'error'],
  data() {
    return {
      messageMap: {
        empty: 'Загрузить изображение',
        loading: 'Загрузка...',
        uploaded: 'Удалить изображение',
      },
      state: this.preview ? 'uploaded' : 'empty',
      previewImage: null,
    };
  },
  computed: {
    message() {
      return this.messageMap[this.state];
    },
    background() {
      return this.previewImage || this.preview;
    },
  },
  methods: {
    uploadImage(event) {
      const file = event.target.files[0];
      this.setLoadingState();
      this.$emit('select', file);

      if (this.uploader) {
        this.uploader(file).then(this.successUpload, this.failureUpload);
      } else {
        this.setUploadedState();
        this.previewImage = URL.createObjectURL(file);
      }
    },
    successUpload(result) {
      this.setUploadedState();
      this.$emit('upload', result);
      this.previewImage = result.image;
    },
    failureUpload(error) {
      this.$emit('error', error);
      this.setEmptyState();
      this.clearInputValue();
    },
    clickHandler(event) {
      if (this.state !== 'empty') {
        event.preventDefault();
      }
      if (this.state === 'uploaded') {
        this.remove();
      }
    },
    remove() {
      this.previewImage = null;
      this.$emit('remove');
      this.setEmptyState();
      this.clearInputValue();
    },
    setEmptyState() {
      this.state = 'empty';
    },
    setLoadingState() {
      this.state = 'loading';
    },
    setUploadedState() {
      this.state = 'uploaded';
    },
    clearInputValue() {
      this.$refs.input.value = null;
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
