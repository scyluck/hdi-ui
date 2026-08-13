<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M16.848 36.355a7.8 7.8 0 0 0 3.824 1.004 7.7 7.7 0 0 0 3.824-1.004l8.23-4.675c2.555-1.453 4.141-4.223 4.141-7.23V10.581a4.94 4.94 0 0 0-3.629-4.754l-11.28-3.086a4.9 4.9 0 0 0-2.563 0L8.113 5.828a4.94 4.94 0 0 0-3.629 4.754v13.867c0 3.008 1.586 5.778 4.141 7.23zm3.46-30.25c.118-.035.243-.05.364-.05s.246.015.36.05l11.28 3.086a1.446 1.446 0 0 1 1.067 1.395v13.867c0 1.758-.91 3.367-2.379 4.203l-8.227 4.676a4.27 4.27 0 0 1-4.207 0l-8.226-4.676c-1.465-.832-2.38-2.445-2.38-4.203V10.586c0-.649.442-1.223 1.067-1.395zm-1.374 14.567a1.737 1.737 0 1 0 3.476 0v-7.047a1.737 1.737 0 1 0-3.476 0zm.354 6.602a1.957 1.957 0 1 1 2.768-2.767 1.957 1.957 0 0 1-2.768 2.767"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Warn2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
