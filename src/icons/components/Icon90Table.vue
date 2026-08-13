<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M2.42 7.537a5.273 5.273 0 0 1 5.273-5.274H32.15a5.273 5.273 0 0 1 5.273 5.274v24.458a5.273 5.273 0 0 1-5.273 5.273H7.693a5.273 5.273 0 0 1-5.274-5.273zm5.273-1.758c-.971 0-1.758.787-1.758 1.758v5.372h27.974V7.537c0-.971-.787-1.758-1.758-1.758zM5.935 23.145v-6.72h6.882v6.72zm10.398 0v-6.72h7.139v6.72zm7.139 3.516h-7.14v7.092h7.14zm3.516 7.092V26.66h6.92v5.334c0 .97-.786 1.758-1.757 1.758zm0-10.608v-6.72h6.92v6.72zM5.935 26.661h6.882v7.092H7.693a1.76 1.76 0 0 1-1.758-1.758z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Table' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
