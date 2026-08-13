<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M32.352 7.648a17.4 17.4 0 0 1 3.742 5.551A17.3 17.3 0 0 1 37.469 20c0 2.36-.465 4.645-1.375 6.8a17.4 17.4 0 0 1-3.742 5.552 17.4 17.4 0 0 1-5.551 3.742 17.3 17.3 0 0 1-6.8 1.375c-2.36 0-4.646-.465-6.802-1.375a17.4 17.4 0 0 1-5.55-3.742A17.4 17.4 0 0 1 3.905 26.8 17.3 17.3 0 0 1 2.531 20c0-2.36.461-4.646 1.375-6.802a17.4 17.4 0 0 1 3.742-5.55A17.4 17.4 0 0 1 13.2 3.905 17.3 17.3 0 0 1 20 2.531c2.36 0 4.645.461 6.8 1.375a17.4 17.4 0 0 1 5.552 3.742M5.656 20c0 7.91 6.434 14.344 14.344 14.344S34.344 27.91 34.344 20 27.91 5.656 20 5.656 5.656 12.09 5.656 20m16.16-7.858a1.953 1.953 0 1 1-3.702 1.25 1.953 1.953 0 0 1 3.701-1.25m-3.375 5.753a1.562 1.562 0 1 1 3.125 0v10.003a1.562 1.562 0 1 1-3.125 0z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Tips3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
