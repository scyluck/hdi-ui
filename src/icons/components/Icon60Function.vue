<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M18.145 2.748a3.52 3.52 0 0 1 3.515 0l12.118 6.996a3.52 3.52 0 0 1 1.758 3.045v13.993c0 1.256-.67 2.416-1.758 3.044L21.66 36.823a3.52 3.52 0 0 1-3.515 0L6.026 29.826a3.52 3.52 0 0 1-1.757-3.044V12.789c0-1.256.67-2.417 1.757-3.045zm2.343 2.03a1.17 1.17 0 0 0-1.172 0L7.198 11.773c-.362.21-.586.596-.586 1.015v13.993c0 .418.224.805.586 1.014l12.118 6.997c.363.21.81.21 1.172 0l12.119-6.997c.362-.209.585-.596.585-1.014V12.789c0-.419-.223-.806-.585-1.015zm-.566 3.632c.647 0 1.172.524 1.172 1.171v9.508l8.21 4.74a1.172 1.172 0 1 1-1.172 2.03l-8.21-4.74-8.21 4.74a1.172 1.172 0 0 1-1.172-2.03l8.21-4.74V9.581c0-.647.525-1.171 1.172-1.171"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Function' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
