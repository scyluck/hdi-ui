<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M19.941 2.648c-9.625 0-17.425 7.801-17.425 17.426S10.316 37.5 19.94 37.5s17.426-7.8 17.426-17.426-7.8-17.426-17.426-17.426M20 6.824a5.653 5.653 0 1 1-.002 11.306A5.653 5.653 0 0 1 20 6.824m10.758 21.574a13.63 13.63 0 0 1-10.817 5.325 13.63 13.63 0 0 1-10.742-5.227 1.37 1.37 0 0 1-.101-1.527c2.175-3.766 6.242-6.301 10.902-6.301a12.57 12.57 0 0 1 10.852 6.21 1.365 1.365 0 0 1-.094 1.52"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomUserRound' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
