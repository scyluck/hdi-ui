<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M7.516 33.258h4.718a1.562 1.562 0 1 1 0 3.125H7.461a2.732 2.732 0 0 1-4.95-1.602c0-.906.438-1.71 1.118-2.207V7.454A2.735 2.735 0 0 1 5.254 2.52c.91 0 1.715.445 2.21 1.128H32.57a2.732 2.732 0 1 1 3.8 3.809l.001 4.063a1.562 1.562 0 1 1-3.125 0V7.46a2.9 2.9 0 0 1-.683-.687H7.527a2.8 2.8 0 0 1-.773.766V32.5c.3.2.558.457.762.758M30.57 11.98c.559 0 1.086.22 1.48.614l4.825 4.824a2.096 2.096 0 0 1 0 2.96l-13.379 13.38a2.62 2.62 0 0 1-1.637.758l-5.007.421q-.095.007-.184.008a2.146 2.146 0 0 1-2.14-2.332l.421-5.004a2.62 2.62 0 0 1 .762-1.636l13.379-13.38a2.08 2.08 0 0 1 1.48-.613m-1.882 5.434 3.367 3.367 1.883-1.883-3.368-3.367zm-10.95 14.313 3.68-.309 8.426-8.43-3.367-3.367-8.43 8.43z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80DrawShape' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
