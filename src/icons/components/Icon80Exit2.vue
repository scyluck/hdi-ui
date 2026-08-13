<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M7.262 37.469h9.613a4.69 4.69 0 0 0 4.688-4.688v-3.039a1.562 1.562 0 1 0-3.125 0v3.04c0 .863-.7 1.562-1.563 1.562H7.262c-.864 0-1.563-.7-1.563-1.563V7.231c0-.864.7-1.563 1.563-1.563h9.613c.863 0 1.563.7 1.563 1.562v3.036a1.562 1.562 0 1 0 3.125 0V7.23a4.69 4.69 0 0 0-4.688-4.687H7.262A4.69 4.69 0 0 0 2.574 7.23v25.551a4.69 4.69 0 0 0 4.688 4.688m29.754-18.52a1.57 1.57 0 0 1-.004 2.219l-7.82 7.82a1.56 1.56 0 0 1-1.106.457c-.402 0-.8-.152-1.106-.457a1.566 1.566 0 0 1 0-2.21l5.157-5.157H11.582a1.562 1.562 0 1 1 0-3.125h20.555L26.98 13.34a1.566 1.566 0 0 1 0-2.211 1.566 1.566 0 0 1 2.211 0z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Exit2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
