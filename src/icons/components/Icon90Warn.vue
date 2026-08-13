<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M8.871 36.176h22.926a6.14 6.14 0 0 0 5.371-3.102 6.13 6.13 0 0 0 0-6.199L25.711 7.023a6.14 6.14 0 0 0-5.371-3.101 6.14 6.14 0 0 0-5.371 3.101L3.504 26.88a6.13 6.13 0 0 0 0 6.2 6.13 6.13 0 0 0 5.367 3.097M18.02 8.78a2.65 2.65 0 0 1 2.317-1.336c.965 0 1.832.5 2.312 1.336l11.465 19.856a2.64 2.64 0 0 1 0 2.675 2.65 2.65 0 0 1-2.316 1.336H8.87c-.969 0-1.832-.5-2.316-1.336a2.65 2.65 0 0 1 0-2.675zm.555 13.762a1.762 1.762 0 0 0 3.524 0v-5.375a1.762 1.762 0 0 0-3.524 0zm-.071 6.048a1.984 1.984 0 1 1 3.667-1.518 1.984 1.984 0 0 1-3.667 1.518"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Warn' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
