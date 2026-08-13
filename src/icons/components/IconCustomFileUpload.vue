<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="m36.09 12.957-.012-.027q-.042-.105-.098-.211l-3.187-6.633c-.668-1.39-2.004-2.254-3.484-2.254h-18.54c-1.48 0-2.816.863-3.484 2.254l-3.187 6.633q-.054.105-.098.21-.007.013-.008.024a2.3 2.3 0 0 0-.164.856v19.328a3.124 3.124 0 0 0 3.125 3.125h26.172a3.124 3.124 0 0 0 3.125-3.125V13.813c0-.301-.059-.59-.16-.856M23.55 25.844v4.886a1.17 1.17 0 0 1-1.171 1.172h-4.68a1.17 1.17 0 0 1-1.172-1.172v-4.886h-5.226l8.738-9.735 8.738 9.739h-5.226zM8.169 11.469l1.934-4.028c.144-.296.398-.48.668-.48H29.31c.27 0 .527.184.668.48l1.933 4.028z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomFileUpload' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
