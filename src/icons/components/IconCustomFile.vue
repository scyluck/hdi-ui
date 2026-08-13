<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M24.727 9.293h-9.375a2.73 2.73 0 0 1-2.735-2.734 2.73 2.73 0 0 1 2.735-2.735h9.375A2.73 2.73 0 0 1 27.46 6.56a2.73 2.73 0 0 1-2.734 2.734m5.078-2.734h4.101a2.346 2.346 0 0 1 2.344 2.343v25.02a2.346 2.346 0 0 1-2.344 2.344H6.172a2.346 2.346 0 0 1-2.344-2.344V8.902A2.346 2.346 0 0 1 6.172 6.56h4.101a5.08 5.08 0 0 0 5.079 5.078h9.375a5.08 5.08 0 0 0 5.078-5.078M8.543 22.195a2.735 2.735 0 1 0 5.468-.001 2.735 2.735 0 0 0-5.468.001m8.766 0a2.735 2.735 0 1 0 5.468 0 2.735 2.735 0 0 0-5.468 0m8.765 0a2.735 2.735 0 1 0 5.468 0 2.735 2.735 0 0 0-5.468 0"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomFile' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
