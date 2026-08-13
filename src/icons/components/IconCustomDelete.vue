<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M8.75 35.938c0 .863.7 1.562 1.562 1.562h19.376c.863 0 1.562-.7 1.562-1.562V13.824H8.75zm13.672-14.493a1.562 1.562 0 1 1 3.125 0v8.434a1.562 1.562 0 1 1-3.125 0zm-7.969 0a1.562 1.562 0 1 1 3.125 0v8.434a1.562 1.562 0 1 1-3.125 0zM34.68 8.77h-8.34V7.28a4.6 4.6 0 0 0-.371-1.824 4.7 4.7 0 0 0-4.316-2.863h-3.317a4.6 4.6 0 0 0-1.824.37 4.7 4.7 0 0 0-2.863 4.316v1.49h-8.25a1.562 1.562 0 1 0 0 3.125h29.28a1.562 1.562 0 1 0 0-3.125m-11.465-.387h-6.442V7.285c0-.863.7-1.562 1.563-1.562h3.316c.864 0 1.563.699 1.563 1.562z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomDelete' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
