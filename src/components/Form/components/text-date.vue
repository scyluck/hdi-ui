<template>
  <div class="text-wrapper">
    <span v-if="config.format">{{ formatTime(modelValue, config.format) }}</span>
    <span v-else>{{ modelValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { formatTime } from '../utils'
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
  padding: 0 12px;
}
</style>
