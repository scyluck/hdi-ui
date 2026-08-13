<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M33.125 3.828H6.953a3.124 3.124 0 0 0-3.125 3.125v26.172a3.124 3.124 0 0 0 3.125 3.125h26.172a3.124 3.124 0 0 0 3.125-3.125V6.953a3.124 3.124 0 0 0-3.125-3.125M12.348 8.344a3.757 3.757 0 1 1 0 7.516 3.757 3.757 0 1 1 0-7.516M32.5 32.5H7.527l-.02-6.582c1.188-2.523 3.7-4.266 6.602-4.266 1.278 0 2.477.336 3.52.926 1.21-4.945 5.562-8.61 10.75-8.61 1.457 0 2.844.29 4.117.813V32.5z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomPic2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
