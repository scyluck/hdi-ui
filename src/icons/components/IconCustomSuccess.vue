<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M36.094 13.2a17.4 17.4 0 0 0-3.742-5.552A17.4 17.4 0 0 0 26.8 3.906 17.3 17.3 0 0 0 20 2.531c-2.36 0-4.646.461-6.802 1.375a17.4 17.4 0 0 0-5.55 3.742A17.4 17.4 0 0 0 3.905 13.2 17.3 17.3 0 0 0 2.531 20c0 2.36.461 4.645 1.375 6.8a17.4 17.4 0 0 0 3.742 5.552A17.42 17.42 0 0 0 20 37.469c2.36 0 4.645-.461 6.8-1.375a17.4 17.4 0 0 0 5.552-3.742A17.42 17.42 0 0 0 37.469 20c0-2.36-.461-4.645-1.375-6.8m-6.637 3.929-9.863 9.86a1.56 1.56 0 0 1-1.106.456c-.402 0-.8-.152-1.105-.457l-5.918-5.914a1.566 1.566 0 0 1 0-2.21c.61-.61 1.597-.61 2.21 0l4.813 4.812 8.758-8.758a1.564 1.564 0 0 1 2.211 2.211"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomSuccess' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
