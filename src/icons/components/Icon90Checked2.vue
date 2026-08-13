<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.105 36.258h21.832a5.19 5.19 0 0 0 5.188-5.188V9.238a5.195 5.195 0 0 0-5.188-5.187H9.105a5.195 5.195 0 0 0-5.187 5.187V31.07a5.195 5.195 0 0 0 5.187 5.188M7.398 9.238a1.71 1.71 0 0 1 1.707-1.707h21.832a1.71 1.71 0 0 1 1.708 1.707V31.07c0 .942-.766 1.707-1.708 1.707H9.105a1.71 1.71 0 0 1-1.707-1.707zm9.329 17.844a1.737 1.737 0 0 0 2.46 0l9.653-9.652a1.74 1.74 0 1 0-2.461-2.461l-8.426 8.422-4.172-4.172a1.74 1.74 0 1 0-2.46 2.46z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Checked2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
