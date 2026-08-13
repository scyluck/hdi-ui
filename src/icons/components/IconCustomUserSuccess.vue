<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M27.227 10.3a7.813 7.813 0 1 1-15.625 0 7.813 7.813 0 0 1 15.625 0m-7.786 9.184q.457-.001.907.028a11.32 11.32 0 0 0-4.414 8.972c0 3.114 1.254 5.93 3.285 7.977H6.082c-1.383 0-2.453-1.176-2.262-2.492C5 25.762 11.547 19.484 19.441 19.484m-1.195 9.024a8.986 8.986 0 0 1 17.969 0 8.986 8.986 0 0 1-17.969 0m9.445 3.355 4.973-4.972a1.172 1.172 0 0 0-1.656-1.657l-4.145 4.141-1.933-1.934a1.172 1.172 0 0 0-1.657 1.657l2.762 2.765c.457.457 1.2.457 1.656 0"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomUserSuccess' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
