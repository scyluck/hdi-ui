<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M7.281 36.277h9.047a1.562 1.562 0 1 0 0-3.125H7.281a1.56 1.56 0 0 1-1.562-1.562V8.55c0-.862.699-1.562 1.562-1.562h9.051a1.562 1.562 0 1 0 0-3.125h-9.05a4.69 4.69 0 0 0-4.688 4.688V31.59a4.69 4.69 0 0 0 4.687 4.687M25.27 7.363l11.875 11.875a1.15 1.15 0 0 1-.004 1.625L25.266 32.738c-.828.828-2.243.242-2.243-.93v-6.12h-8.785a2.346 2.346 0 0 1-2.343-2.344v-6.625a2.346 2.346 0 0 1 2.343-2.344h8.79V8.293c0-1.172 1.413-1.758 2.242-.93"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomBack3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
