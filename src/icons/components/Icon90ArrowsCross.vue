<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M17.517 20.133 4.375 6.984a1.745 1.745 0 0 1 0-2.464c.68-.68 1.785-.68 2.465 0l13.142 13.15L30.155 7.503h-5.257c-.96 0-1.742-.781-1.742-1.742s.782-1.742 1.742-1.742h6.29c2.718 0 4.93 2.21 4.93 4.93v6.288a1.744 1.744 0 0 1-3.488-.004l-.001-5.274L6.832 35.742a1.745 1.745 0 0 1-2.465-2.469zm12.64 12.644-7.063-7.066a1.745 1.745 0 0 1 0-2.465c.68-.68 1.785-.68 2.465 0l7.058 7.065v-5.268c0-.96.781-1.742 1.742-1.742s1.743.781 1.743 1.742v6.316a4.91 4.91 0 0 1-4.903 4.903h-6.316a1.744 1.744 0 0 1 0-3.485z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90ArrowsCross' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
