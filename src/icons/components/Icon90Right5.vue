<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M7.542 32.29a1.845 1.845 0 0 0 2.609-.001L21.21 21.231a1.84 1.84 0 0 0 0-2.61L10.151 7.562a1.84 1.84 0 0 0-2.609 0 1.84 1.84 0 0 0 0 2.61l9.754 9.754-9.754 9.754a1.84 1.84 0 0 0 0 2.61m11.366 0c.36.358.832.538 1.305.538s.945-.18 1.305-.539l11.058-11.058a1.84 1.84 0 0 0 0-2.61L21.518 7.562a1.84 1.84 0 0 0-2.61 0 1.84 1.84 0 0 0 0 2.61l9.754 9.754-9.754 9.754a1.84 1.84 0 0 0 0 2.61"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Right5' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
