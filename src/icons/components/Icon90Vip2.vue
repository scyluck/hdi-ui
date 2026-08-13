<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M31.14 30.668H9.024c-.8 0-1.503-.543-1.707-1.32l-4.789-18.52a1.76 1.76 0 0 1 .684-1.875 1.76 1.76 0 0 1 1.996-.035l7.023 4.652 6.504-9.007a1.77 1.77 0 0 1 1.43-.731h.008c.57.004 1.101.281 1.43.746l6.351 8.985 7.008-4.645a1.76 1.76 0 0 1 1.996.035c.594.422.863 1.168.684 1.875l-4.793 18.524a1.765 1.765 0 0 1-1.707 1.316m-20.753-3.52h19.39l3.297-12.757-4.605 3.05a1.76 1.76 0 0 1-2.41-.449L20.145 8.63l-6.047 8.379a1.763 1.763 0 0 1-2.403.437l-4.605-3.05zm20.347 9.11H9.488a1.762 1.762 0 0 1 0-3.524h21.246a1.762 1.762 0 0 1 0 3.524"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Vip2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
