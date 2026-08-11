<template>
  <!-- 日期选择器组件 -->
  <el-date-picker v-model="value">
    <!-- 自定义插槽 -->
    <template v-for="(value, key) in slots" #[key]>
      <slot :name="value" :config="config" />
    </template>
  </el-date-picker>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElDatePicker } from 'element-plus'
import type { FormItem } from '../types'

/**
 * 日期选择器组件
 * 基于 Element Plus 的 el-date-picker 组件
 */
const props = defineProps<{
  modelValue?: any  // 选中值
  config: FormItem  // 组件配置
  slots?: Record<string, any>  // 自定义插槽配置
}>()

/**
 * 组件事件
 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void  // 数据更新事件
}>()

/**
 * 选中值
 * 双向绑定到 modelValue
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
