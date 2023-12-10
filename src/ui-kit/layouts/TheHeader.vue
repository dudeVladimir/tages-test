<template>
  <header class="header-container">
    <div class="header-container__content default-layout-content py-8">
      <TheBreadcrumbs :items="breadcrumbsList" />
    </div>
  </header>
</template>

<script setup>
import TheBreadcrumbs from './breadcrumbs/TheBreadcrumbs.vue';

const breadcrumbsList = [
  {
    title: 'Главная',
  },
  {
    title: 'Системы хранения',
  },
  {
    title: 'Комплекты стеллажных систем',
  },
];
</script>

<style lang="scss" scoped>
.header-container {
  background: var(--white-color)
}
</style>
