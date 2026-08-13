<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M5.415 10.992a2.34 2.34 0 0 0-1.548 2.204v19.746a2.344 2.344 0 0 0 2.344 2.343h13.704a2.344 2.344 0 0 0 2.343-2.343V8.248a2.344 2.344 0 0 0-3.14-2.204zm3.208 6.2a1.563 1.563 0 0 0 0 3.126h8.553a1.562 1.562 0 1 0 0-3.125zm19.752 1.206a2.344 2.344 0 0 0-3.2 2.182v12.362a2.344 2.344 0 0 0 2.344 2.343h6.27a2.344 2.344 0 0 0 2.344-2.343v-9.904c0-.964-.59-1.83-1.488-2.182zM7.06 25.136c0-.863.7-1.562 1.563-1.562h8.553a1.562 1.562 0 1 1 0 3.125H8.623c-.863 0-1.563-.7-1.563-1.563"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomBuilding2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
