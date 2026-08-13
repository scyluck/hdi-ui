<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M14.48 32.828a1.841 1.841 0 0 1-1.305-3.148l9.755-9.754-9.754-9.754a1.84 1.84 0 0 1 0-2.61 1.84 1.84 0 0 1 2.61 0l11.058 11.06a1.84 1.84 0 0 1 0 2.609L15.785 32.289a1.84 1.84 0 0 1-1.305.54"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Right3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
