<template>
  <div class="goods-item">
    <div class="goods-item__content">
      <div class="goods-img">
        <UiImg :src="item.image.url" :alt="calcAltText" />
      </div>
      <div class="goods-description">
        <div class="goods-description__info">
          <div
            v-if="item.code"
            class="goods-code text-ellipsis ui-text-xs-1 fs-10"
            :title="item.code"
          >
            {{ item.code }}
          </div>
          <div
            v-if="item.name"
            class="goods-title text-ellipsis ui-text-m-2"
            :title="item.name"
          >
            {{ item.name ?? '—' }}
          </div>
          <div v-if="item.price" class="goods-price ui-text-m-1">
            <div v-if="isNumber(item.price.old_price)" class="goods-price__old">
              {{ item.price.old_price }} ₽
            </div>
            <div v-if="isNumber(item.price.current_price)" class="goods-price__current">
              {{ item.price.current_price }} ₽
            </div>
          </div>
        </div>
        <div class="goods-description__tools">
          <UiIconButton
            :icon="isInCart ? 'circle-checked' : 'cart'"
            :color="isInCart ? 'var(--success-color)' : null"
            @click="toCartHandler"
          />
          <UiIconButton
            icon="heart"
            :color="isFavorite ? 'var(--attention-color)' : null"
            @click="toFavoriteHandler"
          />
        </div>
      </div>
    </div>
    <div v-if="isOnSale" class="goods-item__flag goods-item__flag_sale pro-text-s-2">Скидка</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { isObject, isNumber } from '@/helpers';

const props = defineProps({
  item: {
    type: Object,
    default: null,
    required: true,
  },
});

const $s = useStore();

const cartIdList = computed(() => $s.getters['goods/getCartIdList']);
const favoriteIdList = computed(() => $s.getters['goods/getFavoriteIdList']);

const calcAltText = computed(() => {
  const textArr = [];

  const { name, code } = props.item;

  if (name) textArr.push(name);
  if (code) textArr.push(code);

  return textArr.length ? textArr.join(': ') : 'Не удалось загрузить изображение';
});

const isOnSale = computed(() => {
  const { price } = props.item;

  if (!isObject(price)) return false;

  // eslint-disable-next-line camelcase
  const { old_price } = price;

  return isNumber(old_price);
});

const isInCart = computed(() => cartIdList.value?.includes(props.item?.id));
const isFavorite = computed(() => favoriteIdList.value?.includes(props.item?.id));

const toCartHandler = () => {
  $s.commit('goods/toCartHandler', props.item?.id);
};

const toFavoriteHandler = () => {
  $s.commit('goods/toFavoriteHandler', props.item?.id);
};
</script>

<style lang="scss" scoped>
.goods-item {
  height: 100%;
  border: 1px solid var(--secondary-2-color);
  padding: 8px 12px;
  position: relative;
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 23px;
    height: 100%;
    .goods-img {
      height: 237px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .goods-description {
      display: flex;
      gap: 12px;
      justify-content: space-between;
      align-items: flex-end;
      &__info {
        overflow: hidden;
        flex: 0 1 100%;
        .goods-code {
          color: var(--gray-1-color);
        }
        .goods-price {
          display: flex;
          gap: 9px;
          &__old, &__current {
            flex: 0 0 auto;
          }
          &__old {
            text-decoration: line-through;
            color: var(--gray-1-color);
          }
        }
      }
      &__tools {
        flex: 0 0 auto;
        display: flex;
        gap: 11px;
      }
    }
  }
  &__flag {
    position: absolute;
    top: 8px;
    left: 0;
  }
  &__flag_sale {
    padding: 3px 16px;
    background: var(--attention-color);
    color: var(--white-color);
  }
}
</style>
