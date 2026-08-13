<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M35.724 34.237v-.033a1.576 1.576 0 0 0-1.573-1.56H7.423V5.779a1.573 1.573 0 1 0-3.147 0v28.442c0 .869.704 1.573 1.573 1.573h28.302c.863 0 1.564-.695 1.573-1.557M25.208 22.131a1.576 1.576 0 0 1-2.348.165l-3.88-3.802-6.617 8.678a1.57 1.57 0 0 1-2.204.3 1.57 1.57 0 0 1-.298-2.203l7.695-10.098a1.56 1.56 0 0 1 1.137-.618c.454-.035.894.13 1.215.444l3.885 3.81 6.736-8.74a1.573 1.573 0 1 1 2.494 1.92z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Linechart' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
