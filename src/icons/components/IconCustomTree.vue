<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="m33.333 30-6.666-8.333h5L25 13.333h3.333L20 3.333l-8.333 10H15l-6.667 8.334h5L6.667 30h11.666v6.667h3.334V30z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomTree' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
