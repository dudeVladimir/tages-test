<template>
  <div class="ui-img">
    <img class="ui-img__img-content" :src="src" :alt="alt">
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    default: null,
    requred: true,
  },
  alt: {
    type: String,
    default: null,
    requred: true,
  },
});
</script>

<style lang="scss" scoped>
.ui-img {
  height: 100%;
  &__img-content {
    height: inherit;
    object-fit: cover;
  }
}
</style>
