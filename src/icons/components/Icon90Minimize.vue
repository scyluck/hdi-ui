<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M25.684 19.129h8.726c.965 0 1.746-.781 1.742-1.742a1.74 1.74 0 0 0-1.742-1.742h-7.6l8.125-8.125c.68-.68.68-1.786 0-2.465a1.745 1.745 0 0 0-2.465 0l-8.121 8.12V5.583a1.741 1.741 0 1 0-3.485 0v8.727a4.8 4.8 0 0 0 1.47 3.463 4.8 4.8 0 0 0 3.35 1.357M15.73 34.355c0 .961.778 1.743 1.743 1.743a1.75 1.75 0 0 0 1.746-1.739v-8.73c0-2.66-2.164-4.82-4.82-4.82H5.667a1.741 1.741 0 1 0 0 3.484h7.624l-8.116 8.113a1.745 1.745 0 0 0 2.469 2.465l8.085-8.086z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Minimize' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
