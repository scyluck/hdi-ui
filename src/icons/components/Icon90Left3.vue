<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M25.54 32.828a1.841 1.841 0 0 0 1.305-3.148l-9.755-9.754 9.754-9.754a1.84 1.84 0 0 0 0-2.61 1.84 1.84 0 0 0-2.61 0l-11.058 11.06a1.84 1.84 0 0 0 0 2.609l11.058 11.058c.36.36.832.54 1.305.54"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Left3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
