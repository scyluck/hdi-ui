<template>
  <component
      :is="item.component || asyncComponents[item.type]"
      :key="item.prop"
      v-model="formData[item.prop!]"
      :data="formData"
      :ref="(el: any) => setComponentRef(el, item.prop!)"
      :placeholder="mutedPlaceholder(config, item)"
      v-bind="attrs"
      :disabled="config.disabled || item.disabled || attrs?.disabled"
      v-on="bindEvents"
      :config="item"
      :slots="slots"
  >
    <template v-for="customSlotName in Object.keys($slots)" :key="customSlotName" #[customSlotName]="scope: any">
      <slot :name="customSlotName" v-bind="scope"/>
    </template>
  </component>
</template>

<script setup lang="ts">
import asyncComponents from './components.ts'
import type {FormItem, FormConfig} from './types'
import {useFormItem} from "./use-form-item";
import {computed, nextTick} from "vue";

defineOptions({
  name: 'custom-form-item',
})

const props = withDefaults(
    defineProps<{
      item: FormItem
      config: FormConfig
      modelValue: Record<string, any>
    }>(),
    {
      item: () => ({}) as FormItem,
      config: () => ({}) as FormConfig,
      modelValue: () => ({}),
    },
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const attrs = computed<Record<string, any>>(() => {
  return {
    clearable: true,
    filterable: true,
    ...(props.item.attrs || {}),
    ...(props.config.attrs?.[props.item.prop!] || {}),
  }
})

const events = computed(() => {
  return {
    ...(props.item.events || {}),
    ...(props.config.events?.[props.item.prop!] || {}),
  }
})

const slots = computed(() => {
  return {
    ...(props.item.slots || {}),
    ...(props.config.slots?.[props.item.prop!] || {}),
  }
})

const {setComponentRef, mutedPlaceholder, extraEvents} = useFormItem()

/**
 * 绑定事件（在 extraEvents 增强基础上，注入 cascadeClear 级联清空）
 * change 事件触发后，等当前字段新值同步到 props，再清空下级字段
 * 避免基于旧 props.modelValue 克隆而覆盖当前字段的新值
 */
const bindEvents = computed(() => {
  const enhanced = extraEvents(events.value, props.item)
  const clear = props.item.cascadeClear
  if (clear?.length) {
    const origChange = enhanced.change
    enhanced.change = function (...args: any[]) {
      const ret = origChange?.apply(this, args)
      nextTick(() => clearFields(clear))
      return ret
    }
  }
  return enhanced
})

/**
 * 清空指定字段（仅当字段有值时才 emit，避免无谓更新）
 */
function clearFields(fields: string[]) {
  const next = { ...props.modelValue }
  let changed = false
  for (const f of fields) {
    if (next[f] !== undefined && next[f] !== null && next[f] !== '') {
      next[f] = undefined
      changed = true
    }
  }
  if (changed) emit('update:modelValue', next)
}

</script>

<style lang="scss" scoped>
:deep(.el-date-editor) {
  --el-date-editor-width: 100%;
  --el-date-editor-monthrange-width: 100%;
  --el-date-editor-daterange-width: 100%;
  --el-date-editor-datetimerange-width: 100%;
}

:deep(.el-cascader),
:deep(.el-input-number) {
  width: 100%;
}
</style>
