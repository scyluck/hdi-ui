<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.234 34.16a1.748 1.748 0 1 0 3.496.004l.026-26.08c.499.217.957.528 1.353.924l10.098 10.097a1.754 1.754 0 0 0 2.48-.003 1.747 1.747 0 0 0 0-2.473L25.59 6.53a7.83 7.83 0 0 0-5.207-2.3 1.75 1.75 0 0 0-.746 0 7.83 7.83 0 0 0-5.196 2.3L4.344 16.63a1.747 1.747 0 0 0 0 2.473 1.747 1.747 0 0 0 2.472 0L16.91 9.008a4.4 4.4 0 0 1 1.35-.923z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Up' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
