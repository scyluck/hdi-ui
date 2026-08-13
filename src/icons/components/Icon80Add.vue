<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M8.523 3.836H31.57a4.69 4.69 0 0 1 4.688 4.687V31.57a4.69 4.69 0 0 1-4.688 4.688H8.523a4.69 4.69 0 0 1-4.687-4.688V8.523a4.69 4.69 0 0 1 4.687-4.687M31.57 33.133c.864 0 1.563-.7 1.563-1.563V8.523c0-.863-.7-1.562-1.563-1.562H8.523c-.863 0-1.562.7-1.562 1.562V31.57c0 .864.7 1.563 1.562 1.563zM21.563 18.438h6.25a1.562 1.562 0 1 1 0 3.125h-6.25v6.25a1.562 1.562 0 1 1-3.125 0v-6.25h-6.25a1.562 1.562 0 1 1 0-3.125h6.25v-6.25a1.562 1.562 0 1 1 3.125 0z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Add' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
