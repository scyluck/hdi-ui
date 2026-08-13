<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M36.195 13.75a16.1 16.1 0 0 0-3.472-5.148 16.14 16.14 0 0 0-11.457-4.747 1.562 1.562 0 1 0 0 3.125c7.21 0 13.074 5.868 13.074 13.075s-5.863 13.078-13.074 13.078S8.19 27.266 8.19 20.055q-.001-1.37.274-2.68L12 19.434 11.863 8.77l-9.34 5.152 3.125 1.82a16.25 16.25 0 0 0 .688 10.625 16.1 16.1 0 0 0 3.473 5.149 16.14 16.14 0 0 0 11.457 4.746 16.14 16.14 0 0 0 11.457-4.746 16.14 16.14 0 0 0 4.746-11.457c0-2.188-.43-4.313-1.274-6.309"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Refresh' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
