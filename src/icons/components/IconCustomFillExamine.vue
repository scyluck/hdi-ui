<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M8.084 32.669h23.44q1.666 0 1.666 1.665T31.525 36H8.085q-1.666 0-1.666-1.666t1.665-1.665m23.548-10.32H24.35a1.253 1.253 0 0 1-1.253-1.254v-1.027a1.26 1.26 0 0 1 .627-1.085c2.517-1.467 4.307-4.11 4.172-7.337-.136-3.196-2.309-6.048-5.403-7.15-5.571-1.98-11.067 2.272-11.067 7.497 0 3.07 1.75 5.574 4.176 6.988a1.26 1.26 0 0 1 .63 1.087v1.029a1.253 1.253 0 0 1-1.253 1.253h-6.94C6.367 22.35 5 23.674 5 25.296v3.263a1.253 1.253 0 0 0 1.253 1.253h27.164a1.253 1.253 0 0 0 1.253-1.253v-3.264c0-1.619-1.365-2.946-3.038-2.946"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomFillExamine' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
