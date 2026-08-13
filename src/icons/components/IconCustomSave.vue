<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="m27.355 4.988 7.735 7.735a3.95 3.95 0 0 1 1.16 2.797v17.609a3.124 3.124 0 0 1-3.125 3.125H6.953a3.124 3.124 0 0 1-3.125-3.125V6.953a3.124 3.124 0 0 1 3.125-3.125H24.56a3.96 3.96 0 0 1 2.796 1.16M9.52 7.605c-.864 0-1.563.7-1.563 1.563v4.805c0 .863.7 1.562 1.563 1.562h13.437c.863 0 1.563-.7 1.563-1.562V9.168c0-.863-.7-1.563-1.563-1.563zm21.039 24.958c.863 0 1.562-.7 1.562-1.563h.004V20.77c0-.864-.7-1.563-1.562-1.563H9.52c-.864 0-1.563.7-1.563 1.563V31c0 .863.7 1.563 1.563 1.563zm-.54-8.18a3.195 3.195 0 1 1-6.39 0 3.195 3.195 0 0 1 6.39 0"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomSave' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
