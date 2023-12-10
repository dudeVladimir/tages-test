<template>
  <div class="breadcrumbs-container">
    <div class="breadcrumbs-container__content">
      <ul v-if="items?.length" class="breadcrumbs-list">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="breadcrumbs-list__item ui-text-m-1"
          :class="{ active: isLastItem(index, items.length) }"
        >
          <div class="breadcrumb-body">
            {{ item.title }}
          </div>
          <div v-if="!isLastItem(index, items.length)" class="breadcrumb-separator ml-3">/</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const isLastItem = (idx, length) => {
  if (Number.isInteger(idx) && Number.isInteger(length)) {
    const lastIdx = length - 1;
    if (lastIdx < 0) {
      console.warn('lastIdx is less than 0');
      return false;
    }

    return idx === lastIdx;
  }

  return false;
};
</script>

<style lang="scss" scoped>
.breadcrumbs-container {
  &__content {
    .breadcrumbs-list {
      display: flex;
      gap: 12px;
      &__item {
        display: flex;
        color: var(--gray-3-color);
        &.active {
          color: var(--black-color);
        }
      }
    }
  }
}
</style>
