<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M29.652 28.23q-.416 0-.808.094L26.684 25a6.82 6.82 0 0 0 2.18-5.004 6.82 6.82 0 0 0-2.75-5.48l1.792-3.54q.217.029.438.028a3.483 3.483 0 0 0 3.484-3.484 3.483 3.483 0 0 0-3.484-3.485 3.483 3.483 0 0 0-2.528 5.883l-1.793 3.539a6.837 6.837 0 0 0-8.785 5.73l-3.976.215a3.486 3.486 0 0 0-6.7 1.348 3.484 3.484 0 0 0 6.824.992l3.977-.215a6.837 6.837 0 0 0 9.356 4.754l2.16 3.32a3.483 3.483 0 0 0 2.773 5.594 3.483 3.483 0 1 0 0-6.965"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomMolecule' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
