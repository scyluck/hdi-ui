<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M21.629 31.023h2.738a5.126 5.126 0 0 0 5.121-5.12V7.628a5.126 5.126 0 0 0-5.12-5.121h-8.97a5.126 5.126 0 0 0-5.12 5.12v18.274a5.126 5.126 0 0 0 5.12 5.121h2.739v2.91h-4.461a1.745 1.745 0 1 0 0 3.493h12.05a1.745 1.745 0 1 0 0-3.492H21.63zm-7.86-8.656h2.461a1.745 1.745 0 1 0 0-3.492h-2.46v-4.434h2.46a1.745 1.745 0 1 0 0-3.492h-2.46V7.63c0-.9.73-1.63 1.628-1.63h8.97c.898 0 1.628.73 1.628 1.629v3.32h-2.46a1.745 1.745 0 1 0 0 3.492h2.46v4.434h-2.46a1.745 1.745 0 1 0 0 3.492h2.46v3.535a1.63 1.63 0 0 1-1.629 1.63h-8.969a1.63 1.63 0 0 1-1.628-1.63z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Mic2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
