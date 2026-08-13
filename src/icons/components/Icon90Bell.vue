<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M36.481 30.518v.03a1.763 1.763 0 0 1-1.762 1.746h-8.94a5.753 5.753 0 0 1-5.736 5.422 5.753 5.753 0 0 1-5.735-5.422h-8.94a1.762 1.762 0 1 1 0-3.525H7.94V17.234c0-1.578.322-3.113.958-4.557a11.6 11.6 0 0 1 2.6-3.704 12.13 12.13 0 0 1 6.739-3.261V4.098a1.762 1.762 0 1 1 3.525 0v1.614a12.18 12.18 0 0 1 6.742 3.26 11.6 11.6 0 0 1 2.6 3.705c.636 1.444.958 2.979.958 4.557V28.77h2.652c.97 0 1.755.782 1.766 1.75m-16.44 3.671a2.226 2.226 0 0 1-2.197-1.897h4.391a2.22 2.22 0 0 1-2.194 1.897m-8.577-5.422V17.234c0-4.47 3.819-8.12 8.538-8.12 4.715 0 8.538 3.654 8.538 8.12V28.77z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Bell' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
