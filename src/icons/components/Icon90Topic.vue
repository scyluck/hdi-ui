<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M12.566 36.086q.101.012.196.012a1.74 1.74 0 0 0 1.73-1.551l.802-7.219h7.726l-.758 6.832a1.74 1.74 0 0 0 1.734 1.938c.875 0 1.633-.66 1.73-1.551l.802-7.219h7.831a1.741 1.741 0 1 0 0-3.484h-7.444l.86-7.75h6.584a1.741 1.741 0 1 0 0-3.485h-6.196l.759-6.836a1.74 1.74 0 0 0-1.54-1.925 1.74 1.74 0 0 0-1.925 1.539l-.802 7.222h-7.727l.76-6.836a1.74 1.74 0 0 0-1.54-1.925c-.96-.11-1.82.582-1.925 1.539l-.802 7.222H5.586a1.741 1.741 0 1 0 0 3.485h7.448l-.861 7.75H5.586a1.741 1.741 0 1 0 0 3.484h6.2l-.759 6.832a1.74 1.74 0 0 0 1.54 1.926m3.975-19.992-.86 7.75h7.726l.861-7.75z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Topic' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
