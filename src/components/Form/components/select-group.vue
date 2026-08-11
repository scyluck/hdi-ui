<template>
  <el-select v-model="value">
    <el-option-group v-for="(group, key, index) in config.options" :key="index" :label="key">
      <el-option
        v-for="(option, oindex) in group"
        v-bind="option"
        :key="option[valueKey]"
        :label="getOptionLabel(option)"
        :value="option[valueKey]"
      >
        <template v-if="slots?.['option']" #default>
          <slot
            :name="slots['option']"
            :group="group"
            :group-index="index"
            :option="option"
            :index="oindex"
            :config="config"
          />
        </template>
      </el-option>
    </el-option-group>
    <template v-for="(value, key) in slots" #[key]>
      <slot :name="value" :config="config" />
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElSelect, ElOptionGroup, ElOption } from 'element-plus'
import { getFormValueKey, getOptionDisplayLabel } from '../utils'
import type { FormItem } from '../types'

const props = defineProps<{
  modelValue?: any
  config: FormItem
  slots?: Record<string, any>  // 自定义插槽配置
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | any[]): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
// 获取值字段名
const valueKey = computed(() => getFormValueKey(props.config))

// 获取选项标签
const getOptionLabel = (option: any) => {
  return getOptionDisplayLabel(option, props.config)
}
</script>
