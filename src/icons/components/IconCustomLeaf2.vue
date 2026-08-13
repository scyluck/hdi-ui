<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M35.8 12.098v3.951c0 5.673-4.599 10.273-10.272 10.273h-3.95v7.902h-3.162V23.16l.03-1.58a10.27 10.27 0 0 1 10.243-9.483zM10.515 5.777a11.06 11.06 0 0 1 10.499 7.563 11.82 11.82 0 0 0-4.152 8.24h-1.605c-6.11 0-11.063-4.952-11.063-11.062V5.777z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomLeaf2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
