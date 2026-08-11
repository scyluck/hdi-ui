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
      v-on="extraEvents(events, item)"
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
import {computed} from "vue";

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
