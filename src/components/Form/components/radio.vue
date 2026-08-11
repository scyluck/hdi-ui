<template>
  <!-- 单选框组：配置了 options（数组或字典code）时使用 -->
  <el-radio-group v-if="hasOptions" v-model="value">
    <slot :options="options">
      <!-- 渲染单选框选项 -->
      <el-radio
        v-for="radio in options"
        v-bind="radio"
        :key="radio[valueKey]"
        :value="radio[valueKey]"
        :disabled="radio.disabled || config.disabled"
      >
        {{ getOptionLabel(radio) }}
      </el-radio>
    </slot>
  </el-radio-group>

  <!-- 单个单选框：未配置 options 时使用 -->
  <el-radio v-else v-model="value">{{ config.label }}</el-radio>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElRadioGroup, ElRadio } from 'element-plus'
import { useFormOptions } from '../useFormOptions'
import { getFormValueKey, getOptionDisplayLabel } from '../utils'
import type { FormItem } from '../types'

/**
 * 单选框组件
 * 基于 Element Plus 的 el-radio 和 el-radio-group 组件
 */
const props = defineProps<{
  modelValue?: any  // 选中值
  config: FormItem  // 组件配置
}>()

/**
 * 组件事件
 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | boolean | number): void  // 数据更新事件
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
 * 解析选项数据（支持数组选项和字典code选项）
 */
const { options } = useFormOptions(() => props.config)

/**
 * 是否配置了 options（数组或字典code）
 */
const hasOptions = computed(() => {
  const opts = props.config.options
  return opts !== undefined && opts !== null && opts !== ''
})

/**
 * 获取值字段名
 */
const valueKey = computed(() => getFormValueKey(props.config))

/**
 * 获取选项标签
 * @param option 选项对象
 * @returns 选项标签
 */
const getOptionLabel = (option: any) => {
  return getOptionDisplayLabel(option, props.config)
}
</script>
