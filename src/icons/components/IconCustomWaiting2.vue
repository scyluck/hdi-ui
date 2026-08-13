<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M37.468 20c0 2.265-.428 4.477-1.28 6.571a17.3 17.3 0 0 1-3.836 5.781A17.42 17.42 0 0 1 20 37.468c-2.265 0-4.477-.428-6.571-1.28a17.3 17.3 0 0 1-5.781-3.836A17.42 17.42 0 0 1 2.533 20c0-2.265.427-4.477 1.278-6.571a17.3 17.3 0 0 1 3.837-5.781 17.3 17.3 0 0 1 5.78-3.837A17.4 17.4 0 0 1 20 2.532c2.265 0 4.477.428 6.571 1.28a17.3 17.3 0 0 1 5.781 3.836 17.3 17.3 0 0 1 3.837 5.78A17.4 17.4 0 0 1 37.468 20M20 8.5a1.5 1.5 0 0 0-1.5 1.5v10a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 1 0 0-3h-8.5V10A1.5 1.5 0 0 0 20 8.5"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomWaiting2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
