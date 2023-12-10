<template>
  <div class="goods-layout">
    <div class="goods-layout__content default-layout-content pb-5">
      <div class="goods-header">
        <div class="goods-header__text pro-heading-m-1 mb-8">
          {{ header }}
        </div>

        <GoodsFilter v-model="filterParams" class="goods-filter-container" />
      </div>
      <section class="goods-body">
        <ul v-if="filteredGoodsList.length" class="goods-list">
          <li
            v-for="(item, idx) in filteredGoodsList"
            :key="item.id ?? idx"
            class="goods-list__item"
          >
            <GoodsItem :item="item" />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

import { isObject, isNumber } from '@/helpers';

import GoodsFilter from './components/GoodsFilter.vue';
import GoodsItem from './components/GoodsItem.vue';

defineProps({
  header: {
    type: String,
    default: null,
    requred: true,
  },
});
const $s = useStore();

const filterParams = ref({
  sort: null,
  material: null,
});
const goodsList = computed(() => $s.getters['goods/getItemList'].filter((e) => isObject(e)));

const filteredGoodsList = computed(() => {
  const list = Array.isArray(goodsList.value) ? [...goodsList.value] : [];
  const { sort, material } = filterParams.value;

  if (sort) {
    list.sort((a, b) => {
      const aCurrentPrice = a?.price?.current_price;
      const bCurrentPrice = b?.price?.current_price;

      if (sort === 'price_increase') {
        if (aCurrentPrice < bCurrentPrice) return -1;
        if (aCurrentPrice > bCurrentPrice) return 1;
      }

      if (sort === 'price_decrease') {
        if (aCurrentPrice > bCurrentPrice) return -1;
        if (aCurrentPrice < bCurrentPrice) return 1;
      }

      return 0;
    });
  }

  if (material) {
    return list.filter((goodsItem) => {
      const itemMaterial = goodsItem.material;

      const materialToNumber = material != null ? Number(material) : null;

      if (isNumber(materialToNumber)) return itemMaterial === Number(material);

      return true;
    });
  }

  return list;
});

const loading = ref(false);

const loadItemList = async () => {
  try {
    await $s.dispatch('goods/loadItemList');
  } catch (err) {
    console.error(err);
  }
};
const loadMaterialList = async () => {
  try {
    await $s.dispatch('goods/loadMaterialList');
  } catch (err) {
    console.error(err);
  }
};

const initPage = () => {
  loading.value = true;

  Promise.all([
    loadItemList(),
    loadMaterialList(),
  ])
    .finally(() => {
      loading.value = false;
    });
};

initPage();
</script>

<style lang="scss" scoped>
.goods-layout {
  &__content {
    .goods-header {
      &__text {
        line-height: 48px;
      }
    }
    .goods-body {
      margin-top: 41px;
      .goods-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 48px;
        row-gap: 40px;
        &__item {
          height: 100%;
          width: 100%;
          overflow: hidden;
        }
        @media (max-width: 1300px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1050px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 650px) {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }
  }
}
</style>
