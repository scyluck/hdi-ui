<template>
  <!-- 开关组件 -->
  <el-switch v-model="value">
    <!-- 自定义插槽 -->
    <template v-for="(value, key) in slots" #[key]>
      <slot :name="value" :config="config" />
    </template>
  </el-switch>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElSwitch } from 'element-plus'
import type { FormItem } from '../types'

/**
 * 开关组件
 * 基于 Element Plus 的 el-switch 组件
 */
const props = defineProps<{
  modelValue?: any  // 开关状态值
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
 * 开关状态值
 * 双向绑定到 modelValue
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
