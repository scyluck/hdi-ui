<template>
  <el-time-picker v-model="value">
    <template v-for="(value, key) in slots" #[key]>
      <slot :name="value" :config="config" />
    </template>
  </el-time-picker>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElTimePicker } from 'element-plus'
import type { FormItem } from '../types'

const props = defineProps<{
  modelValue?: any
  config: FormItem
  slots?: Record<string, any>  // 自定义插槽配置
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
