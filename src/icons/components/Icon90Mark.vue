<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M6.566 36.844c.825.46 1.715.691 2.61.691a5.27 5.27 0 0 0 2.746-.781l7.265-4.402a1.79 1.79 0 0 1 1.86 0l7.265 4.402a5.25 5.25 0 0 0 5.36.086 5.25 5.25 0 0 0 2.703-4.625V7.805a5.314 5.314 0 0 0-5.309-5.309H9.172a5.314 5.314 0 0 0-5.309 5.309v24.414a5.25 5.25 0 0 0 2.703 4.625m16.305-7.496a5.3 5.3 0 0 0-2.754-.774c-.949 0-1.902.258-2.746.774l-7.266 4.402a1.76 1.76 0 0 1-1.812.027 1.76 1.76 0 0 1-.914-1.562V7.805c0-.989.805-1.793 1.793-1.793H31.07c.989 0 1.793.804 1.793 1.793v24.41c0 .945-.64 1.406-.914 1.562a1.77 1.77 0 0 1-1.812-.027zm-9.363-9.618h13.18a1.758 1.758 0 0 0 0-3.515h-13.18a1.758 1.758 0 0 0 0 3.516"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Mark' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
