<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M15.607 27.686c0-5.189 3.29-9.625 7.894-11.33.558-1.254.89-2.648.89-4.042 0-5.458 0-9.883-6.587-9.883-6.589 0-6.589 4.425-6.589 9.883 0 3.399 1.974 6.797 4.392 8.16v1.812c-7.45.609-13.176 4.269-13.176 8.694h13.633a12 12 0 0 1-.457-3.294m12.08-9.882c-5.459 0-9.883 4.424-9.883 9.882s4.424 9.883 9.882 9.883 9.883-4.425 9.883-9.883-4.425-9.882-9.883-9.882m5.489 9.882c0 .606-.492 1.098-1.098 1.098h-3.294v3.294a1.098 1.098 0 0 1-2.196 0v-3.294h-3.294a1.098 1.098 0 0 1 0-2.196h3.294v-3.294a1.098 1.098 0 0 1 2.196 0v3.294h3.294c.606 0 1.098.491 1.098 1.098"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomUserAdd' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
