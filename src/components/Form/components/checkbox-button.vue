<template>
  <el-checkbox-group
    v-if="hasOptions"
    v-model="value"
    :class="['checkbox-group-' + (config.mode || 'horizontal')]"
  >
    <slot :options="options">
      <template v-for="checkbox in options" :key="checkbox[valueKey]">
        <el-checkbox-button
          v-if="!config.filterValues?.length || config.filterValues.includes(checkbox[valueKey])"
          v-bind="checkbox"
          :value="checkbox[valueKey]"
          :disabled="checkbox.disabled || config.disabled"
        >
          {{ getOptionLabel(checkbox) }}
        </el-checkbox-button>
      </template>
    </slot>
  </el-checkbox-group>
  <el-checkbox v-else v-model="value">
    <template v-for="(value, key) in slots" #[key]>
      <slot :name="value" :config="config" />
    </template>
    <template v-if="!slots?.default" #default>{{ config.label }}</template>
  </el-checkbox>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElCheckboxGroup, ElCheckboxButton, ElCheckbox } from 'element-plus'
import { useFormOptions } from '../useFormOptions'
import { getFormValueKey, getOptionDisplayLabel } from '../utils'
import type { FormItem } from '../types'

const props = defineProps<{
  modelValue?: any
  config: FormItem
  slots?: Record<string, any>  // 自定义插槽配置
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[] | boolean | number): void
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
