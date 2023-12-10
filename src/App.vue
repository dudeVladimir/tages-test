<template>
  <div class="app-container">
    <div class="app-container__content">
      <TheHeader class="app-header" />

      <main class="app-body">
        <GoodsLayout
          class="app-body__content app-body__content_goods"
          header="Комплекты стеллажных систем"
        />
      </main>
    </div>
  </div>
</template>

<script setup>
import TheHeader from './ui-kit/layouts/TheHeader.vue';
import GoodsLayout from './goods/GoodsLayout.vue';

</script>

<style lang="scss">
.app-container {
  height: 100%;
  &__content {
    height: inherit;
    display: flex;
    flex-direction: column;
    // position: relative;
    overflow: auto;
    .app-header {
      // position: sticky;
      // top: 0;
      height: auto;
      flex: 0 0 auto;
    }
    .app-body {
      height: inherit;
      flex: 0 1 auto;
    }
  }
}
</style>
