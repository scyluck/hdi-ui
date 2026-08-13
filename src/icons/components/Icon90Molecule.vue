<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M30.052 11.737a4.55 4.55 0 0 1-1.466-3.346 4.56 4.56 0 0 1 4.559-4.555 4.564 4.564 0 0 1 4.558 4.559 4.56 4.56 0 0 1-4.33 4.549L29.552 23.48a4.54 4.54 0 0 1 1.464 3.344 4.563 4.563 0 0 1-4.555 4.559 4.564 4.564 0 0 1-4.282-6.125l-6.848-6.36c-.53.24-1.112.38-1.726.4l-3.519 9.184a4.55 4.55 0 0 1 1.406 3.291 4.564 4.564 0 0 1-4.558 4.559 4.564 4.564 0 0 1-4.559-4.559 4.56 4.56 0 0 1 4.41-4.556l3.519-9.186a4.55 4.55 0 0 1-1.406-3.289 4.56 4.56 0 0 1 4.559-4.558 4.56 4.56 0 0 1 4.28 6.128l6.845 6.361a4.5 4.5 0 0 1 1.644-.397z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Molecule' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
