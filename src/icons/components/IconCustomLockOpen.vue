<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M33.125 15.781H13.313V8.766a2.346 2.346 0 0 1 2.343-2.344h8.68a2.346 2.346 0 0 1 2.344 2.344v2.273a1.954 1.954 0 0 0 3.906 0V8.766a6.235 6.235 0 0 0-3.812-5.754 6.2 6.2 0 0 0-2.434-.492h-8.684a6.235 6.235 0 0 0-5.754 3.813 6.2 6.2 0 0 0-.492 2.433v7.015H6.953a3.124 3.124 0 0 0-3.125 3.125v15.438a3.124 3.124 0 0 0 3.125 3.125h26.172a3.124 3.124 0 0 0 3.125-3.125V18.906a3.124 3.124 0 0 0-3.125-3.125M21.992 29.75a1.954 1.954 0 0 1-3.906 0V23.5a1.954 1.954 0 0 1 3.906 0z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomLockOpen' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
