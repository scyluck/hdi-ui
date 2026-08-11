<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M23.918 9.586h8.883a4.7 4.7 0 0 1 4.691 4.687v17.282a4.69 4.69 0 0 1-4.687 4.687H7.219a4.69 4.69 0 0 1-4.688-4.687V8.57A4.69 4.69 0 0 1 7.22 3.883h8.867c1.348 0 2.633.582 3.523 1.597l3.133 3.575c.297.336.727.53 1.176.53m8.883 23.531c.863 0 1.562-.699 1.562-1.562V14.273c0-.863-.699-1.562-1.562-1.562h-8.887a4.7 4.7 0 0 1-3.523-1.598L17.258 7.54a1.57 1.57 0 0 0-1.176-.531H7.215c-.863 0-1.563.699-1.563 1.562v22.985c0 .863.7 1.562 1.563 1.562zm-11.239-12.18h4.586a1.562 1.562 0 1 1 0 3.126h-4.586v4.585a1.562 1.562 0 1 1-3.125 0v-4.585h-4.585a1.562 1.562 0 1 1 0-3.125h4.585v-4.586a1.562 1.562 0 1 1 3.125 0z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80FolderAdd' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
