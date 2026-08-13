<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M32.414 32.883h2.031a1.8 1.8 0 0 0 1.801-1.809c0-.996-.809-1.805-1.805-1.805h-2.027V17.418a1.805 1.805 0 0 0-3.61 0v11.851H13.817l21.82-21.82a1.804 1.804 0 0 0 0-2.554 1.804 1.804 0 0 0-2.554 0L11.254 26.723V11.516H22.5a1.805 1.805 0 0 0 0-3.61H11.254V5.113a1.805 1.805 0 0 0-3.61 0v2.793H5.618a1.805 1.805 0 0 0 0 3.61h2.028v16.41a4.94 4.94 0 0 0 1.362 3.41 2 2 0 0 0 .183.184 4.94 4.94 0 0 0 3.412 1.363h16.203v2.031a1.805 1.805 0 1 0 3.61-.004z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Crop' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
