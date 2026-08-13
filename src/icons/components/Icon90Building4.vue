<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="m30.191 3.887 4.121 3.773.004-.004a5.28 5.28 0 0 1 1.707 3.88v20.769a5.21 5.21 0 0 1-5.203 5.203H9.187a5.21 5.21 0 0 1-5.203-5.203v-12.48a5.27 5.27 0 0 1 1.696-3.868l3.129-2.879c1.996-1.84 5.128-1.84 7.125 0l1.328 1.223v-2.762a5.26 5.26 0 0 1 1.707-3.879l4.117-3.773a5.23 5.23 0 0 1 7.105 0m.625 30.125c.942 0 1.707-.766 1.707-1.707V11.539a1.77 1.77 0 0 0-.574-1.3l-4.117-3.774a1.757 1.757 0 0 0-2.383 0l-4.117 3.77a1.75 1.75 0 0 0-.574 1.3v22.477zm-5.921-19.637a1.745 1.745 0 1 1 3.492 0v14.852a1.745 1.745 0 1 1-3.492 0zm-17.418 5.45v12.48h.003a1.71 1.71 0 0 0 1.707 1.707h8.079V19.824c0-.488-.207-.965-.57-1.297l-3.13-2.879a1.765 1.765 0 0 0-2.39 0l-3.13 2.88a1.76 1.76 0 0 0-.57 1.296m3.148 3.128a1.745 1.745 0 1 1 3.492 0v6.274a1.745 1.745 0 1 1-3.492 0z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Building4' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
