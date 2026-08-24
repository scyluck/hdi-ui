<template>
  <HdiFormDialog
    ref="formDialogRef"
    v-bind="dialogProps"
    :form-config="formConfig"
    @submit="handleSubmit"
    @cancel="handleCancel"
    @closed="handleClosed"
  >
    <template v-for="slot in slotNames" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </HdiFormDialog>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import HdiFormDialog from '../FormDialog/FormDialog.vue'
import type { FormConfig } from '../Form/types'
import type { DialogConfig } from '../Table/types'

defineOptions({ name: 'DialogForm' })

const props = defineProps<{
  formConfig: FormConfig
  /** 整体弹窗配置（DialogConfig），透传到 HdiFormDialog 的 props（除 form 外） */
  dialogConfig?: DialogConfig
}>()

const emit = defineEmits<{
  (e: 'submit', data: Record<string, any>, done: (ok?: boolean) => void): void
  (e: 'cancel'): void
  (e: 'closed'): void
}>()

const slots = useSlots()
const formDialogRef = ref()

const slotNames = computed(() => Object.keys(slots))

/**
 * 将 DialogConfig 中除 form 外的属性透传到 HdiFormDialog props。
 * 保证 props 命名与 HdiFormDialog 完全一致，不再额外定义重复字段。
 */
const dialogProps = computed(() => {
  const cfg = props.dialogConfig
  if (!cfg) return {}
  const { form: _form, ...rest } = cfg
  return rest
})

const handleSubmit = (data: Record<string, any>, done: (ok?: boolean) => void) => {
  emit('submit', data, done)
}

const handleCancel = () => {
  emit('cancel')
}

const handleClosed = () => {
  emit('closed')
}

/**
 * 打开弹窗。title 不传则按 type 内建默认（HdiFormDialog 内部处理）。
 */
const open = (options: {
  type?: 'add' | 'edit' | 'view'
  record?: any
  title?: string
  formData?: Record<string, any>
}) => {
  formDialogRef.value?.open(options)
}

const close = () => {
  formDialogRef.value?.close()
}

defineExpose({ open, close })
</script>
