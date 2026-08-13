<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M6.016 36.277h27.953a3.52 3.52 0 0 0 3.515-3.511V14.004a3.52 3.52 0 0 0-3.515-3.516H23.094a1.17 1.17 0 0 1-1.117-.816l-.028-.082-1.84-3.778a3.53 3.53 0 0 0-3.16-1.976H6.016A3.52 3.52 0 0 0 2.5 7.352v25.41a3.52 3.52 0 0 0 3.516 3.515M4.844 7.352c0-.645.527-1.172 1.172-1.172v-.004h10.933c.445 0 .86.261 1.055.66l1.77 3.633a3.51 3.51 0 0 0 3.32 2.355h10.875c.644 0 1.172.528 1.172 1.172v18.766c0 .644-.528 1.172-1.172 1.172H6.016a1.175 1.175 0 0 1-1.172-1.172zm15.656 13.8h5.078a1.173 1.173 0 0 1 0 2.344H20.5v5.078a1.17 1.17 0 0 1-1.172 1.172 1.17 1.17 0 0 1-1.172-1.172v-5.078h-5.078a1.17 1.17 0 0 1-1.172-1.172 1.17 1.17 0 0 1 1.172-1.172h5.078v-5.078a1.17 1.17 0 0 1 1.172-1.172 1.17 1.17 0 0 1 1.172 1.172z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60FolderAdd' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
