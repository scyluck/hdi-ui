<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M34.043 11.898a15.3 15.3 0 0 0-3.297-4.89 15.3 15.3 0 0 0-4.89-3.297A15.3 15.3 0 0 0 19.862 2.5a15.3 15.3 0 0 0-5.992 1.21 15.3 15.3 0 0 0-4.89 3.298 15.3 15.3 0 0 0-3.297 4.89 15.3 15.3 0 0 0-1.211 5.993c0 6.18 3.734 11.195 5.964 13.632 1.524 1.668 3.211 3.114 4.887 4.184 1.215.777 2.98 1.7 4.5 1.7s3.293-.923 4.512-1.7c1.684-1.07 3.379-2.516 4.91-4.18 2.242-2.441 6.004-7.46 6.004-13.636 0-2.078-.406-4.094-1.207-5.993m-14.2 12.883a6.93 6.93 0 0 1-6.921-6.922 6.93 6.93 0 0 1 6.922-6.922 6.93 6.93 0 0 1 6.922 6.922 6.93 6.93 0 0 1-6.922 6.922"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomPinpoint' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
