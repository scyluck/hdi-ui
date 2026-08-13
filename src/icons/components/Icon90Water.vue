<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M6.57 23.906c0 7.504 6.106 13.61 13.61 13.61s13.61-6.106 13.61-13.61c0-4.75-5.106-13.066-9.392-19.207a5.15 5.15 0 0 0-4.218-2.203 5.15 5.15 0 0 0-4.22 2.203c-4.284 6.14-9.39 14.457-9.39 19.207M18.832 6.703c.313-.45.805-.707 1.348-.707s1.035.258 1.347.707c5.57 7.98 8.762 14.25 8.762 17.203 0 5.574-4.535 10.11-10.11 10.11S10.07 29.48 10.07 23.906c0-2.953 3.196-9.222 8.762-17.203m-.66 23.984q.3.111.605.11a1.75 1.75 0 0 0 .606-3.395 5.17 5.17 0 0 1-3.137-3.308 1.75 1.75 0 1 0-3.344 1.031 8.7 8.7 0 0 0 5.27 5.562"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Water' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
