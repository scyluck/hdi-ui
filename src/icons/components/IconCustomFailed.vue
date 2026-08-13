<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M36.094 13.2a17.4 17.4 0 0 0-3.742-5.552A17.4 17.4 0 0 0 26.8 3.906 17.3 17.3 0 0 0 20 2.531c-2.36 0-4.646.461-6.802 1.375a17.4 17.4 0 0 0-5.55 3.742A17.4 17.4 0 0 0 3.905 13.2 17.3 17.3 0 0 0 2.531 20c0 2.36.461 4.645 1.375 6.8a17.4 17.4 0 0 0 3.742 5.552A17.42 17.42 0 0 0 20 37.469c2.36 0 4.645-.461 6.8-1.375a17.4 17.4 0 0 0 5.552-3.742A17.42 17.42 0 0 0 37.469 20c0-2.36-.461-4.645-1.375-6.8m-8.598 12.089c.61.61.61 1.598 0 2.211a1.56 1.56 0 0 1-2.21 0L20 22.211l-5.289 5.285a1.562 1.562 0 1 1-2.211-2.21L17.789 20l-5.285-5.289a1.565 1.565 0 0 1 0-2.211 1.56 1.56 0 0 1 2.21 0L20 17.789l5.29-5.289a1.564 1.564 0 0 1 2.211 2.211L22.211 20z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomFailed' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
