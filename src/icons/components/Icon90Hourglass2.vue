<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M31.809 5.977h1.351a1.744 1.744 0 0 0 0-3.484H8.27c-.961 0-1.743.78-1.743 1.741S7.31 5.977 8.27 5.977h1.34v8.16c0 2.007.78 3.894 2.203 5.316.16.164.332.316.503.461a7.5 7.5 0 0 0-2.707 5.77v8.156H8.27c-.96 0-1.742.781-1.742 1.742s.782 1.742 1.743 1.742h24.89c.961 0 1.742-.781 1.742-1.742 0-.96-.78-1.742-1.742-1.742H31.81v-8.156a7.5 7.5 0 0 0-2.711-5.774 7.5 7.5 0 0 0 2.71-5.773zm-3.477 0H13.098v8.156a4 4 0 0 0 1.18 2.851 4 4 0 0 0 2.847 1.18h.004c.96.004 1.742.781 1.742 1.742a1.74 1.74 0 0 1-1.738 1.742h-.008a4.036 4.036 0 0 0-4.031 4.032v8.16h15.234v-8.156a4.036 4.036 0 0 0-4.031-4.032 1.742 1.742 0 0 1-.008-3.484h.004a4.04 4.04 0 0 0 4.039-4.031z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Hourglass2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
