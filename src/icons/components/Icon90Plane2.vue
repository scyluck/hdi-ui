<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M14.692 15.059 10.8 6.117a1.62 1.62 0 0 1 .133-1.539 1.63 1.63 0 0 1 1.359-.734h5.645c.55 0 1.062.277 1.359.738l6.838 10.477h5.197a4.924 4.924 0 0 1 4.918 4.914 4.925 4.925 0 0 1-4.918 4.918h-5.205l-6.834 10.464c-.3.461-.812.739-1.36.739H12.29a1.63 1.63 0 0 1-1.36-.735 1.63 1.63 0 0 1-.132-1.539l3.889-8.93H5.375a1.624 1.624 0 0 1-1.625-1.624V10.184c0-.899.727-1.625 1.625-1.625h2.191c.551 0 1.063.277 1.364.742l3.73 5.758zm3.538 9.832-3.46 7.953h2.285l5.191-7.953zm7.016-3.25h6.086a1.666 1.666 0 1 0 0-3.332H11.777a1.62 1.62 0 0 1-1.363-.743L7 12.296v9.345zm-3-6.594h-4.015l-3.462-7.953h2.286z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Plane2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
