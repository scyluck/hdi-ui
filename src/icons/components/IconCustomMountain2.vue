<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M4.207 33.207h31.629l1.637-2.652H2.566zm2.652 4.285h26.325l1.636-2.652H5.22zm25.282-24.39-3.707-3.18-.079.117-7.148 15.457 1.086-9.969 4.75-4.375-4.648-8.601-4.754 3.332-4.395 10.726-1.93-3.101-5.058 6.242-3.73 9.172H37.52z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomMountain2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
