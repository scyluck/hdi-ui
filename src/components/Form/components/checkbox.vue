<template>
  <!-- 复选框组：配置了 options（数组或字典code）时使用 -->
  <el-checkbox-group
    v-if="hasOptions"
    v-model="value"
    :class="['checkbox-group-' + (config.mode || 'horizontal')]"
  >
    <slot :options="options">
      <!-- 渲染复选框选项 -->
      <template v-for="checkbox in options" :key="checkbox[valueKey]">
        <el-checkbox
          v-if="!config.filterValues?.length || config.filterValues.includes(checkbox[valueKey])"
          v-bind="checkbox"
          :value="checkbox[valueKey]"
          :label="getOptionLabel(checkbox)"
          :disabled="checkbox.disabled || config.disabled"
        >
          <!-- 自定义插槽 -->
          <template v-for="(value, key) in slots" #[key]>
            <slot :name="value" :config="config" :item="checkbox" />
          </template>
        </el-checkbox>
      </template>
    </slot>
  </el-checkbox-group>

  <!-- 单个复选框：未配置 options 时使用（布尔开关场景） -->
  <el-checkbox v-else v-model="value">
    <!-- 自定义插槽 -->
    <template v-for="(value, key) in slots" #[key]>
      <slot :name="value" :config="config" />
    </template>
    <!-- 默认标签 -->
    <template v-if="!slots?.default" #default>{{ config.label }}</template>
  </el-checkbox>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
import { useFormOptions } from '../useFormOptions'
import { getFormValueKey, getOptionDisplayLabel } from '../utils'
import type { FormItem } from '../types'

/**
 * 复选框组件
 * 基于 Element Plus 的 el-checkbox 和 el-checkbox-group 组件
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
  (e: 'update:modelValue', value: string | string[] | boolean | number): void  // 数据更新事件
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
 * 区分「复选框组」和「单个复选框（布尔开关）」两种模式
 */
const hasOptions = computed(() => {
  const opts = props.config.options
  // 配置了 options（无论是数组还是字典code字符串）即为复选框组模式
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
