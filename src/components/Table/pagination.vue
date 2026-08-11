<template>
  <div v-if="show" class="pagination-area">
    <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        v-bind="paginationConfig"
        @change="handleChange"
        @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElPagination } from 'element-plus'

const props = withDefaults(defineProps<{
  show?: boolean
  modelValue?: { pageNum: number; pageSize: number }
  total?: number
  paginationConfig?: Record<string, any>
}>(), {
  show: false,
  modelValue: () => ({ pageNum: 1, pageSize: 10 }),
  total: 0,
  paginationConfig: () => ({})
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: { pageNum: number; pageSize: number }): void
  (e: 'change', pageNum: number, pageSize: number): void
  (e: 'sizeChange', pageSize: number): void
}>()

const currentPage = computed({
  get: () => props.modelValue.pageNum,
  set: (val) => emit('update:modelValue', { ...props.modelValue, pageNum: val })
})
const pageSize = computed({
  get: () => props.modelValue.pageSize,
  set: (val) => emit('update:modelValue', { ...props.modelValue, pageSize: val })
})

const handleChange = (page: number, size: number) => {
  emit('change', page, size)
}
const handleSizeChange = (size: number) => {
  emit('sizeChange', size)
}
</script>

<style scoped lang="scss">
.pagination-area {
  display: flex;
  justify-content: flex-end;
}
</style>
