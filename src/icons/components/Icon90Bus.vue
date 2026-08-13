<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M36.086 35.672V9.613a7.053 7.053 0 0 0-7.047-7.047H10.684a7.054 7.054 0 0 0-7.047 7.047v23.094q0 .06.004.118v2.847c0 .965.785 1.75 1.75 1.75h3.68a1.75 1.75 0 0 0 1.75-1.75v-1.215h18.085v1.215c0 .965.785 1.75 1.75 1.75h3.68c.969 0 1.75-.781 1.75-1.75M7.136 23.606v7.351h25.45v-7.351zm11.005-3.5H7.137v-7.114H18.14zm3.5 0h10.945v-7.114H21.64zM32.584 9.492a3.55 3.55 0 0 0-3.545-3.426H10.684a3.55 3.55 0 0 0-3.545 3.426zM11.383 29.164h2.336c.965 0 1.75-.785 1.75-1.75s-.785-1.75-1.75-1.75h-2.336c-.965 0-1.75.785-1.75 1.75s.785 1.75 1.75 1.75m14.64 0h2.336c.965 0 1.75-.785 1.75-1.75s-.785-1.75-1.75-1.75h-2.336c-.964 0-1.75.785-1.75 1.75s.786 1.75 1.75 1.75"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Bus' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
