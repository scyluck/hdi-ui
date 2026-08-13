<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M33.125 3.828H6.953a3.124 3.124 0 0 0-3.125 3.125v26.172a3.124 3.124 0 0 0 3.125 3.125h26.172a3.124 3.124 0 0 0 3.125-3.125V6.953a3.124 3.124 0 0 0-3.125-3.125M14.047 7.781a3.76 3.76 0 0 1 3.758 3.758 3.76 3.76 0 0 1-3.758 3.758 3.757 3.757 0 1 1 0-7.516M32.5 31.098c0 .773-.629 1.402-1.402 1.402H8.93a1.404 1.404 0 0 1-1.403-1.402V20.93c0-.442.485-.715.864-.48l6.172 3.796a1.96 1.96 0 0 0 2.207-.101l14.828-11.082a.567.567 0 0 1 .906.453v17.582z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomPic' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
