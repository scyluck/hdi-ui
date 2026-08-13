<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M8.61 2.59h22.796a4.69 4.69 0 0 1 4.688 4.687V32.72a4.69 4.69 0 0 1-4.688 4.687H8.61a4.69 4.69 0 0 1-4.687-4.687V7.277A4.69 4.69 0 0 1 8.609 2.59m0 31.691h22.796a1.57 1.57 0 0 0 1.567-1.558V20.46a2 2 0 0 1-.157-.09l-3.695-2.293-3.695 2.293a2.148 2.148 0 0 1-3.281-1.828V5.715H8.609c-.863 0-1.562.7-1.562 1.562V32.72c0 .863.7 1.562 1.562 1.562M32.968 7.277c0-.863-.7-1.562-1.563-1.562h-6.14v11.074l2.82-1.75a1.94 1.94 0 0 1 2.062 0l2.82 1.75zM11.25 25.355h8.035a1.562 1.562 0 1 0 0-3.125H11.25a1.562 1.562 0 1 0 0 3.125m0 6.211h17.516a1.562 1.562 0 1 0 .004-3.125H11.25a1.562 1.562 0 1 0 0 3.125"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80FileMarked' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
