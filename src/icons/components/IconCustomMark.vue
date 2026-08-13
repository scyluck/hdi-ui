<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M31.133 2.555H8.945a4.81 4.81 0 0 0-4.808 4.808V35.09c0 1.918 2.136 3.062 3.734 2l12.168-8.102 12.164 8.102c1.598 1.062 3.735-.082 3.735-2V7.363a4.807 4.807 0 0 0-4.805-4.808m-1.574 12.629a2.346 2.346 0 0 1-2.344 2.343H12.863a2.346 2.346 0 0 1-2.343-2.343 2.346 2.346 0 0 1 2.343-2.344h14.348a2.346 2.346 0 0 1 2.348 2.344"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomMark' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
