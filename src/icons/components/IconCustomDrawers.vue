<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M33.125 3.852H6.941a3.124 3.124 0 0 0-3.125 3.125v8.52a3.124 3.124 0 0 0 3.125 3.124h26.184a3.124 3.124 0 0 0 3.125-3.125v-8.52a3.124 3.124 0 0 0-3.125-3.124m-4.18 7.386c0 .864-.699 1.563-1.562 1.563H12.566a1.562 1.562 0 1 1 0-3.125h14.817c.863 0 1.562.699 1.562 1.562m4.18 10.227H6.941a3.124 3.124 0 0 0-3.125 3.125v8.52a3.124 3.124 0 0 0 3.125 3.124h26.184a3.124 3.124 0 0 0 3.125-3.125v-8.52a3.124 3.124 0 0 0-3.125-3.124m-4.18 7.383c0 .863-.699 1.562-1.562 1.562H12.566a1.562 1.562 0 1 1 0-3.125h14.817c.863 0 1.562.7 1.562 1.563"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomDrawers' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
