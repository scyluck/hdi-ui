<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.261 23.795a11 11 0 0 0 .412 0 10.9 10.9 0 0 1 6.491 2.275 1.81 1.81 0 0 0 2.211-2.867 14.7 14.7 0 0 0-2.56-1.584 10.33 10.33 0 0 0 4.001-8.166c0-5.707-4.644-10.348-10.347-10.348S8.12 7.742 8.12 13.45c0 3.32 1.57 6.279 4.007 8.173C7.235 23.986 3.852 29 3.852 34.79c0 1 .812 1.813 1.812 1.813s1.813-.809 1.809-1.817c0-5.99 4.82-10.881 10.788-10.99m.398-3.618a15 15 0 0 0-.383 0 6.73 6.73 0 0 1-6.534-6.724 6.734 6.734 0 0 1 6.727-6.726 6.73 6.73 0 0 1 6.726 6.722 6.736 6.736 0 0 1-6.536 6.728M28.852 34.79a1.811 1.811 0 1 0 3.625 0v-1.973h1.972c1 0 1.817-.812 1.817-1.812s-.813-1.813-1.813-1.813h-1.976V27.22a1.814 1.814 0 0 0-3.625 0v1.972h-1.973a1.814 1.814 0 0 0 0 3.625h1.973z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90UserAdd' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
