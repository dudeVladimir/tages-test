<template>
  <div class="ui-img">
    <img class="ui-img__img-content" :src="calcSrc" :alt="alt">
  </div>
</template>

<script setup>
import { computed } from 'vue';

const isProduction = process.env.NODE_ENV === 'production';

const props = defineProps({
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

const calcSrc = computed(() => {
  if (!props.src) {
    console.error('src is not found');
    return null;
  }

  if (isProduction) return `/tages-test${props.src}`;

  return props.src;
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
