<template>
  <button class="ui-icon-button" :style="styleObj">
    <div class="ui-icon-button__content">
      <div class="icon" :class="`icon-${icon}`" />
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    default: null,
    required: true,
  },
  color: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: null,
  },
});

const styleObj = computed(() => ({
  color: props.color,
  fontSize: props.size,
}));
</script>

<style lang="scss" scoped>
.ui-icon-button {
  transition: all 0.12s;
  color: var(--black-color);
  &:hover {
    filter: brightness(115%);
  }
  &:active {
    filter: brightness(85%);
  }
  &__content {
    padding: 7px;
    .icon {
      font-size: 20px;
    }
  }
}
</style>
