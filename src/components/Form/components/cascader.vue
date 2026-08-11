<template>
  <!-- 级联选择器组件 -->
  <el-cascader ref="cascaderRef" v-model="value">
    <!-- 自定义插槽 -->
    <template v-for="(value, key) in slots" #[key]="{ node, data }">
      <slot :name="value" :config="config" :node="node" :data="data" />
    </template>
  </el-cascader>
</template>

<script setup lang="ts">
import { computed, defineExpose, ref } from 'vue'
import { ElCascader } from 'element-plus'
import type { FormItem } from '../types'

/**
 * 级联选择器组件
 * 基于 Element Plus 的 el-cascader 组件
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
  (e: 'update:modelValue', value: string | string[]): void  // 数据更新事件
}>()

/**
 * 选中值
 * 双向绑定到 modelValue
 */
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

/**
 * 级联选择器引用
 * 用于获取组件实例和调用组件方法
 */
const cascaderRef = ref(null)

/**
 * 暴露引用给父组件
 * 用于在父组件中调用级联选择器的方法
 */
defineExpose({ cascaderRef })
</script>
