<template>
  <div class="goods-filter">
    <div class="goods-filter__content">
      <UiSelect
        v-model="filterObj.sort"
        title="Сортировать по:"
        :items="sortTypes"
        :item-value="itemValue"
        :item-text="itemText"
      />
      <UiSelect
        v-model="filterObj.material"
        title="Материал"
        :items="materialList"
        :item-value="itemValue"
        :item-text="itemText"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      sort: null,
      material: null,
    }),
  },
});
const $emits = defineEmits(['update:modelValue']);
const $s = useStore();

const filterObj = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    $emits('update:modelValue', v);
  },
});

const materialList = computed(() => $s.getters['goods/getMaterialList']);
const sortTypes = ref([
  {
    id: 'price_increase',
    name: 'Цена по возрастанию',
  },
  {
    id: 'price_decrease',
    name: 'Цена по убыванию',
  },
]);

const itemValue = (item) => item?.id;
const itemText = (item) => item?.name;
</script>

<style lang="scss" scoped>
.goods-filter {
  &__content {
    display: flex;
    gap: 24px;
  }
}
</style>
