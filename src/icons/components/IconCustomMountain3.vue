<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="m32.531 17.535 3.684 8.113c.258.567-.285 1.157-1.059 1.157l-30.23.015c-.758 0-1.301-.574-1.07-1.133L12.593 4.41c.273-.672 1.414-.824 1.965-.262l11.863 15.735 4.34-2.735c.601-.379 1.511-.18 1.77.387m-2.117-2.777a3.6 3.6 0 0 0-.902.406l-2.516 1.582-5.094-6.754 2.543-3.55c.52-.72 1.621-.63 2.008.171zm3.063 14.406H6.602a1.17 1.17 0 0 0-1.172 1.172 1.17 1.17 0 0 0 1.172 1.172h26.875a1.17 1.17 0 0 0 1.171-1.172 1.17 1.17 0 0 0-1.171-1.172m-1.563 4.688H8.164a1.17 1.17 0 0 0-1.172 1.171 1.17 1.17 0 0 0 1.172 1.172h23.75a1.17 1.17 0 0 0 1.172-1.172 1.17 1.17 0 0 0-1.172-1.171"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomMountain3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
