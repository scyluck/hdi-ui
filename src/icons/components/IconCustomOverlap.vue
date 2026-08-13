<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M10.625 6.875v3.281a.47.47 0 0 1-.469.469H6.875C5.838 10.625 5 11.465 5 12.5v20.625C5 34.159 5.838 35 6.875 35H27.5c1.034 0 1.875-.84 1.875-1.875v-3.281a.47.47 0 0 1 .469-.469h3.281c1.034 0 1.875-.84 1.875-1.875V6.875C35 5.841 34.16 5 33.125 5H12.5c-1.037 0-1.875.84-1.875 1.875m1.875 22.5h14.531a.47.47 0 0 1 .469.469v2.812a.47.47 0 0 1-.469.469H7.344a.47.47 0 0 1-.469-.469V12.97a.47.47 0 0 1 .469-.469h2.812a.47.47 0 0 1 .469.469V27.5c0 1.034.838 1.875 1.875 1.875"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomOverlap' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
