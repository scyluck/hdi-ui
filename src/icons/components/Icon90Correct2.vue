<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M13.41 31.953a1.9 1.9 0 0 0 1.57.546 1.9 1.9 0 0 0 1.2-.617l20.777-20.773a1.907 1.907 0 0 0 0-2.699 1.907 1.907 0 0 0-2.7 0L14.759 27.906l-9.07-9.074a1.907 1.907 0 0 0-2.7 0 1.907 1.907 0 0 0 0 2.7z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Correct2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
