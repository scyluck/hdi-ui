<template>
  <!-- 选择器组件 -->
  <el-select v-model="value">
    <!-- 选项列表 -->
    <el-option
      v-for="(option, index) in options"
      v-bind="option"
      :key="option[valueKey]"
      :label="getOptionLabel(option)"
      :value="option[valueKey]"
    >
      <!-- 自定义选项模板 -->
      <template v-if="slots?.['option']" #default>
        <slot :name="slots['option']" :option="option" :index="index" :config="config" />
      </template>
    </el-option>
    <!-- 其他自定义插槽 -->
    <template v-for="(value, key) in slots" #[key]>
      <slot :name="value" :config="config" :options="options"/>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { useFormOptions } from '../useFormOptions'
import { getFormValueKey, getOptionDisplayLabel } from '../utils'
import type { FormItem } from '../types'

/**
 * 选择器组件
 * 基于 Element Plus 的 el-select 组件
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
  (e: 'update:modelValue', value: string | number | any[]): void  // 数据更新事件
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

/**
 * 获取选择的选项
 * @param val 选中值
 * @returns 选项对象
 */
function getSelectedOption(val: any) {
  return options.value.find(op => op[getFormValueKey(props.config)] === val)
}

/**
 * 暴露方法给父组件
 */
defineExpose({ getSelectedOption });
</script>
