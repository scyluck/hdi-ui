<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="m19.094 23.783-8.34 6.948a1.75 1.75 0 0 1-1.121.406c-.504 0-1-.215-1.348-.633a1.75 1.75 0 0 1 .227-2.469l9.636-8.027-9.636-8.028a1.754 1.754 0 0 1 2.242-2.695l8.332 6.941.012-11.968c0-.68.394-1.297 1.011-1.586a1.75 1.75 0 0 1 1.868.242l9.464 7.883c.399.336.63.828.63 1.351 0 .52-.231 1.016-.634 1.348l-7.852 6.543 7.856 6.543c.399.332.633.828.633 1.348s-.23 1.015-.633 1.347l-9.484 7.903a1.74 1.74 0 0 1-1.867.238 1.75 1.75 0 0 1-1.008-1.59zm3.508-15.78-.008 8.298 4.98-4.153zm0 15.786-.008 8.297 4.984-4.152z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Bluetooth' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
