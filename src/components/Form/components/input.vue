<template>
  <!-- 输入框组件 -->
  <el-input v-model.trim="value">
    <!-- 单位后缀 -->
    <template v-if="config.unit" #suffix>{{ config.unit }}</template>
    <!-- 自定义插槽 -->
    <template v-for="(value, key) in slots" #[key]>
      <slot :name="value" :config="config" />
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElInput } from 'element-plus'
import type { FormItem } from '../types'

/**
 * 输入框组件
 * 基于 Element Plus 的 el-input 组件
 */
const props = defineProps<{
  modelValue?: any  // 输入值
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
 * 输入值
 * 双向绑定到 modelValue
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
