<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="m32.547 26.457-6.363-14.336 2.57-5.793a2.7 2.7 0 0 0-.207-2.582 2.71 2.71 0 0 0-2.277-1.234H13.746c-.922 0-1.773.46-2.277 1.234a2.71 2.71 0 0 0-.207 2.586l2.57 5.797-6.363 14.336a2.675 2.675 0 0 0 .879 3.242l10.105 7.281a2.67 2.67 0 0 0 3.113-.004l10.106-7.28a2.69 2.69 0 0 0 .875-3.247M25.082 6l-1.941 4.379h-6.266L14.934 6zm-5.074 27.8-9.078-6.538 5.945-13.395h6.262l5.945 13.39z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Service3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
