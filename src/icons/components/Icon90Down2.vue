<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.508 20c0 9.645 7.847 17.492 17.492 17.492S37.492 29.645 37.492 20 29.645 2.508 20 2.508 2.508 10.355 2.508 20m3.5 0c0-7.715 6.277-13.992 13.992-13.992S33.992 12.285 33.992 20 27.715 33.992 20 33.992 6.008 27.715 6.008 20m15.23 9.617 8.703-8.707a1.747 1.747 0 0 0-1.238-2.984c-.45 0-.894.168-1.238.512l-5.719 5.718V11.617c0-.965-.785-1.75-1.75-1.75s-1.75.785-1.75 1.75v12.54l-5.719-5.72a1.747 1.747 0 0 0-2.472 0 1.747 1.747 0 0 0 0 2.473l8.71 8.707c.684.684 1.79.684 2.473 0"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Down2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
