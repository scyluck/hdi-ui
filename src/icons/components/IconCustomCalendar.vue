<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M12 5a2 2 0 0 1 4 0v4a2 2 0 0 1-4 0zm12 0a2 2 0 1 1 4 0v4a2 2 0 0 1-4 0zm-1.3 1.559h-5.4V9a3.3 3.3 0 1 1-6.6 0V6.559H6.172a2.346 2.346 0 0 0-2.344 2.343v25.02a2.346 2.346 0 0 0 2.344 2.344h27.734a2.346 2.346 0 0 0 2.344-2.344V8.902a2.346 2.346 0 0 0-2.344-2.343H29.3V9a3.3 3.3 0 1 1-6.6 0zM8 18a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm11-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm9 0a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zM8 27a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm9 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2zm9 0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomCalendar' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
