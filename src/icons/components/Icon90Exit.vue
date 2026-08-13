<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M16.875 36.669H7.262a4.89 4.89 0 0 1-4.888-4.888V8.231a4.89 4.89 0 0 1 4.888-4.888h9.613a4.89 4.89 0 0 1 4.887 4.887v3.036a1.762 1.762 0 1 1-3.525 0V8.23c0-.752-.61-1.362-1.362-1.362H7.262c-.753 0-1.363.61-1.363 1.362v23.551c0 .753.61 1.363 1.363 1.363h9.613c.753 0 1.362-.61 1.362-1.363v-3.039a1.762 1.762 0 1 1 3.525 0v3.04a4.89 4.89 0 0 1-4.887 4.887m20.282-17.861a1.766 1.766 0 0 1-.003 2.5l-.001.001-7.82 7.82a1.76 1.76 0 0 1-1.247.516c-.453 0-.903-.172-1.247-.515a1.766 1.766 0 0 1 0-2.494l4.815-4.815H11.582a1.762 1.762 0 1 1 0-3.525h20.072l-4.815-4.815a1.766 1.766 0 0 1 0-2.494 1.766 1.766 0 0 1 2.494 0z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Exit' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
