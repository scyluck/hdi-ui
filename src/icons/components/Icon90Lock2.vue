<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M27.61 16.105V13.56a7.577 7.577 0 0 0-7.57-7.57 7.577 7.577 0 0 0-7.571 7.57v2.546zm-18.65.074v-2.62c0-6.11 4.97-11.079 11.08-11.079 6.108 0 11.077 4.97 11.077 11.079v2.621a5.225 5.225 0 0 1 4.336 5.144v11a5.22 5.22 0 0 1-5.215 5.219H9.84a5.223 5.223 0 0 1-5.219-5.219v-11a5.225 5.225 0 0 1 4.34-5.145m.88 3.434c-.945 0-1.711.77-1.711 1.711v11c0 .946.77 1.711 1.71 1.711h20.395c.946 0 1.711-.77 1.711-1.71v-11c0-.946-.77-1.712-1.71-1.712zm8.445 9.004a1.754 1.754 0 1 0 3.508 0V25.75a1.754 1.754 0 1 0-3.508 0z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Lock2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
