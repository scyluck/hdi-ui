<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M29.414 18.773 15.704 37.52V2.503H20v16.27z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomDownArrow' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
