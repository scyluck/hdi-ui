<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M33.215 20.04c0 6.671-4.985 12.2-11.426 13.06v2.662a1.75 1.75 0 0 1-3.5-.004v-2.659c-6.441-.858-11.426-6.388-11.426-13.06 0-10.25 11.813-17.035 12.317-17.32a1.75 1.75 0 0 1 1.714-.004c.504.281 12.32 7.02 12.32 17.324m-3.496 0c0 4.738-3.426 8.694-7.93 9.52v-2.564l4.555-3.793a1.747 1.747 0 1 0-2.239-2.683l-2.316 1.929v-1.785a2 2 0 0 0 0-.13v-4.936a1.75 1.75 0 1 0-3.5 0v1.13l-2.2-1.935a1.75 1.75 0 0 0-2.309 2.629l4.51 3.966v8.172c-4.505-.826-7.93-4.782-7.93-9.52 0-6.802 7.171-12.095 9.683-13.743 2.516 1.633 9.676 6.883 9.676 13.742"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Leaf2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
