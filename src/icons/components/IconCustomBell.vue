<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M23.715 33.086h-7.352a.64.64 0 0 0-.633.742 4.37 4.37 0 0 0 4.305 3.625 4.37 4.37 0 0 0 4.305-3.625.632.632 0 0 0-.625-.742m10.23-4.941h-3.36V15.723c0-1.387-.28-2.73-.839-3.996a10.1 10.1 0 0 0-2.281-3.247 10.64 10.64 0 0 0-5.16-2.73v-.91a2.3 2.3 0 1 0-4.602 0v.914a10.6 10.6 0 0 0-5.156 2.73 10.2 10.2 0 0 0-2.281 3.246 9.8 9.8 0 0 0-.84 3.997v12.421H6.133a1.481 1.481 0 0 0 0 2.961h27.812a1.482 1.482 0 0 0 0-2.964"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomBell' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
