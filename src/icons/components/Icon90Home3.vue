<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M13.398 37.504h13.204v.004c4.949 0 8.976-4.031 8.976-8.98V14.651a1.75 1.75 0 0 0-.7-1.398L21.036 2.848a1.75 1.75 0 0 0-2.105 0L5.117 13.254a1.75 1.75 0 0 0-.695 1.398v13.871c0 4.954 4.027 8.98 8.976 8.98m-5.472-8.98v-13h-.004l12.062-9.09 12.094 9.09v13A5.483 5.483 0 0 1 26.602 34h-13.2a5.483 5.483 0 0 1-5.476-5.477M23.59 28h.004a1.75 1.75 0 0 0-.004-3.5h-7.184a1.75 1.75 0 1 0 0 3.5z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Home3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
