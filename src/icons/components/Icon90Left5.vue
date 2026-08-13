<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M21.21 32.29a1.84 1.84 0 0 1-1.305.538 1.84 1.84 0 0 1-1.304-.539L7.542 21.231a1.84 1.84 0 0 1 0-2.61L18.601 7.562a1.84 1.84 0 0 1 2.609 0 1.84 1.84 0 0 1 0 2.61l-9.754 9.754 9.754 9.754a1.84 1.84 0 0 1 0 2.61m11.366 0a1.84 1.84 0 0 1-1.305.538 1.84 1.84 0 0 1-1.304-.539L18.908 21.231a1.84 1.84 0 0 1 0-2.61L29.967 7.562a1.84 1.84 0 0 1 2.61 0 1.84 1.84 0 0 1 0 2.61l-9.755 9.754 9.754 9.754a1.84 1.84 0 0 1 0 2.61"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Left5' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
