<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M20 2.508C10.355 2.508 2.508 10.355 2.508 20S10.355 37.492 20 37.492 37.492 29.645 37.492 20 29.645 2.508 20 2.508m0 3.5c7.715 0 13.992 6.277 13.992 13.992S27.715 33.992 20 33.992 6.008 27.715 6.008 20 12.285 6.008 20 6.008m-9.617 15.23 8.707 8.703-.004.004a1.747 1.747 0 0 0 2.984-1.238c0-.45-.168-.894-.511-1.238l-5.72-5.719h12.54c.965 0 1.75-.785 1.75-1.75s-.785-1.75-1.75-1.75h-12.54l5.724-5.719a1.747 1.747 0 0 0 0-2.472 1.747 1.747 0 0 0-2.473 0l-8.707 8.707a1.747 1.747 0 0 0 0 2.472"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Left2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
