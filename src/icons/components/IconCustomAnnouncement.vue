<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M34.375 7.344h-2.672V6.187a2.346 2.346 0 0 0-2.344-2.343 2.346 2.346 0 0 0-2.343 2.344v1.156H13.07V6.187a2.346 2.346 0 0 0-2.343-2.343 2.346 2.346 0 0 0-2.344 2.344v1.156H5.637a3.124 3.124 0 0 0-3.125 3.125v18.75a3.124 3.124 0 0 0 3.125 3.125h2.746v2.812a2.346 2.346 0 0 0 2.344 2.344 2.346 2.346 0 0 0 2.343-2.344v-2.812h13.946v2.812a2.346 2.346 0 0 0 2.343 2.344 2.346 2.346 0 0 0 2.344-2.344v-2.812h2.672a3.124 3.124 0 0 0 3.125-3.125v-18.75a3.124 3.124 0 0 0-3.125-3.125m-2.309 16.57a1.954 1.954 0 0 1-1.953 1.953H9.898a1.954 1.954 0 0 1 0-3.906h20.215c1.078 0 1.953.875 1.953 1.953m0-7.879a1.954 1.954 0 0 1-1.953 1.953H9.898a1.954 1.954 0 0 1 0-3.906h20.215c1.078 0 1.953.875 1.953 1.953"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomAnnouncement' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
