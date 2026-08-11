<template>
  <div class="text-wrapper">
    <span>{{ modelValue }}{{ config?.unit || '' }}</span>
  </div>
</template>

<script setup lang="ts">
import type { FormItem } from '../types'

defineProps<{
  modelValue?: any
  config: FormItem
}>()
</script>

<style scoped lang="scss">
.text-wrapper {
  min-height: var(--el-input-height);
  line-height: 1;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 12px;
  flex-wrap: wrap;
  box-sizing: border-box;
}
</style>
