<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.469 37.516h21.14a4.91 4.91 0 0 0 4.903-4.899V15.648c0-1.18-.426-2.324-1.203-3.214l-7.184-8.246a4.9 4.9 0 0 0-3.695-1.68H9.469A4.904 4.904 0 0 0 4.57 7.406v25.211c0 2.7 2.196 4.899 4.899 4.899m21.82-23.207L25.02 7.11v5.81c0 .767.622 1.388 1.387 1.388zm-9.77-8.297H9.47a1.4 1.4 0 0 0-1.4 1.398v25.207a1.4 1.4 0 0 0 1.399 1.399h21.144c.77 0 1.395-.625 1.395-1.399V17.81h-5.602a4.89 4.89 0 0 1-4.886-4.887zM15.575 26.84h9.492a1.749 1.749 0 0 0-.003-3.5h-9.489c-.965 0-1.75.785-1.75 1.75s.785 1.75 1.75 1.75"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90FileReduce' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
