<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.191 36.188h21.852a5.22 5.22 0 0 0 5.219-5.22V9.059a5.223 5.223 0 0 0-5.219-5.218H9.191A5.223 5.223 0 0 0 3.973 9.06v21.91a5.223 5.223 0 0 0 5.218 5.219M7.47 9.058c0-.949.773-1.722 1.722-1.722h21.852c.95 0 1.723.773 1.723 1.723v21.91c0 .949-.774 1.722-1.723 1.722H9.191a1.725 1.725 0 0 1-1.722-1.722zm6.449 12.454h12.555a1.75 1.75 0 1 0 0-3.5H13.918a1.75 1.75 0 1 0 0 3.5"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Reduce' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
