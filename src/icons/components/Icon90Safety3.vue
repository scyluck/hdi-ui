<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M16.027 36.46a7.89 7.89 0 0 0 7.773 0l8.204-4.66c2.594-1.476 4.203-4.288 4.203-7.34V10.646a5.08 5.08 0 0 0-3.73-4.887L21.234 2.684a5.03 5.03 0 0 0-2.636 0L7.359 5.758a5.08 5.08 0 0 0-3.73 4.887V24.46c0 3.055 1.61 5.863 4.203 7.34zm3.567-30.128q.156-.042.32-.043.167.001.32.043l11.243 3.074c.554.153.945.66.945 1.239V24.46c0 1.695-.879 3.246-2.293 4.05l-8.195 4.66a4.1 4.1 0 0 1-4.036 0l-8.195-4.66c-1.414-.804-2.293-2.355-2.293-4.05V10.645c0-.579.387-1.086.945-1.239zm.32 19.356a1.89 1.89 0 0 1-1.89-1.891v-2.832H15.19a1.89 1.89 0 0 1-1.89-1.89c0-1.044.847-1.891 1.89-1.891h2.832v-2.836a1.892 1.892 0 0 1 3.781-.001v2.837h2.837a1.891 1.891 0 0 1 0 3.78h-2.836v2.829a1.89 1.89 0 0 1-1.89 1.895"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Safety3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
