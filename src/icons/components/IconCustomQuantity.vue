<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M35.192 23.798v5.697c0 4.197-6.798 7.596-15.192 7.596S4.808 33.692 4.808 29.495v-5.697c0 4.197 6.798 7.596 15.192 7.596s15.192-3.399 15.192-7.596m0-9.495V20c0 4.197-6.798 7.596-15.192 7.596S4.808 24.196 4.808 20v-5.697c0 4.197 6.798 7.596 15.192 7.596s15.192-3.4 15.192-7.596M20 2.909c8.394 0 15.192 3.399 15.192 7.596S28.394 18.101 20 18.101s-15.192-3.4-15.192-7.596c0-4.197 6.798-7.596 15.192-7.596"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomQuantity' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
