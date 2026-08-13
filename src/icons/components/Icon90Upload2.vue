<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M26.316 36.066h4.91c2.68 0 4.86-2.18 4.86-4.855V8.695A4.86 4.86 0 0 0 31.23 3.84H8.773a4.86 4.86 0 0 0-4.855 4.855v22.512a4.86 4.86 0 0 0 4.855 4.856h8.055c2.7 0 4.895-2.192 4.899-4.891l.008-9.797h1.37c.704 0 1.336-.422 1.61-1.074a1.75 1.75 0 0 0-.38-1.895l-3.105-3.105a1.735 1.735 0 0 0-2.457 0l-3.105 3.105a1.73 1.73 0 0 0-.379 1.895c.27.652.902 1.074 1.606 1.074h1.364l-.009 9.797a1.42 1.42 0 0 1-1.418 1.418H8.773a1.38 1.38 0 0 1-1.378-1.38V8.696c0-.761.617-1.379 1.378-1.379h22.454a1.38 1.38 0 0 1 1.378 1.38V31.21c0 .762-.617 1.379-1.378 1.379h-4.91a1.737 1.737 0 1 0 0 3.477"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Upload2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
