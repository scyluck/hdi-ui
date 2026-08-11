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
    <slot />
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
