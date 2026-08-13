<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="m37.055 34.812-5.79-5.785a16.14 16.14 0 0 0 3.676-10.281 16.16 16.16 0 0 0-4.746-11.46 16.16 16.16 0 0 0-11.46-4.747 16.1 16.1 0 0 0-6.313 1.27A16.2 16.2 0 0 0 7.27 7.28a16.16 16.16 0 0 0-4.747 11.461A16.16 16.16 0 0 0 7.27 30.203a16.16 16.16 0 0 0 11.46 4.747c2.188 0 4.313-.43 6.313-1.273a16 16 0 0 0 4.016-2.442l5.78 5.782c.306.304.704.457 1.106.457s.801-.153 1.106-.457a1.553 1.553 0 0 0 .004-2.204m-18.32-2.98c-7.215 0-13.087-5.871-13.087-13.086S11.52 5.66 18.734 5.66 31.82 11.531 31.82 18.746c0 3.496-1.36 6.781-3.832 9.25a13 13 0 0 1-9.254 3.836"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Search' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
