<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M32.238 36.445H7.7a5.21 5.21 0 0 1-5.203-5.203V9.043A5.21 5.21 0 0 1 7.7 3.84h24.54a5.21 5.21 0 0 1 5.202 5.203v22.2a5.21 5.21 0 0 1-5.203 5.202M5.988 9.043v5.578H33.95V9.043c0-.941-.765-1.711-1.71-1.711H7.698c-.941 0-1.71.766-1.71 1.711m1.844 2.129a1.781 1.781 0 1 0 3.563 0 1.781 1.781 0 0 0-3.563 0m5.303 1.26a1.781 1.781 0 1 1 2.52-2.52 1.781 1.781 0 0 1-2.52 2.52m4.754 0a1.781 1.781 0 1 1 2.52-2.52 1.781 1.781 0 0 1-2.52 2.52m16.06 5.681H5.99v13.13c0 .94.765 1.71 1.71 1.71h24.54c.94 0 1.71-.765 1.71-1.71z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Browser' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
