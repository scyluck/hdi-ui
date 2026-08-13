<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M36.57 16.231 22.145 4.745c-1.233-.993-3.164-.993-4.396 0L3.43 16.237a1.16 1.16 0 0 0-.189 1.61c.383.493 1.1.58 1.585.19l.462-.369v13.891c0 1.967 2.01 3.441 3.807 3.441h22.588c1.773 0 2.97-1.381 2.97-3.44V17.63l.51.407a1.126 1.126 0 0 0 1.59-.191 1.16 1.16 0 0 0-.182-1.616M23.365 30.308V32.7h-6.777v-6.418c0-1.332 1.063-2.769 3.389-2.769 2.332 0 3.388 1.437 3.388 2.769z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomHome' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
