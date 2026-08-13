<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="m19.277 21.016.754.297 16.196-7a1.842 1.842 0 0 0-.004-3.371L20.738 4.23l-.734-.289-16.152 7c-.668.29-1.098.95-1.098 1.684s.43 1.398 1.098 1.688zm.72-3.489L8.726 12.63l11.312-4.906 11.3 4.902zm0 11.012a1.7 1.7 0 0 1-.696-.144L3.652 21.594A1.74 1.74 0 0 1 2.75 19.3a1.74 1.74 0 0 1 2.293-.903l14.953 6.5 15.04-6.5a1.743 1.743 0 0 1 2.292.91 1.743 1.743 0 0 1-.91 2.294l-15.73 6.793a1.7 1.7 0 0 1-.692.144m0 7.375a1.7 1.7 0 0 1-.696-.144L3.652 28.965a1.74 1.74 0 0 1-.902-2.293 1.74 1.74 0 0 1 2.293-.902l14.953 6.5 15.04-6.5a1.743 1.743 0 0 1 2.292.91 1.743 1.743 0 0 1-.91 2.293l-15.73 6.797a1.8 1.8 0 0 1-.692.144"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Stack' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
