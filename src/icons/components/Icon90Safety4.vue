<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="m21.277 2.797 11.27 3.082a4.93 4.93 0 0 1 3.625 4.746v13.852c0 3.003-1.586 5.77-4.133 7.218l-8.219 4.672A7.76 7.76 0 0 1 20 37.371a7.7 7.7 0 0 1-3.82-1.004l-8.22-4.672c-2.55-1.449-4.132-4.215-4.132-7.218V10.625A4.934 4.934 0 0 1 7.45 5.879l11.27-3.082a4.87 4.87 0 0 1 2.558 0m9.04 25.879c1.468-.832 2.378-2.446 2.378-4.2l-.004-.003V10.62a1.45 1.45 0 0 0-1.066-1.394l-11.27-3.082a1.5 1.5 0 0 0-.363-.047c-.12 0-.242.02-.363.05L8.359 9.23a1.45 1.45 0 0 0-1.062 1.395v13.852c0 1.753.914 3.363 2.379 4.199l8.219 4.672a4.26 4.26 0 0 0 4.203 0zm-8.579-11.031h2.98a1.737 1.737 0 1 1 0 3.477h-2.98v2.98a1.737 1.737 0 1 1-3.477 0v-2.98h-2.98a1.737 1.737 0 1 1 0-3.477h2.98v-2.981a1.737 1.737 0 1 1 3.477 0z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Safety4' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
