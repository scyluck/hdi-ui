<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M19.984 18.07c4.262.008 7.75-3.539 7.75-7.8v-.032a7.737 7.737 0 0 0-15.473 0v.098a7.737 7.737 0 0 0 7.723 7.734m6.598 1.934H13.535a9.667 9.667 0 0 0-9.668 9.668v7.734H36.25v-7.734a9.667 9.667 0 0 0-9.668-9.668m-6.586 11.602a1.936 1.936 0 0 1-1.934-1.934v-3.867c0-1.067.868-1.934 1.934-1.934s1.934.867 1.934 1.934v3.867a1.93 1.93 0 0 1-1.934 1.934"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomUser' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
