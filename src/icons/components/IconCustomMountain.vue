<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="m32.266 17.004-3.153-3.613-7.773 16.812 1.316-10.332 5.063-4.887-5.102-9.976L17.5 8.797l-4.727 12.195-2.078-3.523-4.375 6.25L2.5 34.992h35.004z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomMountain' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
