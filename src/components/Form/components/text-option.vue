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
import { useOptionalDictionaryStore } from '../../Dictionary/useDictionary'

const props = defineProps<{
  modelValue?: any
  config: FormItem
}>()

const dictionaryStore = useOptionalDictionaryStore()

// 获取显示值
const getDisplayValue = (value: string | number) => {
  return getValueDisplayLabel(value, props.config, dictionaryStore)
}
</script>
