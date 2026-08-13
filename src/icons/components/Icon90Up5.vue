<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M32.424 21.075c.36-.36.539-.832.539-1.304s-.18-.946-.54-1.305L21.366 7.407a1.84 1.84 0 0 0-2.61 0L7.698 18.466a1.84 1.84 0 0 0 0 2.61 1.84 1.84 0 0 0 2.61 0l9.754-9.755 9.753 9.754a1.84 1.84 0 0 0 2.61 0m0 11.366c.36-.359.539-.832.539-1.304s-.18-.946-.54-1.305L21.366 18.773a1.84 1.84 0 0 0-2.61 0L7.698 29.832a1.84 1.84 0 0 0 0 2.61 1.84 1.84 0 0 0 2.61 0l9.754-9.755 9.753 9.754a1.84 1.84 0 0 0 2.61 0"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Up5' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
