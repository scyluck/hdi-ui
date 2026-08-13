<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M35.129 16.336h-4.184v-3.879a2.346 2.346 0 0 0-2.343-2.344h-4.188V6.188a2.346 2.346 0 0 0-2.344-2.344H4.883a2.346 2.346 0 0 0-2.344 2.344v15.234a2.346 2.346 0 0 0 2.344 2.344H9.07v3.925a2.346 2.346 0 0 0 2.344 2.344h4.184v3.879a2.346 2.346 0 0 0 2.343 2.344H35.13a2.346 2.346 0 0 0 2.344-2.344V18.68a2.346 2.346 0 0 0-2.344-2.344M9.07 12.457v8.965H4.883V6.188H22.07v3.925H11.414a2.346 2.346 0 0 0-2.344 2.344m2.34.383a1.17 1.17 0 0 1 1.172-1.172 1.17 1.17 0 0 1 1.172 1.172 1.173 1.173 0 0 1-2.344 0m5.36 14.851h-5.356V15.574h17.188v12.121H16.77zm18.359 6.223H17.94v-3.879H28.6a2.346 2.346 0 0 0 2.344-2.344V18.68h4.184z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60ScreenChange' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
