<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="computedSize"
    :height="computedSize"
    :viewBox="viewBox"
    fill="currentColor"
    :style="color ? { color } : undefined"
    aria-hidden="true"
    focusable="false"
    v-bind="$attrs"
  >
    <template v-if="content">
      <g v-html="content" />
    </template>
    <slot v-else />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IconProps } from './types'

defineOptions({ name: 'IconBase' })

const props = withDefaults(
  defineProps<
    IconProps & {
      viewBox?: string
      /** SVG 内部 HTML 字符串，用于动态渲染图标（方案 A：单文件多组件） */
      content?: string
    }
  >(),
  {
    size: 16,
    viewBox: '0 0 24 24',
  },
)

const computedSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  return props.size
})
</script>
