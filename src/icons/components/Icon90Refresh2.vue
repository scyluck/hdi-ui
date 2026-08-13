<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M37.669 20.075a16.34 16.34 0 0 1-4.805 11.582 16.34 16.34 0 0 1-11.598 4.805 16.34 16.34 0 0 1-11.599-4.805A16.34 16.34 0 0 1 4.862 20.06c0-1.428.188-2.848.553-4.221l-3.297-1.92 9.94-5.485.146 11.351-3.598-2.095q-.216 1.158-.215 2.366c0 7.1 5.774 12.878 12.875 12.878 7.1 0 12.874-5.782 12.874-12.878 0-7.097-5.774-12.875-12.874-12.875a1.762 1.762 0 1 1 0-3.525A16.34 16.34 0 0 1 32.864 8.46a16.34 16.34 0 0 1 4.805 11.583z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Refresh2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
