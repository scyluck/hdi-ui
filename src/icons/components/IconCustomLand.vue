<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M23.255 36h-5.15l2.98-32h9.132a2.857 2.857 0 0 1 2.81 2.634l1.249 13.738c.015.14 1.454 13.897.497 14.702-.958.806-11.412.926-11.518.926m-7.987 0H6.836a2.84 2.84 0 0 1-2.824-3.096l1.04-11.446h11.54l-1.324 14.54zm1.579-17.518H5.32L6.406 6.575A2.83 2.83 0 0 1 9.231 4h8.937l-1.324 14.482z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomLand' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
