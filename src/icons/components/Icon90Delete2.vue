<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M30.113 12.055H9.906v19.05a2.83 2.83 0 0 0 2.828 2.829h14.551a2.83 2.83 0 0 0 2.828-2.829zm3.508 0v19.047a6.34 6.34 0 0 1-6.336 6.343h-14.55a6.347 6.347 0 0 1-6.34-6.34v-19.05h-.868a1.754 1.754 0 1 1 0-3.508H8.03l.118-.004h5.53a6.347 6.347 0 0 1 6.334-6.05 6.347 6.347 0 0 1 6.333 6.05h5.522q.06 0 .118.004h2.507a1.754 1.754 0 0 1 .004 3.508zM22.824 8.543h-5.629a2.83 2.83 0 0 1 5.629 0m-8.347 18.066c0 .97.785 1.754 1.753 1.754.973 0 1.758-.785 1.754-1.754v-7.152a1.754 1.754 0 1 0-3.507 0zm7.558 0c0 .97.785 1.754 1.754 1.754.973 0 1.758-.785 1.754-1.754v-7.152a1.754 1.754 0 1 0-3.508 0z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Delete2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
