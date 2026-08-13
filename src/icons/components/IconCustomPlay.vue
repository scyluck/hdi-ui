<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M2.508 20.008c0-9.66 7.836-17.496 17.496-17.496S37.5 10.344 37.5 20.004 29.664 37.5 20.004 37.5 2.508 29.668 2.508 20.008m12.9 7.033v-14.07a.88.88 0 0 1 1.34-.75l11.433 7.036a.88.88 0 0 1 0 1.498L16.748 27.79a.88.88 0 0 1-1.34-.749"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomPlay' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
