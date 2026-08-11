<template>
  <span
    class="hdi-icon"
    :class="{ 'hdi-icon--spin': spin }"
    :style="wrapperStyle"
  >
    <component :is="icon" v-if="icon" v-bind="iconProps" />
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import type { IconProps } from './types'

defineOptions({ name: 'HdiIcon' })

const props = withDefaults(
  defineProps<
    IconProps & {
      /** 传入已注册的图标组件 */
      icon?: Component
      /** 是否旋转动画 */
      spin?: boolean
    }
  >(),
  {
    size: 16,
    spin: false,
  },
)

const iconProps = computed(() => ({
  size: props.size,
  color: props.color,
}))

const wrapperStyle = computed(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  verticalAlign: 'middle',
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color,
}))
</script>

<style scoped>
.hdi-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.hdi-icon--spin :deep(svg) {
  animation: hdi-icon-spin 1s linear infinite;
}

@keyframes hdi-icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
