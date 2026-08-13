<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M33.934 10.336h-13.2c-.73 0-1.418-.36-1.832-.961l-2.144-3.098a2.23 2.23 0 0 0-1.832-.96H6.059a2.23 2.23 0 0 0-2.23 2.23v22.86a4.46 4.46 0 0 0 4.46 4.46h23.668c2.344-.054 4.2-2.008 4.2-4.351l.007-16.274V12.57c0-1.238-1-2.234-2.23-2.234m-.86 7.184c0 .863-.699 1.562-1.562 1.562H8.48a1.562 1.562 0 1 1 0-3.125h23.028c.867 0 1.566.703 1.566 1.563"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomFolder' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
