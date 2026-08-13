<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M36.094 13.2a17.4 17.4 0 0 0-3.742-5.552A17.4 17.4 0 0 0 26.8 3.906 17.3 17.3 0 0 0 20 2.531c-2.36 0-4.646.461-6.802 1.375a17.4 17.4 0 0 0-5.55 3.742A17.4 17.4 0 0 0 3.905 13.2 17.3 17.3 0 0 0 2.531 20c0 2.36.461 4.645 1.375 6.8a17.4 17.4 0 0 0 3.742 5.552A17.42 17.42 0 0 0 20 37.469c2.36 0 4.645-.461 6.8-1.375a17.4 17.4 0 0 0 5.552-3.742A17.42 17.42 0 0 0 37.469 20c0-2.36-.461-4.645-1.375-6.8m-6.739 8.35h-14.96l4.058 4.06c.61.609.61 1.597 0 2.21a1.56 1.56 0 0 1-1.105.457c-.403 0-.801-.152-1.106-.457l-6.726-6.73a1.56 1.56 0 0 1-.457-1.106c0-.43.175-.82.457-1.105l6.726-6.727a1.564 1.564 0 0 1 2.211 2.211l-4.062 4.063h14.96a1.562 1.562 0 0 1 .004 3.125"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomBack2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
