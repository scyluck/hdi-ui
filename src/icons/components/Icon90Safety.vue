<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M16.176 36.418a7.74 7.74 0 0 0 3.836 1.023c1.316 0 2.636-.34 3.836-1.023l8.25-4.688c2.558-1.457 4.152-4.234 4.152-7.253V10.762c0-4.598-3.629-8.34-8.09-8.34h-16.3c-4.458 0-8.087 3.742-8.087 8.34v13.715c0 3.015 1.59 5.796 4.153 7.253zM7.273 10.762c0-2.668 2.055-4.84 4.586-4.84h16.305c2.527 0 4.586 2.172 4.586 4.84v13.715c0 1.761-.914 3.375-2.383 4.21l-8.25 4.692a4.22 4.22 0 0 1-4.21 0l-8.25-4.692c-1.47-.835-2.384-2.449-2.384-4.21zm9.747 13.402a1.75 1.75 0 0 0 2.476-.004l8.184-8.18a1.752 1.752 0 0 0-2.477-2.476l-6.941 6.941-3.438-3.433a1.752 1.752 0 0 0-2.476 2.476z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Safety' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
