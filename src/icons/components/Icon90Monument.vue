<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M34.488 33.98h-7.773L25.05 4.168a1.758 1.758 0 0 0-2.469-1.508l-6.598 2.938c-.597.265-1 .843-1.039 1.496L13.29 33.98H5.512a1.758 1.758 0 0 0 0 3.516h28.976a1.758 1.758 0 0 0 0-3.516m-17.675 0L18.39 8.375l3.297-1.469 1.511 27.074z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Monument' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
