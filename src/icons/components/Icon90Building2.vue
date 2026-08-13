<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M34.57 14.356a1.77 1.77 0 0 0 1.77-1.77V4.277a1.77 1.77 0 0 0-1.77-1.77H5.43a1.77 1.77 0 0 0-1.77 1.77v8.309c0 .977.793 1.77 1.77 1.77H7.2v19.597H5.43a1.77 1.77 0 0 0 0 3.54h29.144a1.77 1.77 0 0 0 0-3.54h-1.508V14.356h1.508zM7.2 6.046h25.605v4.77H7.199zm10.476 27.907v-5.242A2.327 2.327 0 0 1 20 26.387a2.327 2.327 0 0 1 2.324 2.324v5.242h-4.652zm11.851 0h-3.664v-5.242A5.87 5.87 0 0 0 20 22.848a5.87 5.87 0 0 0-5.863 5.863v5.242h-3.403V14.356h18.793z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Building2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
