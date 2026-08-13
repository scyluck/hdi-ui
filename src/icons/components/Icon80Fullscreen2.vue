<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M4.102 13.242c.863 0 1.562-.699 1.562-1.562V7.844l7.93 7.93a1.562 1.562 0 1 0 2.21-2.21L7.876 5.632h3.836a1.562 1.562 0 1 0 0-3.125H4.1A1.56 1.56 0 0 0 2.54 4.07v7.61c0 .863.7 1.562 1.563 1.562M35.96 2.527h-7.61a1.562 1.562 0 1 0 0 3.125h3.837l-7.985 7.985a1.562 1.562 0 1 0 2.21 2.21l7.99-7.988v3.836a1.562 1.562 0 1 0 3.124 0V4.09a1.56 1.56 0 0 0-1.566-1.563M4.086 37.492h7.61a1.562 1.562 0 1 0 0-3.125H7.858l7.93-7.93c.61-.609.61-1.597 0-2.21a1.56 1.56 0 0 0-2.21 0l-7.93 7.93V28.32a1.562 1.562 0 1 0-3.126 0v7.61a1.56 1.56 0 0 0 1.563 1.562m28.082-3.11h-3.836a1.562 1.562 0 1 0 0 3.126h7.61a1.56 1.56 0 0 0 1.562-1.563v-7.61a1.562 1.562 0 1 0-3.125 0v3.837l-7.984-7.984a1.56 1.56 0 0 0-1.106-.457 1.563 1.563 0 0 0-1.105 2.667z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Fullscreen2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
