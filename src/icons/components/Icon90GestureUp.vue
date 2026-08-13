<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M16.012 37.578h6.336c7.664 0 13.902-6.234 13.902-13.902 0-5.38-4.375-9.758-9.758-9.758H21.61V7.723c0-1.391-.547-2.7-1.523-3.676a5.13 5.13 0 0 0-3.684-1.531 5.21 5.21 0 0 0-5.199 5.207v10.96h-1.098A6.503 6.503 0 0 0 3.61 25.18c0 6.836 5.563 12.398 12.403 12.398m-8.9-12.398a2.99 2.99 0 0 1 2.989-2.989h1.097v2.29a1.754 1.754 0 1 0 3.508 0v-4.043q0-.06-.004-.118V7.723c0-.942.758-1.703 1.692-1.703.457 0 .878.171 1.199.496.23.23.504.625.504 1.207v7.949c0 .969.785 1.754 1.754 1.754h6.636a6.26 6.26 0 0 1 6.254 6.254c0 5.73-4.664 10.394-10.394 10.394h-6.34c-4.903 0-8.895-3.988-8.895-8.894"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90GestureUp' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
