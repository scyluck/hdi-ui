<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="m30.844 3.008 6.191 6.195a1.367 1.367 0 0 1 0 1.934L21.066 27.105a1.37 1.37 0 0 1-.847.395l-6.797.605q-.061.005-.121.004a1.367 1.367 0 0 1-1.36-1.488l.602-6.793c.027-.32.168-.621.394-.848L28.91 3.008a1.365 1.365 0 0 1 1.934 0M7.37 36.12h25.246a3.52 3.52 0 0 0 3.516-3.516v-15.09a1.17 1.17 0 0 0-1.172-1.171 1.17 1.17 0 0 0-1.172 1.172v15.09c0 .644-.527 1.171-1.172 1.171H7.371A1.175 1.175 0 0 1 6.2 32.605V7.36c0-.644.528-1.172 1.172-1.172h15.133a1.17 1.17 0 0 0 1.172-1.171 1.17 1.17 0 0 0-1.172-1.172H7.37A3.52 3.52 0 0 0 3.854 7.36v25.246a3.52 3.52 0 0 0 3.516 3.516M27.418 8.363l4.262 4.262 2.457-2.457-4.262-4.262zm-12.61 16.871 4.676-.414 10.262-10.257-4.262-4.262-10.261 10.262z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Edit2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
