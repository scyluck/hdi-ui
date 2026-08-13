<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M20.012 2.504c-9.66 0-17.489 7.828-17.489 17.488s7.829 17.489 17.489 17.489S37.5 29.648 37.5 19.992 29.672 2.504 20.012 2.504m1.742 26.102h-8.7a1.562 1.562 0 1 1 0-3.125h8.7a4.13 4.13 0 0 0 4.125-4.125 4.13 4.13 0 0 0-4.125-4.13h-5.43l2.051 2.051a1.564 1.564 0 0 1-2.211 2.211l-4.715-4.718a1.565 1.565 0 0 1 0-2.211l4.719-4.72a1.562 1.562 0 1 1 2.211 2.21c0 .002-2.055 2.053-2.055 2.053h5.43c4 0 7.25 3.254 7.25 7.25.004 4-3.25 7.254-7.25 7.254"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomBack' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
