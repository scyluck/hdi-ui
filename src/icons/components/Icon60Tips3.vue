<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M32.367 7.633A17.4 17.4 0 0 1 37.492 20c0 2.36-.46 4.652-1.375 6.809a17.5 17.5 0 0 1-3.75 5.558A17.4 17.4 0 0 1 20 37.492c-2.36 0-4.652-.46-6.809-1.375a17.5 17.5 0 0 1-5.558-3.75A17.4 17.4 0 0 1 2.508 20c0-2.36.46-4.652 1.375-6.809a17.5 17.5 0 0 1 3.75-5.558A17.4 17.4 0 0 1 20 2.508c2.36 0 4.652.46 6.809 1.375a17.5 17.5 0 0 1 5.558 3.75M4.852 20c0 8.352 6.793 15.148 15.148 15.148S35.148 28.352 35.148 20 28.352 4.852 20 4.852 4.852 11.648 4.852 20m15.843-9.007a1.563 1.563 0 1 1-1.458 2.764 1.563 1.563 0 0 1 1.458-2.764m-1.863 6.12a1.17 1.17 0 0 1 1.172-1.172c.644 0 1.172.528 1.172 1.172v11.325a1.17 1.17 0 0 1-1.172 1.171 1.17 1.17 0 0 1-1.172-1.171z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Tips3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
