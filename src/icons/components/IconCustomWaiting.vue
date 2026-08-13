<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M20.004 2.512c-9.66 0-17.496 7.836-17.496 17.496S10.344 37.5 20.004 37.5 37.5 29.664 37.5 20.004 29.664 2.512 20.004 2.512m-9.016 20.476a2.984 2.984 0 1 1 0-5.968 2.984 2.984 0 0 1 0 5.968m8.973 0a2.984 2.984 0 1 1 0-5.968 2.984 2.984 0 0 1 0 5.968m8.973 0a2.984 2.984 0 1 1 0-5.968 2.984 2.984 0 0 1 0 5.968"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomWaiting' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
