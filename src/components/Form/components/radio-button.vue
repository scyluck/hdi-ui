<template>
  <el-radio-group v-if="hasOptions" v-model="value">
    <slot :options="options">
      <el-radio-button
        v-for="radio in options"
        v-bind="radio"
        :key="radio[valueKey]"
        :value="radio[valueKey]"
        :disabled="radio.disabled || config.disabled"
      >
        {{ getOptionLabel(radio) }}
      </el-radio-button>
    </slot>
  </el-radio-group>
  <el-radio v-else v-model="value">{{ config.label }}</el-radio>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElRadioGroup, ElRadioButton, ElRadio } from 'element-plus'
import { useFormOptions } from '../useFormOptions'
import { getFormValueKey, getOptionDisplayLabel } from '../utils'
import type { FormItem } from '../types'

const props = defineProps<{
  modelValue?: any
  config: FormItem
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | boolean | number): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// 解析选项（支持数组选项和字典code选项）
const { options } = useFormOptions(() => props.config)

// 是否配置了 options（数组或字典code）
const hasOptions = computed(() => {
  const opts = props.config.options
  return opts !== undefined && opts !== null && opts !== ''
})

// 获取值字段名
const valueKey = computed(() => getFormValueKey(props.config))

// 获取选项标签
const getOptionLabel = (option: any) => {
  return getOptionDisplayLabel(option, props.config)
}
</script>
