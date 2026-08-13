<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M32.914 14.395a1.841 1.841 0 0 0-3.148-1.305l-9.754 9.754-9.754-9.754a1.84 1.84 0 0 0-2.61 0 1.84 1.84 0 0 0 0 2.61l11.059 11.058a1.84 1.84 0 0 0 2.61 0l11.058-11.059c.36-.36.539-.832.539-1.304"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Down3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
