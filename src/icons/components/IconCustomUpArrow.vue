<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M29.414 21.25 15.704 2.504V37.52H20V21.25z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomUpArrow' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
