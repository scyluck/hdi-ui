<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.563 19.965c0 9.637 7.84 17.476 17.476 17.476 9.637 0 17.477-7.836 17.477-17.472S29.676 2.492 20.039 2.492 2.563 10.328 2.563 19.965m3.496.004c0-7.711 6.273-13.98 13.98-13.98s13.98 6.269 13.98 13.98c0 7.71-6.273 13.98-13.98 13.98S6.06 27.68 6.06 19.97m16.629 8.734q.063.005.128.004a1.75 1.75 0 0 0 1.536-.918l3.28-6.074h1.688a1.745 1.745 0 1 0 0-3.492h-2.726c-.645 0-1.235.351-1.54.918l-1.921 3.554-3.719-10.304a1.74 1.74 0 0 0-1.512-1.149 1.75 1.75 0 0 0-1.668.91l-3.289 6.075h-2.261a1.745 1.745 0 1 0 0 3.492h3.3a1.75 1.75 0 0 0 1.536-.914l1.93-3.563 3.722 10.313a1.75 1.75 0 0 0 1.515 1.148"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Date2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
