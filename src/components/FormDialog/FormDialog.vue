<template>
  <!-- Dialog 模式 -->
  <el-dialog
    v-if="mode === 'dialog'"
    v-model="visible"
    :title="computedTitle"
    :width="width"
    :close-on-click-modal="false"
    :append-to-body="appendToBody"
    :destroy-on-close="true"
    @closed="handleClosed"
  >
    <HdiForm
      v-if="visible"
      ref="formRef"
      :config="mergedFormConfig"
      v-model="innerFormData"
      :disabled="isView"
      @submit="handleSubmit"
      @reset="handleCancel"
    >
      <template v-for="slot in formSlotNames" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </HdiForm>
  </el-dialog>

  <!-- Drawer 模式 -->
  <el-drawer
    v-else
    v-model="visible"
    :title="computedTitle"
    :size="width"
    :direction="direction"
    :close-on-click-modal="false"
    :append-to-body="appendToBody"
    :destroy-on-close="true"
    @closed="handleClosed"
  >
    <HdiForm
      v-if="visible"
      ref="formRef"
      :config="mergedFormConfig"
      v-model="innerFormData"
      :disabled="isView"
      @submit="handleSubmit"
      @reset="handleCancel"
    >
      <template v-for="slot in formSlotNames" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </HdiForm>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { ElDialog, ElDrawer } from 'element-plus'
import HdiForm from '../Form/Form.vue'
import type { FormConfig, BtnsJustifyContent } from '../Form/types'

defineOptions({ name: 'HdiFormDialog' })

interface Props {
  mode?: 'dialog' | 'drawer'
  type?: 'add' | 'edit' | 'view'
  title?: string
  width?: string
  formConfig?: FormConfig
  formData?: Record<string, any>
  loading?: boolean
  appendToBody?: boolean
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  /** 按钮组对齐方式，映射到 formConfig.btnsJustifyContent */
  footerAlign?: BtnsJustifyContent
  submitText?: string
  cancelText?: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'dialog',
  type: 'add',
  title: '',
  width: '50%',
  formConfig: () => ({ items: [] }),
  formData: () => ({}),
  loading: false,
  appendToBody: false,
  direction: 'rtl',
  footerAlign: 'flex-end',
  submitText: '保存',
  cancelText: '取消',
})

const emit = defineEmits<{
  (e: 'submit', data: Record<string, any>, done: (ok?: boolean) => void): void
  (e: 'cancel', data?: Record<string, any>): void
  (e: 'closed'): void
}>()

const slots = useSlots()

const visible = ref(false)
const innerFormData = ref<Record<string, any>>({})
const loadingRef = ref(false)
const typeRef = ref<'add' | 'edit' | 'view'>('add')
const titleRef = ref('')
const recordRef = ref<any>(null)

const formRef = ref()

// 透传给 HdiForm 的插槽：排除 FormDialog 自身使用的 footer/footer-extra
const formSlotNames = computed(() =>
  Object.keys(slots).filter(name => name !== 'footer' && name !== 'footer-extra')
)

const isView = computed(() => typeRef.value === 'view')

const computedTitle = computed(() => {
  if (titleRef.value) return titleRef.value
  const map: Record<'add' | 'edit' | 'view', string> = { add: '新增', edit: '编辑', view: '查看' }
  return map[typeRef.value] || ''
})

// 使用 HdiForm 自带的按钮组
const mergedFormConfig = computed<FormConfig>(() => {
  return {
    ...props.formConfig,
    showSubmit: !isView.value,
    showReset: true,
    isReverseButton: true,
    submitButtonText: props.submitText,
    resetButtonText: props.cancelText,
    btnsJustifyContent: props.footerAlign,
  }
})

const handleSubmit = (data: Record<string, any>) => {
  // HdiForm 的 submit 已经过校验，这里直接合并 record 后 emit
  emit('submit', { ...recordRef.value, ...data }, (ok?: boolean) => {
    if (ok !== false) {
      visible.value = false
    }
    loadingRef.value = false
  })
}

const handleCancel = () => {
  emit('cancel', innerFormData.value)
  visible.value = false
}

const handleClosed = () => {
  typeRef.value = 'add'
  titleRef.value = ''
  recordRef.value = null
  innerFormData.value = {}
  emit('closed')
}

const open = (options: { type?: 'add' | 'edit' | 'view'; record?: any; title?: string; formData?: Record<string, any> }) => {
  const type = options.type || props.type || 'add'
  typeRef.value = type
  titleRef.value = options.title || ''
  recordRef.value = options.record || null

  if (type === 'add') {
    innerFormData.value = { ...(options.formData || props.formData || {}) }
  } else {
    innerFormData.value = { ...(options.record || props.formData || {}) }
  }

  visible.value = true
}

const close = () => {
  visible.value = false
}

defineExpose({
  open,
  close,
  formRef,
})
</script>
