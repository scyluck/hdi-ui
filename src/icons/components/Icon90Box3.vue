<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M31.023 36.258H9.086a5.234 5.234 0 0 1-5.227-5.227V9.098A5.234 5.234 0 0 1 9.086 3.87h21.937a5.234 5.234 0 0 1 5.227 5.227v21.937a5.23 5.23 0 0 1-5.227 5.223M16.301 7.375h7.508v13.394l-2.817-1.789a1.7 1.7 0 0 0-.937-.273c-.325 0-.653.094-.938.273l-2.816 1.79zm-3.496 0h-3.72v-.004c-.948 0-1.722.774-1.722 1.723V13.5h5.442zm0 9.625v6.96c0 .642.347 1.227.906 1.536a1.75 1.75 0 0 0 1.781-.059l4.567-2.902 4.566 2.902c.285.184.61.274.937.274a1.757 1.757 0 0 0 1.754-1.754V17h5.43v14.031c0 .95-.773 1.723-1.723 1.723H9.086c-.95 0-1.723-.774-1.723-1.723V17zm14.511-3.5V7.375h3.707c.95 0 1.723.773 1.723 1.723V13.5z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Box3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
