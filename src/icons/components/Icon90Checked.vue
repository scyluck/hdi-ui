<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.457 19.969c0 9.656 7.856 17.515 17.516 17.515s17.515-7.863 17.515-17.52c0-9.655-7.86-17.515-17.515-17.515-9.657 0-17.516 7.863-17.516 17.52m3.5 0c0-7.73 6.29-14.016 14.016-14.016s14.015 6.29 14.015 14.016-6.285 14.015-14.015 14.015S5.957 27.7 5.957 19.97m7.177 2.833a7.4 7.4 0 0 1 9.671-9.672 7.402 7.402 0 1 1-9.671 9.672"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Checked' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
