<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M31.836 2.84H8.395c-.872 0-1.575.707-1.575 1.574v.191c0 .872.707 1.575 1.575 1.575h23.44c.872 0 1.575-.707 1.575-1.575v-.19c0-.868-.703-1.575-1.574-1.575m0 32.058H8.395c-.872 0-1.575.707-1.575 1.575v.191c0 .871.707 1.574 1.575 1.574h23.44c.872 0 1.575-.707 1.575-1.574v-.191c0-.868-.703-1.575-1.574-1.575m-15.867-7.21 2.074 2.976 2.07 2.973 2.075-2.973 2.07-2.977h-2.469V13.234h2.469l-2.07-2.77-2.075-2.773-2.07 2.774-2.074 2.77h2.476v14.452z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Height' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
