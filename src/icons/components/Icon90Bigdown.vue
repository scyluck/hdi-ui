<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M20.031 37.461c-1.437 0-2.808-.586-3.86-1.656L5.075 24.55c-1.168-1.184-1.496-2.969-.836-4.547.606-1.45 1.91-2.352 3.399-2.352h2.644V8.625c0-3.383 2.512-6.133 5.598-6.133h8.14c3.087 0 5.598 2.75 5.598 6.133v9.098h2.668c1.488 0 2.79.898 3.395 2.343.66 1.575.34 3.36-.824 4.543l-10.95 11.184c-1.05 1.074-2.425 1.664-3.867 1.668zM7.738 21.434c-.054.113-.09.343.028.46l11.101 11.258c.34.348.746.528 1.168.528h.004c.426 0 .828-.184 1.172-.536l10.953-11.18c.121-.124.078-.35.027-.46h-4.464a1.89 1.89 0 0 1-1.891-1.89V8.624c0-1.273-.832-2.352-1.816-2.352h-8.137c-.985 0-1.817 1.079-1.817 2.352v10.918c0 1.043-.847 1.89-1.89 1.89z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Bigdown' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
