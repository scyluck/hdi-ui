<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.223 20.3a1.745 1.745 0 1 0 3.492 0V4.294a1.745 1.745 0 1 0-3.492 0zm-14.618.821c0 9.024 7.34 16.363 16.364 16.363 9.02 0 16.36-7.34 16.36-16.363 0-6.09-3.349-11.637-8.743-14.48a1.75 1.75 0 0 0-2.36.73 1.75 1.75 0 0 0 .731 2.36 12.85 12.85 0 0 1 6.875 11.39c0 7.094-5.773 12.867-12.867 12.867S7.098 28.215 7.098 21.121c0-4.758 2.605-9.11 6.804-11.355a1.74 1.74 0 0 0 .715-2.364 1.74 1.74 0 0 0-2.363-.715 16.35 16.35 0 0 0-8.649 14.434"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Close' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
