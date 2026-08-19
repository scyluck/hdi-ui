<template>
  <HdiFormDialog
    ref="formDialogRef"
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
import { ref, computed, useSlots } from 'vue'
import HdiFormDialog from '../FormDialog/FormDialog.vue'
import type { FormConfig } from '../Form/types'

defineOptions({ name: 'DialogForm' })

defineProps<{
  formConfig: FormConfig
}>()

const emit = defineEmits<{
  (e: 'submit', data: Record<string, any>, done: (ok?: boolean) => void): void
  (e: 'cancel'): void
  (e: 'closed'): void
}>()

const slots = useSlots()
const formDialogRef = ref()

const slotNames = computed(() => Object.keys(slots))

const handleSubmit = (data: Record<string, any>, done: (ok?: boolean) => void) => {
  emit('submit', data, done)
}

const handleCancel = () => {
  emit('cancel')
}

const handleClosed = () => {
  emit('closed')
}

const open = (type: 'add' | 'edit' | 'view', row?: any) => {
  formDialogRef.value?.open({ type, record: row })
}

const close = () => {
  formDialogRef.value?.close()
}

defineExpose({ open, close })
</script>
