<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M35.016 22.406h-2.528v-4.812h2.528a1.762 1.762 0 0 0 0-3.524h-2.528v-2.117a4.45 4.45 0 0 0-4.445-4.445h-2.117V4.98a1.762 1.762 0 0 0-3.524 0v2.528h-4.808V4.98a1.762 1.762 0 0 0-3.524 0v2.528h-2.117a4.45 4.45 0 0 0-4.445 4.445v2.117H4.984a1.762 1.762 0 0 0 0 3.524h2.528v4.808H4.984a1.762 1.762 0 0 0 0 3.524h2.528v2.117a4.45 4.45 0 0 0 4.445 4.445h2.117v2.528a1.762 1.762 0 0 0 3.524 0v-2.528h4.808v2.528a1.762 1.762 0 0 0 3.524 0v-2.528h2.117a4.45 4.45 0 0 0 4.445-4.445v-2.117h2.528a1.762 1.762 0 0 0 0-3.524zm-6.047 5.637a.924.924 0 0 1-.922.922h-16.09a.924.924 0 0 1-.922-.922V11.957c0-.508.414-.922.922-.922h16.09c.508 0 .922.414.922.922v16.09z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Chip' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
