<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M5.778 4h28.444A1.78 1.78 0 0 1 36 5.778v12.444H4V5.778A1.78 1.78 0 0 1 5.778 4M4 21.778h32v12.444A1.78 1.78 0 0 1 34.222 36H5.778A1.78 1.78 0 0 1 4 34.222zm7.111 5.333v3.556h5.333V27.11zm0-17.778v3.556h5.333V9.333z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomDrawers2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
