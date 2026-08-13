<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M22.996 14.387a12.04 12.04 0 0 0-7.219-2.395c-6.672 0-12.097 5.426-12.097 12.098s5.43 12.098 12.097 12.098c6.672 0 12.098-5.426 12.098-12.098 0-2.703-.89-5.2-2.393-7.216l7.061-7.059v7.794c0 .97.785 1.758 1.758 1.758.972 0 1.761-.789 1.761-1.758V5.625a1.75 1.75 0 0 0-.543-1.273 1.76 1.76 0 0 0-1.575-.485H22.32a1.758 1.758 0 0 0 0 3.516H30zM7.199 24.094c0-4.735 3.848-8.582 8.578-8.582s8.582 3.847 8.582 8.582c0 4.734-3.851 8.582-8.582 8.582-4.73 0-8.578-3.848-8.578-8.582"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Male' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
