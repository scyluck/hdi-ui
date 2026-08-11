<template>
  <div class="text-wrapper">
    <template v-if="Array.isArray(modelValue)">
      <span v-for="(itemValue, index) in modelValue" :key="index">
        {{ getDisplayValue(itemValue) }}
        <template v-if="index < modelValue.length - 1">, </template>
      </span>
    </template>
    <template v-else>
      {{ getDisplayValue(modelValue) }}
    </template>
  </div>
</template>

<script setup lang="ts">
import { getValueDisplayLabel } from '../utils'
import type { FormItem } from '../types'

const props = defineProps<{
  modelValue?: any
  config: FormItem
}>()

// 获取显示值
const getDisplayValue = (value: string | number) => {
  return getValueDisplayLabel(value, props.config)
}
</script>
