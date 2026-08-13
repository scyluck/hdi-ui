<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M11.598 21.645a1.16 1.16 0 0 1-.344-.829c0-.3.113-.601.34-.832a1.17 1.17 0 0 1 1.656 0l5.586 5.586V3.766a1.17 1.17 0 0 1 1.172-1.172 1.17 1.17 0 0 1 1.172 1.172v21.808l5.586-5.586a1.172 1.172 0 0 1 1.656 1.657l-7.59 7.59c-.21.21-.492.34-.828.34-.328 0-.664-.188-.824-.348zM6.094 37.398h27.812a3.52 3.52 0 0 0 3.516-3.519v-6.66a3.52 3.52 0 0 0-3.516-3.516h-2.3a1.17 1.17 0 0 0-1.172 1.172 1.17 1.17 0 0 0 1.171 1.172h2.301c.645 0 1.172.527 1.172 1.172v6.66c0 .644-.527 1.172-1.172 1.172H6.094a1.175 1.175 0 0 1-1.172-1.172v-6.66c0-.645.527-1.172 1.172-1.172h2.344a1.17 1.17 0 0 0 1.171-1.172 1.17 1.17 0 0 0-1.171-1.172H6.094a3.52 3.52 0 0 0-3.516 3.516v6.664a3.52 3.52 0 0 0 3.516 3.515"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Download2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
