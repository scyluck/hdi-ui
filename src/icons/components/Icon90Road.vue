<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M3.078 35.492c.332.383.813.606 1.32.606h31.336c.496 0 .973-.211 1.301-.586.332-.371.485-.867.426-1.364L33.98 5.426a1.74 1.74 0 0 0-1.727-1.531h-23.5a1.74 1.74 0 0 0-1.723 1.48L2.676 34.098c-.074.5.07 1.011.402 1.394M18.324 7.375v2.973c0 .96.781 1.742 1.742 1.742s1.743-.781 1.743-1.742V7.375h8.902l3.059 25.242H6.426L10.25 7.375zm0 11.98c0 .961.781 1.743 1.742 1.743s1.743-.782 1.743-1.743v-3.32a1.744 1.744 0 0 0-3.484 0zm0 9.286c0 .96.781 1.742 1.742 1.742s1.743-.781 1.743-1.742v-3.32a1.744 1.744 0 0 0-3.484 0z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Road' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
