<template>
  <el-dialog
      v-model="visible"
      :title="title"
      :width="width"
      :close-on-click-modal="false"
      @closed="handleClosed"
  >
    <HdiForm
        v-if="visible"
        ref="formRef"
        :config="formConfig"
        v-model="formData"
        :disabled="type === 'view'"
        :submit-loading="loading"
        @submit="handleSubmit"
        @reset="handleReset"
    >
      <template v-for="slot in Object.keys($slots)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </HdiForm>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElDialog } from 'element-plus'
import type { FormConfig } from '../Form/types'
import HdiForm from '../Form/Form.vue'

const props = defineProps<{
  visible: boolean
  type: 'add' | 'edit' | 'view' | ''
  title: string
  width: string
  formConfig: FormConfig
  formData: Record<string, any>
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
  (e: 'update:formData', val: Record<string, any>): void
  (e: 'submit', data: Record<string, any>): void
  (e: 'reset'): void
  (e: 'closed'): void
}>()

const formRef = ref()

const visible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const formData = computed({
  get: () => props.formData,
  set: (val) => emit('update:formData', val)
})

const handleSubmit = () => {
  emit('submit', formData.value)
}
const handleReset = () => {
  visible.value = false
  emit('reset')
}
const handleClosed = () => {
  emit('closed')
}
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
