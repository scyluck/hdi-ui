<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M33.906 2.516H6.172a2.346 2.346 0 0 0-2.344 2.343v30.286a2.346 2.346 0 0 0 2.344 2.343h27.734a2.346 2.346 0 0 0 2.344-2.343V4.859a2.346 2.346 0 0 0-2.344-2.343m-20.957 8.87 4.172-.605L18.988 7a1.172 1.172 0 0 1 2.102 0l1.867 3.781 4.172.606c.96.14 1.344 1.32.648 2l-3.02 2.941.712 4.156c.164.957-.84 1.688-1.7 1.235l-3.73-1.961-3.73 1.96c-.86.454-1.864-.277-1.7-1.234l.711-4.156-3.02-2.941c-.695-.68-.312-1.86.65-2m13.926 15.68a1.17 1.17 0 0 1-1.172 1.172H14.375a1.17 1.17 0 0 1-1.172-1.172 1.17 1.17 0 0 1 1.172-1.171h11.328a1.17 1.17 0 0 1 1.172 1.171m3.32 5.141a1.17 1.17 0 0 1-1.172 1.172H11.055a1.17 1.17 0 0 1-1.172-1.172 1.17 1.17 0 0 1 1.172-1.172h17.968c.649 0 1.172.528 1.172 1.172"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomCert' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
