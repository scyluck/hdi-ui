<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M27.238 17.188c-6.257 0-11.328 5.07-11.328 11.328a11.32 11.32 0 0 0 4.399 8.965H6.223a2.346 2.346 0 0 1-2.344-2.344V4.847a2.346 2.346 0 0 1 2.344-2.343h25a2.346 2.346 0 0 1 2.343 2.344v14.27a11.3 11.3 0 0 0-6.328-1.93M9.227 7.422a1.173 1.173 0 0 0 0 2.344h18.996a1.17 1.17 0 0 0 1.172-1.172 1.17 1.17 0 0 0-1.172-1.172zm0 6.707A1.17 1.17 0 0 0 8.055 15.3a1.17 1.17 0 0 0 1.172 1.172h8.609a1.17 1.17 0 0 0 1.172-1.172 1.17 1.17 0 0 0-1.172-1.172zm9.027 14.387a8.986 8.986 0 0 1 8.984-8.985 8.986 8.986 0 0 1 8.985 8.985 8.986 8.986 0 0 1-17.969 0m9.445 3.355 4.973-4.973a1.172 1.172 0 0 0-1.656-1.656l-4.145 4.14-1.933-1.933a1.172 1.172 0 0 0-1.657 1.657l2.762 2.765c.457.457 1.2.457 1.656 0"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomFileSuccess2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
