<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M10.833 5.5a4.75 4.75 0 0 1 4.417-3h9a4.75 4.75 0 0 1 4.417 3H31a5 5 0 0 1 5 5v15.25a1.75 1.75 0 1 1-3.5 0V10.5A1.5 1.5 0 0 0 31 9h-2.333a4.75 4.75 0 0 1-4.417 3h-9a4.75 4.75 0 0 1-4.417-3H9a1.5 1.5 0 0 0-1.5 1.5v22A1.5 1.5 0 0 0 9 34h15.25a1.75 1.75 0 1 1 0 3.5H9a5 5 0 0 1-5-5v-22a5 5 0 0 1 5-5zm4.417.5h9a1.25 1.25 0 1 1 0 2.5h-9a1.25 1.25 0 1 1 0-2.5m14.02 22.296A9.7 9.7 0 0 0 31 22.75c0-5.385-4.365-9.75-9.75-9.75s-9.75 4.365-9.75 9.75 4.365 9.75 9.75 9.75c2.06 0 3.971-.639 5.546-1.73l5.237 5.238a1.75 1.75 0 1 0 2.475-2.475zm-8.02.612a6.158 6.158 0 1 0 0-12.316 6.158 6.158 0 0 0 0 12.316"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Check' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
