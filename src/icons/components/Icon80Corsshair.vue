<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M33.48 18.438h2.458a1.562 1.562 0 1 1 0 3.125h-2.461a13.5 13.5 0 0 1-3.883 8.031 13.5 13.5 0 0 1-8.031 3.883v2.441a1.562 1.562 0 1 1-3.125 0v-2.441a13.5 13.5 0 0 1-8.035-3.883 13.5 13.5 0 0 1-3.88-7.996H4.074a1.562 1.562 0 1 1 0-3.125h2.45a13.5 13.5 0 0 1 3.887-8.066 13.5 13.5 0 0 1 8.03-3.884v-2.46a1.562 1.562 0 1 1 3.125 0v2.46a13.5 13.5 0 0 1 8.031 3.883 13.5 13.5 0 0 1 3.884 8.031M9.556 20c0 5.762 4.687 10.445 10.445 10.445S30.445 25.762 30.445 20 25.758 9.555 20 9.555 9.555 14.238 9.555 20m16.304 0a5.86 5.86 0 1 1-11.719 0 5.86 5.86 0 0 1 11.72 0"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Corsshair' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
