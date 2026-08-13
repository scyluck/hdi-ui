<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M3.5 9.333V31.01q.137 2.316 1.826 3.905 1.689 1.59 4.007 1.586H31.01q2.316-.137 3.905-1.826 1.59-1.689 1.586-4.007V8.99q-.137-2.316-1.826-3.905-1.689-1.59-4.007-1.586H8.99q-2.316.137-3.905 1.826T3.5 9.333m29.333 0v1.724H7.167V9.333q0-.897.634-1.532.635-.634 1.532-.634h21.334q.897 0 1.532.634.634.635.634 1.532M7.167 30.667V14.723h14.556v18.11H9.333q-.897 0-1.532-.634-.634-.635-.634-1.532m18.223 2.166v-18.11h7.443v16.175l-.01.08q-.107.768-.691 1.296-.623.563-1.465.56z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Module' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
