<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M33.125 3.844H6.953a3.124 3.124 0 0 0-3.125 3.125V33.14a3.124 3.124 0 0 0 3.125 3.125h26.172a3.124 3.124 0 0 0 3.125-3.125V6.969a3.124 3.124 0 0 0-3.125-3.125M28.09 24.098c-.23.23-.527.343-.828.343s-.602-.113-.828-.343l-5.223-5.223v12.238a1.17 1.17 0 0 1-1.172 1.172 1.17 1.17 0 0 1-1.172-1.172V18.875l-5.222 5.223c-.23.23-.528.343-.829.343s-.601-.113-.828-.343a1.17 1.17 0 0 1 0-1.657l7.223-7.222a1.17 1.17 0 0 1 1.656 0l7.223 7.222c.457.457.457 1.2 0 1.657m1.492-13.508a1.17 1.17 0 0 1-1.172 1.172H11.668a1.17 1.17 0 0 1-1.172-1.172 1.17 1.17 0 0 1 1.172-1.172h16.738c.649 0 1.176.523 1.176 1.172"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomUpload' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
