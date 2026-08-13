<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M21.137 4.254 36.934 17.69h-.004a1.752 1.752 0 0 1-1.137 3.09 1.74 1.74 0 0 1-1.137-.418l-.347-.297v11.239c0 2.68-2.543 4.86-5.668 4.86H11.355c-3.125 0-5.667-2.18-5.667-4.86V20.066l-.348.297a1.753 1.753 0 1 1-2.274-2.672L18.863 4.254a1.75 1.75 0 0 1 2.274 0m7.504 28.398c1.235 0 2.156-.708 2.16-1.343V17.082L20 7.895 9.203 17.082v14.223c0 .632.922 1.347 2.156 1.347zM18.246 21.023V17.61a1.754 1.754 0 1 1 3.508 0v3.414h3.414a1.754 1.754 0 1 1 0 3.508h-3.414v3.414a1.754 1.754 0 1 1-3.508 0v-3.414h-3.414a1.754 1.754 0 1 1 0-3.508z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Pharmacy' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
