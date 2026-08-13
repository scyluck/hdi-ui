<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.598 19.926c0 9.613 7.824 17.437 17.437 17.437 9.617 0 17.438-7.824 17.438-17.437S29.648 2.492 20.035 2.492 2.598 10.312 2.598 19.926m3.488 0c0-7.692 6.258-13.95 13.95-13.95 7.694 0 13.952 6.258 13.952 13.95s-6.261 13.953-13.953 13.953-13.95-6.262-13.95-13.953M16.43 26.87a4.08 4.08 0 0 0 4.137-.098l5.445-3.375a4.06 4.06 0 0 0 1.933-3.472 4.06 4.06 0 0 0-1.933-3.469l-5.446-3.375a4.08 4.08 0 0 0-4.136-.098 4.1 4.1 0 0 0-2.098 3.57v6.75c0 1.5.785 2.837 2.098 3.567m1.695-10.84a.59.59 0 0 1 .605.012l5.446 3.375a.58.58 0 0 1 .281.508.58.58 0 0 1-.281.508l-5.446 3.375a.57.57 0 0 1-.605.015.57.57 0 0 1-.305-.52v-6.75c0-.308.192-.46.305-.523"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Play' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
