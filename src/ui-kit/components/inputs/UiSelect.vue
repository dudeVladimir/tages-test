<template>
  <div class="ui-select">
    <label :for="generatedID" class="ui-select__content">
      <div v-if="title" class="select-title pro-text-xs-1 pl-4">{{ title }}</div>
      <div class="select-body">
        <select
          :value="modelValue"
          ref="selectRef"
          :id="generatedID"
          class="select-block pro-text-s-1"
          @change="selectItem"
        >
          <option
            class="select-block__option"
            value="__null"
            selected
          >
            Не выбрано
          </option>

          <option
            v-for="(item, idx) in items"
            :key="idx"
            class="select-block__option"
            :value="itemValue(item)"
          >
            {{ itemText(item) }}
          </option>
        </select>
      </div>
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import { generateRandomNumber } from '@/helpers';

defineProps({
  modelValue: {},
  title: {
    type: String,
    default: null,
  },
  items: {
    type: Array,
    default: () => [],
  },
  itemValue: {
    type: Function,
    default: null,
    required: true,
  },
  itemText: {
    type: Function,
    default: null,
    required: true,
  },
});
const $emits = defineEmits(['update:modelValue']);

const generatedID = ref(`${generateRandomNumber(1, 10 ** 8)}-${new Date().getTime()}`);

const selectRef = ref(null);

const selectItem = () => {
  if (selectRef.value) {
    const { value } = selectRef.value;
    $emits('update:modelValue', value === '__null' ? null : value);
  }
};

</script>

<style lang="scss" scoped>
.ui-select {
  cursor: pointer;
  &__content {
    display: block;
    .select-title {
      color: var(--gray-2-color);
    }
    .select-body {
      position: relative;
      background: var(--secondary-color);
      .select-block {
        background: transparent;
        padding: 10px 40px 10px 16px;
        border: none;
        &:focus {
          outline: 1px solid var(--success-color);
        }
      }
    }
  }
}
</style>
