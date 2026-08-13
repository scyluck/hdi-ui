<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M27.227 10.3a7.813 7.813 0 1 1-15.625 0 7.813 7.813 0 0 1 15.625 0m-7.786 9.184q.457-.001.907.028a11.32 11.32 0 0 0-4.414 8.972c0 3.114 1.254 5.93 3.285 7.977H6.082c-1.383 0-2.453-1.176-2.262-2.492C5 25.762 11.547 19.484 19.441 19.484m-1.238 8.996a8.986 8.986 0 0 1 8.985-8.984 8.986 8.986 0 0 1 8.984 8.984 8.986 8.986 0 0 1-8.984 8.985 8.986 8.986 0 0 1-8.985-8.985m9.004 1.176h4.688a1.173 1.173 0 0 0 0-2.344h-3.516v-3.515a1.17 1.17 0 0 0-1.172-1.172 1.17 1.17 0 0 0-1.172 1.172v4.687a1.17 1.17 0 0 0 1.172 1.172"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomUserWaiting' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
