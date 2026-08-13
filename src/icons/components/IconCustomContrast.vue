<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M2.5 5.5a3 3 0 0 1 3-3h19a3 3 0 0 1 3 3v7h7a3 3 0 0 1 3 3v19a3 3 0 0 1-3 3h-19a3 3 0 0 1-3-3v-7h-7a3 3 0 0 1-3-3zm13 10h19v19h-19z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomContrast' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
