<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M34.496 21.766H5.527a1.754 1.754 0 1 1 0-3.508h28.965a1.754 1.754 0 0 1 .004 3.508"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Minus' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
