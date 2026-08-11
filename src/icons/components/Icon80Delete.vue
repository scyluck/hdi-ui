<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M15.144 5.652h9.766a1.562 1.562 0 1 0 0-3.125h-9.766a1.562 1.562 0 1 0 0 3.125M5.43 8.062h29.257a1.562 1.562 0 1 1 0 3.126h-2.91v21.605a4.69 4.69 0 0 1-4.687 4.687H13.027a4.69 4.69 0 0 1-4.687-4.687V11.188H5.43a1.562 1.562 0 1 1 0-3.125m21.66 26.293c.863 0 1.562-.699 1.562-1.562V11.188H11.465v21.605c0 .863.7 1.562 1.562 1.562zM16.676 29.22c.863 0 1.562-.7 1.562-1.563v-9.765a1.562 1.562 0 1 0-3.125 0v9.765c0 .864.7 1.563 1.563 1.563m6.64 0c.864 0 1.563-.7 1.563-1.563v-9.765a1.562 1.562 0 1 0-3.125 0v9.765c0 .864.7 1.563 1.562 1.563"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Delete' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
