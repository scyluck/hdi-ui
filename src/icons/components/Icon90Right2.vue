<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M20 2.508c9.645 0 17.492 7.847 17.492 17.492S29.645 37.492 20 37.492 2.508 29.645 2.508 20 10.355 2.508 20 2.508m0 3.5C12.285 6.008 6.008 12.285 6.008 20S12.285 33.992 20 33.992 33.992 27.715 33.992 20 27.715 6.008 20 6.008m9.617 15.226-8.707 8.707v.004a1.747 1.747 0 0 1-2.984-1.238c0-.45.168-.894.512-1.238l5.718-5.723H11.617c-.965 0-1.75-.785-1.75-1.75s.785-1.75 1.75-1.75h12.54l-5.72-5.719a1.747 1.747 0 0 1 0-2.472 1.747 1.747 0 0 1 2.473 0l8.707 8.707a1.745 1.745 0 0 1 0 2.472"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Right2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
