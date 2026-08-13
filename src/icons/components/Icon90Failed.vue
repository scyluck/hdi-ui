<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M29.008 31.492a1.759 1.759 0 0 0 2.484-2.488l-8.997-8.997 8.997-9a1.75 1.75 0 0 0 0-2.48 1.76 1.76 0 0 0-2.484 0l-8.996 8.996-9-9a1.76 1.76 0 0 0-2.485 0 1.76 1.76 0 0 0 0 2.485l9 9-9 9a1.76 1.76 0 0 0 0 2.484 1.76 1.76 0 0 0 2.485 0l8.998-9z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Failed' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
