<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M30.89 37.418H9.11a5.287 5.287 0 0 1-5.282-5.281V7.887A5.287 5.287 0 0 1 9.11 2.605h21.778a5.287 5.287 0 0 1 5.28 5.282v6.679q.01.12 0 .242v17.329a5.28 5.28 0 0 1-5.276 5.281M18.095 18.859 7.309 13.598V7.887c0-.992.808-1.801 1.8-1.801h21.778c.992 0 1.8.809 1.8 1.8v5.718l-10.644 5.248a4.5 4.5 0 0 1-3.95.007m.271-5.072a1.77 1.77 0 1 1 3.27-1.355 1.77 1.77 0 0 1-3.27 1.355M7.31 32.137V17.47l9.261 4.517a7.95 7.95 0 0 0 3.492.801 8 8 0 0 0 3.524-.816l9.102-4.485v14.649c0 .992-.81 1.8-1.801 1.8H9.109c-.992 0-1.8-.808-1.8-1.8"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90File4' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
