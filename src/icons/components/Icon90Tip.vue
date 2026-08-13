<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.563 20.062c0 9.622 7.828 17.446 17.449 17.446 9.617 0 17.445-7.828 17.445-17.446 0-9.617-7.824-17.445-17.445-17.445s-17.45 7.824-17.45 17.445m3.492 0c0-7.695 6.261-13.957 13.957-13.957 7.695 0 13.957 6.262 13.957 13.957S27.707 34.02 20.012 34.02 6.055 27.758 6.055 20.062m12.57-3.847a1.961 1.961 0 1 1 2.773-2.773 1.961 1.961 0 0 1-2.773 2.773m-.36 10.914a1.745 1.745 0 1 0 3.493 0v-7.067a1.745 1.745 0 1 0-3.492 0z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Tip' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
