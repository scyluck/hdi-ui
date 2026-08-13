<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M36.984 32.062V11.408c0-2.508-2.287-2.272-2.287-2.272s-13.653.015-12.924 0c-.777.015-1.174-.409-1.174-.409s-.542-.939-1.521-2.412c-1.02-1.55-2.21-1.3-2.21-1.3H6.814C4.026 5.015 4 7.696 4 7.696v24.237c0 2.99 2.258 2.622 2.258 2.622h28.645c2.42-.003 2.08-2.493 2.08-2.493m-24.635-5.226a1.745 1.745 0 1 1 0-3.491 1.745 1.745 0 1 1 0 3.49m0-6.46a1.745 1.745 0 1 1 0-3.491 1.745 1.745 0 1 1 0 3.491m17.125 6.35h-11.06a1.634 1.634 0 1 1 0-3.267h11.06a1.633 1.633 0 1 1 0 3.266m0-6.464h-11.06a1.634 1.634 0 1 1 0-3.267h11.06a1.633 1.633 0 1 1 0 3.267"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomProject' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
