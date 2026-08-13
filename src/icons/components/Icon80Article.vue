<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="m26.93 3.96 7.933 7.938a4.65 4.65 0 0 1 1.375 3.313v17.617a4.69 4.69 0 0 1-4.687 4.688H8.543a4.69 4.69 0 0 1-4.688-4.688V7.278A4.69 4.69 0 0 1 8.543 2.59h15.07c1.254 0 2.43.484 3.317 1.37M8.543 34.39h23.008c.863 0 1.562-.702 1.562-1.562V15.48h-5.468a4.69 4.69 0 0 1-4.688-4.687V5.715H8.543c-.863 0-1.563.7-1.563 1.562v25.551c0 .863.7 1.563 1.563 1.563m22.36-22.035-4.82-4.82v3.258a1.56 1.56 0 0 0 1.562 1.562zM19.026 14.77H12.11a1.562 1.562 0 1 1 0-3.125h6.918a1.562 1.562 0 1 1 0 3.125m-6.918 3.718h15.875a1.562 1.562 0 1 1 0 3.125H12.11a1.562 1.562 0 1 1 0-3.125m0 6.848h15.875a1.562 1.562 0 1 1 0 3.125H12.11a1.562 1.562 0 1 1 0-3.125"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Article' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
