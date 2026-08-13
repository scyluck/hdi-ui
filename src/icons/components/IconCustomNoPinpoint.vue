<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="m23.461 12.105 7.063-5.117a15.3 15.3 0 0 0-4.823-3.23 15.3 15.3 0 0 0-5.992-1.211 15.3 15.3 0 0 0-5.993 1.21 15.3 15.3 0 0 0-4.89 3.298 15.3 15.3 0 0 0-3.297 4.89 15.3 15.3 0 0 0-1.211 5.992c0 2.54.63 4.883 1.528 6.931L13 19.686a6.93 6.93 0 0 1 6.69-8.701c1.39 0 2.686.412 3.772 1.12M5.691 33.008a1 1 0 0 1-1.397-.223l-.587-.81a1 1 0 0 1 .223-1.396L35.284 7.86a1 1 0 0 1 1.397.223l.586.81a1 1 0 0 1-.223 1.396zm13.979 4.445c1.519 0 3.293-.922 4.511-1.7 1.684-1.07 3.38-2.515 4.91-4.179 2.243-2.441 6.004-7.46 6.004-13.637q0-.927-.107-1.835l-23.31 16.89a23.6 23.6 0 0 0 3.492 2.762c1.214.777 2.98 1.7 4.5 1.7"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomNoPinpoint' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
