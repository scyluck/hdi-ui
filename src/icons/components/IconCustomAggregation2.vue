<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M5.672 19.824a1.562 1.562 0 1 1-3.125 0V7.195a4.69 4.69 0 0 1 4.687-4.687h12.649a1.562 1.562 0 1 1 0 3.125H7.234c-.863 0-1.562.699-1.562 1.562zm19.18-3.812 9.324-1.102a.781.781 0 0 0 .46-1.328l-2.331-2.332 4.875-6.523c.945-1.266-.649-2.86-1.914-1.914l-6.524 4.875-2.332-2.333a.781.781 0 0 0-1.328.461l-1.098 9.329c-.058.5.368.925.868.867M24.688 20a4.688 4.688 0 1 1-9.376 0 4.688 4.688 0 0 1 9.376 0m9.652.137a1.562 1.562 0 1 1 3.125 0v12.64a4.69 4.69 0 0 1-4.688 4.688h-12.66a1.562 1.562 0 1 1 0-3.125h12.66c.864 0 1.563-.7 1.563-1.563zM5.824 25.09l9.324-1.102a.78.78 0 0 1 .868.868l-1.098 9.328a.781.781 0 0 1-1.328.46l-2.332-2.331-6.524 4.875c-1.265.945-2.859-.649-1.914-1.915l4.875-6.523-2.332-2.332a.781.781 0 0 1 .461-1.328"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomAggregation2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
