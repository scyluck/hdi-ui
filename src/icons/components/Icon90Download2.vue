<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M26.547 3.836h9.168c.992 0 1.797.805 1.797 1.797v28.734c0 .992-.805 1.797-1.797 1.797H4.285a1.797 1.797 0 0 1-1.797-1.797V5.633c0-.992.805-1.797 1.797-1.797h9.59a1.797 1.797 0 0 1 0 3.594H6.082v25.14h27.836V7.43h-7.371a1.797 1.797 0 0 1 0-3.594m-16.41 9.89a1.79 1.79 0 0 1 2.539 0l5.672 5.68a1.9 1.9 0 0 1-.149-.718V5.633a1.797 1.797 0 0 1 3.594 0v13.055c0 .247-.05.491-.149.718l5.68-5.68a1.79 1.79 0 0 1 2.54 0c.702.7.702 1.84 0 2.54l-6.356 6.355A4.92 4.92 0 0 1 20 24.074a4.93 4.93 0 0 1-3.508-1.453l-6.355-6.355a1.79 1.79 0 0 1 0-2.54"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Download2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
