<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M22.128 36.22v-7.196h3.96v7.196zm-8.216 0v-8.68H3.57l5.271-8.91H6.308l9.585-14.85 9.584 14.85h-2.533l5.305 8.91H17.873v8.68zm16.015-8.68-4.45-7.426h2.636L20.856 8.866l3.252-5.086 9.584 14.85h-2.533l5.271 8.91z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomTree2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
