<template>
  <div class="search-area" v-if="show">
    <HdiForm
        ref="searchFormRef"
        :config="searchConfig"
        v-model="searchData"
        @submit="handleSubmit"
        @reset="handleReset"
    >
      <template v-for="slot in Object.keys($slots)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </HdiForm>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import type { FormConfig } from '../Form/types'
import HdiForm from '../Form/Form.vue'

const props = withDefaults(defineProps<{
  show?: boolean
  searchConfig?: FormConfig
  modelValue?: Record<string, any>
}>(), {
  show: true,
  searchConfig: () => ({ items: [] }),
  modelValue: () => ({}),
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'submit', data: any): void
  (e: 'reset'): void
}>()

const searchData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const searchFormRef = ref()

const handleSubmit = (data: any) => {
  emit('submit', data)
}

const handleReset = () => {
  emit('reset')
}

defineExpose({
  searchFormRef
})
</script>

<style scoped lang="scss">
</style>
