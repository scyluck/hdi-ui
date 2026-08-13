<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M28.352 33.078v-4.8c3.203-.714 6.252-4.112 6.252-8.209 0-4.614-3.473-16.818-7.272-16.818-3.798 0-7.28 12.204-7.28 16.818 0 4.006 3.189 7.352 6.288 8.163v4.656a131 131 0 0 0-6.344-.151c-2.16 0-4.32.139-6.462.415v-5.63c2.229-.655 4.15-2.988 4.15-5.794 0-3.308-2.307-12.18-5.145-12.18-2.844 0-5.145 8.872-5.145 12.18 0 2.853 1.907 5.225 4.2 5.834v5.885c-5.047.87-8.45 2.345-8.45 3.302h33.712c-.002-.961-3.428-3.226-8.504-3.67"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomTree4' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
