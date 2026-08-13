<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="m37.434 16.341.004-.11v-1.04a4.89 4.89 0 0 0-4.883-4.882h-11.5c-.422 0-.813-.184-1.082-.497l-1.364-3.496a1.6 1.6 0 0 0-.183-.347 4.87 4.87 0 0 0-4.031-2.133h-6.91A4.9 4.9 0 0 0 2.59 8.73v22.516c0 2.723 2.215 4.942 4.933 4.942H32.5c2.719 0 4.934-2.22 4.934-4.942zm-31.36-.11v15.015c0 .805.649 1.457 1.45 1.457H32.5c.797 0 1.45-.652 1.45-1.457V15.191c0-.773-.626-1.398-1.4-1.398h-11.5a4.9 4.9 0 0 1-4.058-2.148 1.6 1.6 0 0 1-.183-.348l-1.364-3.492a1.4 1.4 0 0 0-1.054-.485H7.484c-.777 0-1.41.633-1.41 1.41zm8.79 8.796h9.503c.965 0 1.742-.78 1.746-1.742 0-.96-.781-1.742-1.742-1.742h-9.508c-.96 0-1.742.781-1.742 1.742s.781 1.742 1.742 1.742"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90FolderReduce' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
