<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="m33.46 2.531-8.394.489a5.3 5.3 0 0 0-3.445 1.546L3.637 22.582a2.96 2.96 0 0 0 0 4.188l9.582 9.582a2.966 2.966 0 0 0 4.191 0l17.985-18.016a5.32 5.32 0 0 0 1.543-3.441l.488-8.399a3.75 3.75 0 0 0-3.965-3.965m-2.272 14.063a5.533 5.533 0 1 1-7.825-7.827 5.533 5.533 0 0 1 7.825 7.827"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomTag' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
