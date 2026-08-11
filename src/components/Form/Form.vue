<template>
  <el-form
    v-if="formConfig?.items?.filter((item) => item.type)"
    ref="formRef"
    :class="['hdi-form', { 'form-table': formConfig.isTable }, formConfig.customClass || '']"
    :model="formData"
    :inline="formConfig.inline"
    :label-position="formConfig.labelPosition"
    :label-width="formConfig.labelWidth"
    :label-suffix="formConfig.labelSuffix"
    :disabled="formConfig.disabled"
    :style="{ gap: (!formConfig.isTable ? formConfig.xGap || 12 : 0) / 16 + 'rem' }"
    @validate="formConfig.validate"
  >
    <slot name="header"></slot>
    <div
      class="hdi-form-item-container"
      :style="{ gap: (!formConfig.isTable ? formConfig.xGap || 12 : 0) / 16 + 'rem' }"
    >
      <template v-for="item in formConfig.items" :key="item.prop">
        <custom-form-item :item="item" :config="formConfig" v-model="formData">
          <template v-for="customSlotName in Object.keys($slots)" :key="customSlotName" #[customSlotName]="scope: any">
            <slot :name="customSlotName" v-bind="scope" :prop="customSlotName" />
          </template>
        </custom-form-item>
      </template>
    </div>
    <slot name="bottom"></slot>
    <div
      v-if="formConfig.showSubmit || formConfig.showReset"
      class="hdi-form-btns"
      :style="{
        width: formConfig.inline ? '' : '100%',
        display: 'flex',
        flexDirection: formConfig.isReverseButton ? 'row-reverse' : 'row',
        justifyContent: formConfig.inline ? 'flex-end' : formConfig.btnsJustifyContent || 'center',
        gap: (formConfig.xGap || 12) / 16 + 'rem',
      }"
    >
      <el-button
        v-if="formConfig.showSubmit"
        type="primary"
        @click="submit"
      >
        {{ formConfig.submitButtonText || '保存' }}
      </el-button>
      <el-button v-if="formConfig.showReset" type="primary" plain @click="reset">
        {{ formConfig.resetButtonText || '重置' }}
      </el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { computed, shallowRef, ref, watch } from 'vue'
import { ElForm, ElButton } from 'element-plus'
import type { FormInstance } from 'element-plus'
import CustomFormItem from './custom-form-item.vue'
import type { FormConfig } from './types'

defineOptions({
  name: 'HdiForm',
})

const props = withDefaults(
  defineProps<{
    modelValue?: Record<string, any>
    config?: FormConfig
  }>(),
  {
    modelValue: () => ({}),
    config: () => ({}),
  },
)

const formConfig = shallowRef<FormConfig>({
  disabled: false,
  xGap: 12,
  inline: false,
  cols: 2,
  isTable: false,
  labelWidth: 'auto',
  labelPosition: 'right' as 'left' | 'right' | 'top',
  labelSuffix: '',
  showSubmit: true,
  showReset: true,
  isReverseButton: false,
  submitButtonText: '保存',
  resetButtonText: '重置',
  btnsJustifyContent: 'center',
  items: [],
  rules: {},
  customClass: '',
})
const formData = computed({
  get: () => props.modelValue || {},
  set: (value) => emit('update:modelValue', value),
})

const formRef = ref<FormInstance>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void
  (e: 'reset', value: Record<string, any>): void
  (e: 'submit', value: Record<string, any>): void
}>()

// 保存
const submit = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      emit('submit', formData.value)
    } else {
      console.warn('表单校验失败')
    }
  })
}
// 重置
const reset = () => {
  formRef.value?.clearValidate()
  try {
    formRef.value?.resetFields()
  } catch (error) {
    console.warn('表单重置失败:', error)
    emit('update:modelValue', {})
  }
  emit('reset', formData.value)
}

watch(
  () => props.config,
  (val) => {
    if (!val) return false
    // 只更新变化的属性
    Object.keys(val).forEach(key => {
      formConfig.value[key] = val[key]
    })
  },
  {
    immediate: true,
  },
)

defineExpose({
  submit,
  reset,
  formRef,
})
</script>
<style lang="scss" scoped>
.hdi-form.el-form {
  width: 100%;
  --el-form-inline-content-width: 160px;

  display: flex;
  flex-wrap: wrap;

  :deep(.el-input__inner) {
    width: 0;
  }
}

.el-button + .el-button {
  margin-left: 0;
}

.form-table.el-form {
  --el-border-color: #fff;
  --el-input-height: 2.625rem;

  border-width: 1px 1px 0 0;
  border-style: solid;
  border-color: #e4e9f1;
  box-sizing: border-box;

  :deep(.el-form-item) {
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

.hdi-form-item-container {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}

.hdi-form.el-form--inline {
  :deep(.el-form-item) {
    margin-right: 0;
  }

  :deep(.el-form-item__content) {
    min-width: 200px;
  }
}

.hdi-form.el-form--label-top {
  :deep(.el-form-item__label) {
    max-width: inherit;
  }
}

/*单行省略*/
:deep(.layout-omit .el-input__inner) {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
