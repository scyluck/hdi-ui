<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M34.375 6.117h-28.8a1.745 1.745 0 1 1 0-3.492h28.8a1.745 1.745 0 1 1 0 3.492M7.32 8.06h25.305a3.5 3.5 0 0 1 3.496 3.492V30.6a3.5 3.5 0 0 1-3.496 3.497H21.719v1.55a1.745 1.745 0 1 1-3.492 0v-1.55H7.32a3.5 3.5 0 0 1-3.492-3.496V11.555A3.497 3.497 0 0 1 7.32 8.059m0 22.539 25.309.004.004-19.051-25.309-.004zm21.407-11.485h-6.024a1.745 1.745 0 1 1 0-3.492h6.024a1.745 1.745 0 1 1 0 3.492m-9.567 1.875a5.026 5.026 0 0 1-5.027 5.028 5.026 5.026 0 0 1-5.028-5.028 5.026 5.026 0 0 1 5.028-5.027v5.027zm9.567 5.367h-6.024a1.745 1.745 0 1 1 0-3.492h6.024a1.745 1.745 0 1 1 0 3.492"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Board' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
