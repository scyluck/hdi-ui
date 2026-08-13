<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M4.855 35.145h31.48c.65 0 1.173.523 1.169 1.171a1.17 1.17 0 0 1-1.172 1.172H3.684a1.17 1.17 0 0 1-1.172-1.172V3.672A1.17 1.17 0 0 1 3.684 2.5a1.17 1.17 0 0 1 1.171 1.172zm3.196-5.73a1.165 1.165 0 0 0 1.636-.247l8.598-11.64 5.031 5.585c.235.262.579.407.93.387a1.16 1.16 0 0 0 .887-.477L34.809 9.82a1.17 1.17 0 0 0-.254-1.636 1.17 1.17 0 0 0-1.637.254l-8.824 12.035-5.028-5.582a1.17 1.17 0 0 0-1.812.086l-9.45 12.796a1.17 1.17 0 0 0 .247 1.641"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Linechart' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
