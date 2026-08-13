<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M7.105 25.453c0 .473.18.945.54 1.305a1.84 1.84 0 0 0 2.609 0l9.754-9.754 9.754 9.754a1.84 1.84 0 0 0 2.61 0 1.84 1.84 0 0 0 0-2.61L21.311 13.09a1.84 1.84 0 0 0-2.609 0L7.645 24.148c-.36.36-.54.832-.54 1.305"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Up3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
