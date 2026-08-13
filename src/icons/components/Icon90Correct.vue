<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="m7.281 18.762 8.574 9.914a.842.842 0 0 0 1.254.02l15.688-16.977a.833.833 0 0 0-.004-1.137.844.844 0 0 0-1.14-.082L16.944 22.406a.84.84 0 0 1-.988.051l-7.578-4.934a.84.84 0 0 0-1.09.149.83.83 0 0 0-.008 1.09"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Correct' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
