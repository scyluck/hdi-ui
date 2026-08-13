<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M33.125 2.5H6.953a3.124 3.124 0 0 0-3.125 3.125v28.75A3.124 3.124 0 0 0 6.953 37.5h26.172a3.124 3.124 0 0 0 3.125-3.125V5.625A3.124 3.124 0 0 0 33.125 2.5M8.242 11.469a1.17 1.17 0 0 1 1.172-1.172h9.426a1.17 1.17 0 0 1 1.172 1.172v8.945a1.17 1.17 0 0 1-1.172 1.172H9.414a1.17 1.17 0 0 1-1.172-1.172zM30.273 29.75H9.805a1.562 1.562 0 1 1 0-3.125h20.468a1.562 1.562 0 1 1 0 3.125m0-8.164h-5.687a1.562 1.562 0 1 1 0-3.125h5.687a1.562 1.562 0 1 1 0 3.125m0-8.16h-5.687a1.562 1.562 0 1 1 0-3.125h5.687a1.562 1.562 0 1 1 0 3.125"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomArticle' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
