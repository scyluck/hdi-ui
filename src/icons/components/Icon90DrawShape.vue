<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M7.62 33.058h4.614a1.762 1.762 0 1 1 0 3.525H7.561a2.932 2.932 0 0 1-5.25-1.801c0-.936.435-1.77 1.118-2.307V7.55a2.932 2.932 0 1 1 4.136-4.103h24.903a2.932 2.932 0 1 1 4.103 4.11v3.962a1.762 1.762 0 1 1-3.525 0V7.562a3 3 0 0 1-.585-.589H7.631c-.187.26-.418.485-.677.67v24.752c.256.184.48.408.666.663m7.95-6.115 13.378-13.38a2.313 2.313 0 0 1 3.244 0l4.824 4.825c.895.894.895 2.35 0 3.244L23.638 35.01a2.83 2.83 0 0 1-1.762.815c-.547.046-1.105.108-1.667.17-1.176.13-2.372.26-3.54.26a2.347 2.347 0 0 1-2.34-2.548l.421-5.004c.055-.665.35-1.29.82-1.761m18.085-6.933-1.6 1.6-3.085-3.085 1.6-1.6zM21.328 32.336l8.233-8.236-3.084-3.085-8.237 8.237-.283 3.367z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90DrawShape' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
