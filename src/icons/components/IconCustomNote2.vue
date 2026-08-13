<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M14.332 2.504H25.68a2.91 2.91 0 1 1 0 5.82H14.332a2.91 2.91 0 1 1 0-5.82m16.215 2.91h.867c2.27 0 4.035 1.879 4.047 4.14v24.052c0 2.136-1.766 4.015-4.031 4.015H8.77c-2.145 0-4.032-1.758-4.032-4.015V9.43c0-2.137 1.766-4.016 4.032-4.016h.699c0 1.297.508 2.52 1.426 3.438a4.83 4.83 0 0 0 3.437 1.425h11.352c1.296 0 2.52-.507 3.437-1.425a4.83 4.83 0 0 0 1.426-3.438M28.37 20.04a1.562 1.562 0 1 0 0-3.125H11.832a1.562 1.562 0 1 0 0 3.125zm-7.906 8.406a1.562 1.562 0 1 0 0-3.125h-8.633a1.562 1.562 0 1 0 0 3.125z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomNote2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
