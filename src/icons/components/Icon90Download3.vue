<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M34.41 37.55H5.59a1.762 1.762 0 0 1 0-3.523h28.82a1.762 1.762 0 0 1 0 3.524m-13.164-5.87a1.764 1.764 0 0 1-2.492 0L6.617 19.543a1.764 1.764 0 0 1 0-2.492 1.764 1.764 0 0 1 2.492 0l9.13 9.129V4.21a1.762 1.762 0 0 1 3.523 0v21.974l9.129-9.13a1.76 1.76 0 0 1 2.492 0 1.764 1.764 0 0 1 0 2.493z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Download3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
