<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M21.716 32.29a1.845 1.845 0 0 0 2.609-.001l10.72-10.72a1.75 1.75 0 0 0 .88-1.58 1.84 1.84 0 0 0-.541-1.368L24.325 7.562a1.84 1.84 0 0 0-2.61 0 1.84 1.84 0 0 0 0 2.61l8.122 8.12-23.93-.022a1.75 1.75 0 0 0-1.755 1.75 1.75 1.75 0 0 0 1.75 1.753l23.697.023-7.883 7.884a1.84 1.84 0 0 0 0 2.61"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Right' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
