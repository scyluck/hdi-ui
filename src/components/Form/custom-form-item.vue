<template>
  <div
    v-if="item?.children?.length && isShow"
    :class="['form-item-group', { 'form-item-group-table': item.isTable }, item.customClass || '']"
    :style="{ gap: !item.isTable ? (config.xGap || 12) / 16 + 'rem' : 0 }"
  >
    <form-header
        v-if="item.type === 'header'"
        :is-first-level="isFirstLevel"
        :item="item"/>
    <template v-for="subItem in item.children" :key="subItem.prop">
      <custom-form-item v-model="formData" :item="subItem" :config="config">
        <template v-for="customSlotName in Object.keys($slots)" :key="customSlotName" #[customSlotName]="scope: any">
          <slot :name="customSlotName" v-bind="scope" />
        </template>
      </custom-form-item>
    </template>
  </div>
  <template v-else>
    <template v-if="!item.type || item.type === 'hidden'"></template>
    <form-header
        v-else-if="item.type === 'header' && isShow"
        :is-first-level="isFirstLevel"
        :item="item"/>
    <div v-else-if="item.type === 'line' && isShow" class="form-title-line"></div>
    <el-form-item
      v-else-if="isShow && item.prop"
      :prop="item.prop"
      :label="config.labelWidth ? item.label : ''"
      :label-width="item.labelWidth || config.labelWidth"
      :rules="[...(item.rules || []), ...(config.rules?.[item.prop] || [])]"
      :style="itemStyle"
    >
      <slot v-if="item.type === 'slot'" :name="item.prop"></slot>
      <custom-form-component
        v-else
        v-model="formData"
        :item="item"
        :config="config"
      >
        <template v-for="customSlotName in Object.keys($slots)" :key="customSlotName" #[customSlotName]="scope: any">
          <slot :name="customSlotName" v-bind="scope" />
        </template>
      </custom-form-component>
    </el-form-item>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElFormItem } from 'element-plus'
import type { FormItem, FormConfig } from './types'
import CustomFormComponent from './custom-form-component.vue'
import FormHeader from './form-header.vue'
import { useFormItem } from './use-form-item'

const { calcFormItemWidth, checkLinkageCondition } = useFormItem()

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
    config: () => ({}),
    modelValue: () => ({}) as Record<string, any>,
  },
)
const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
}>()

const formData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// 判断当前是否为首层
const isFirstLevel = computed(() => {
  const index = props.config.items?.findIndex((a:any) => a.prop === props.item.prop)
  return !(index === -1)
})

// 计算formItem的width
const itemStyle = computed(() => calcFormItemWidth(props.item, props.config))

// 判断表单项是否显示
const isShow = computed(() => {
  // 1. 检查 show 属性
  if (typeof props.item.show === 'boolean') {
    return props.item.show
  }
  if (typeof props.item.show === 'function') {
    return props.item.show(props.modelValue)
  }

  // 2. 检查联动条件
  if (props.item.linkage) {
    const conditions = Array.isArray(props.item.linkage)
      ? props.item.linkage
      : [props.item.linkage]

    return conditions.every(condition => {
      return checkLinkageCondition(condition, props.modelValue)
    })
  }

  // 默认显示
  return true
})
</script>

<style lang="scss" scoped>
.el-form-item {
  box-sizing: border-box;
  margin-bottom: 0;
}

.form-item-group {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.form-item-group-table {
  --el-border-color: #fff;
  --el-input-height: 2.625rem;

  border-width: 1px 1px 0 0;
  border-style: solid;
  border-color: #e4e9f1;

  .el-form-item {
    border-width: 0 0 1px 1px;
    border-style: solid;
    border-color: #e4e9f1;
  }

  :deep(.el-form-item__label) {
    background: #eff6ff;

    max-width: inherit;
    font-size: 14px;
    font-weight: bold;
    padding: 0 12px;
    height: 100%;
    border-right: 1px solid #e4e9f1;
  }

  :deep(.el-select__wrapper) {
    height: var(--el-input-height);
  }

  :deep(.el-input) {
    --el-input-height: 2.625rem;
  }
}

:deep(.el-form-item__content) {
  //min-width: 200px;
  //width: 220px;

  > * {
    width: 100%;
    box-sizing: border-box;
  }
}

:deep(.el-form-item__label) {
  line-height: 1;
  align-items: center;
  //max-width: 96px;
  padding: 0 8px 0 0;
}

:deep(.el-form-item--label-right) {
  align-items: flex-start;
}

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

.form-title-line {
  width: 100%;
  border-top: 1px solid rgba(140, 255, 255, 0.2);
}
</style>
