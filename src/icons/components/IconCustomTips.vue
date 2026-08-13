<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M20.004 2.512c-9.66 0-17.496 7.836-17.496 17.496S10.344 37.5 20.004 37.5 37.5 29.664 37.5 20.004 29.664 2.512 20.004 2.512m0 6.554c1.394 0 2.152.922 2.152 1.637l-.539 12.137c0 .715-.722 1.289-1.613 1.289-.895 0-1.613-.578-1.613-1.29l-.54-12.136c0-.715.755-1.637 2.153-1.637m1.988 19.918a2.151 2.151 0 0 1-3.972-1.644 2.15 2.15 0 0 1 3.972 1.644"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomTips' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
