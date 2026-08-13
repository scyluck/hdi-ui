<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M26.586 18.586a2 2 0 0 1 0 2.828l-7.172 7.172c-1.26 1.26-3.414.367-3.414-1.414V12.828c0-1.781 2.154-2.674 3.414-1.414z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomTriangleRight' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
