<template>
  <el-color-picker v-model="value" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElColorPicker } from 'element-plus'
import type { FormItem } from '../types'

const props = defineProps<{
  modelValue?: any
  config: FormItem
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
