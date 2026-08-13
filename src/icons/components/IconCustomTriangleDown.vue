<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M21.414 26.586a2 2 0 0 1-2.828 0l-7.172-7.172c-1.26-1.26-.367-3.414 1.414-3.414h14.344c1.781 0 2.674 2.154 1.414 3.414z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomTriangleDown' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
