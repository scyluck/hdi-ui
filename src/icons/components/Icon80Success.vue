<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M32.352 7.648a17.4 17.4 0 0 1 3.742 5.551A17.3 17.3 0 0 1 37.469 20a17.42 17.42 0 0 1-5.117 12.351 17.4 17.4 0 0 1-5.551 3.743 17.3 17.3 0 0 1-6.8 1.375 17.42 17.42 0 0 1-12.352-5.117A17.4 17.4 0 0 1 3.905 26.8 17.3 17.3 0 0 1 2.531 20c0-2.36.461-4.646 1.375-6.802a17.4 17.4 0 0 1 3.742-5.55A17.4 17.4 0 0 1 13.2 3.905 17.3 17.3 0 0 1 20 2.531c2.36 0 4.645.461 6.8 1.375a17.4 17.4 0 0 1 5.552 3.742M5.656 20c0 7.91 6.434 14.344 14.344 14.344S34.344 27.91 34.344 20 27.91 5.656 20 5.656 5.656 12.09 5.656 20m13.078 2.691 7.528-7.527a1.563 1.563 0 0 1 2.21 2.211l-8.632 8.633a1.56 1.56 0 0 1-1.106.457c-.402 0-.8-.153-1.105-.457l-5.18-5.18a1.566 1.566 0 0 1 0-2.21 1.566 1.566 0 0 1 2.211 0z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Success' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
