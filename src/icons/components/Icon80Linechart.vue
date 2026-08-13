<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M5.703 34.402h30.14a1.565 1.565 0 0 1 0 3.13H4.142c-.864 0-1.563-.7-1.563-1.563V4.109a1.562 1.562 0 1 1 3.125 0zm4.332-5.832a1.56 1.56 0 0 1-.945-.32 1.56 1.56 0 0 1-.297-2.188l8.621-11.312c.27-.36.684-.582 1.129-.613.45-.035.887.129 1.207.441l4.512 4.426 7.683-9.969a1.562 1.562 0 1 1 2.477 1.906l-8.754 11.364a1.565 1.565 0 0 1-2.332.164l-4.508-4.418-7.55 9.902c-.305.406-.77.617-1.243.617"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Linechart' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
