<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M34.422 33.902h-3.043v-4.414a1.75 1.75 0 0 0-1.75-1.75h-2.98L25.022 7.676a1.75 1.75 0 0 0-.468-1.055l-3.282-3.496c-.66-.703-1.886-.703-2.55 0L15.44 6.621a1.75 1.75 0 0 0-.468 1.055l-1.625 20.062h-2.98a1.75 1.75 0 0 0-1.75 1.75v4.414H5.573a1.75 1.75 0 1 0 0 3.5h28.848a1.75 1.75 0 0 0 .004-3.5zM18.41 8.57 20 6.875l1.59 1.695 1.547 19.086h-6.274zm-6.297 25.332v-2.668h15.77v2.668z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Monument2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
