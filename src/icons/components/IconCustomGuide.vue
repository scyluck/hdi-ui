<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M33.656 2.504H6.352a2.52 2.52 0 0 0-2.524 2.512v29.922a2.523 2.523 0 0 0 2.524 2.515h27.304a2.52 2.52 0 0 0 2.524-2.515V5.016a2.515 2.515 0 0 0-2.524-2.512M9.293 24.94a1.17 1.17 0 0 1 1.172-1.171h8.816a1.17 1.17 0 0 1 1.172 1.171 1.17 1.17 0 0 1-1.172 1.172h-8.816a1.17 1.17 0 0 1-1.172-1.172m21.426 6.211a1.17 1.17 0 0 1-1.172 1.172H10.465a1.17 1.17 0 0 1-1.172-1.172 1.17 1.17 0 0 1 1.172-1.171h19.082c.644 0 1.172.527 1.172 1.171M33.82 19.25c0 .46-.504.738-.894.496l-4.313-2.676a.39.39 0 0 0-.41 0l-4.312 2.676a.586.586 0 0 1-.895-.496V6.031a1.17 1.17 0 0 1 1.172-1.172h8.48a1.17 1.17 0 0 1 1.172 1.172z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomGuide' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
