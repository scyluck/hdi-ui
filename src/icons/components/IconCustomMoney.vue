<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M20 4.167a15.833 15.833 0 1 0 0 31.666 15.833 15.833 0 0 0 0-31.666m5.275 19a1.583 1.583 0 1 1 0 3.166h-3.692v2.109a1.583 1.583 0 1 1-3.166 0v-2.109h-3.692a1.583 1.583 0 1 1 0-3.166h3.692v-2.642h-3.692a1.583 1.583 0 0 1 0-3.167h3.008l-4.108-4.108a1.583 1.583 0 0 1 2.208-2.233L20 15.183l4.067-4.066a1.538 1.538 0 1 1 2.175 2.175l-4.092 4.091h3.108a1.584 1.584 0 0 1 0 3.167h-3.675v2.617z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomMoney' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
