<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M21.863 37.516a4.87 4.87 0 0 1-3.289-1.29l-3.219-2.925a4.93 4.93 0 0 1-1.609-3.64V19.647a1.42 1.42 0 0 0-.297-.867l-6.445-8.344a4.89 4.89 0 0 1-.524-5.175 4.89 4.89 0 0 1 4.415-2.75H29.64a4.89 4.89 0 0 1 4.418 2.754 4.9 4.9 0 0 1-.528 5.18l-6.433 8.285a1.42 1.42 0 0 0-.297.867v12.988a4.86 4.86 0 0 1-2.93 4.5 4.9 4.9 0 0 1-2.008.43m-.933-3.88a1.39 1.39 0 0 0 1.527.247c.2-.086.844-.442.844-1.297V19.598c0-1.086.367-2.157 1.031-3.016l6.426-8.289a1.38 1.38 0 0 0 .152-1.492c-.117-.239-.476-.793-1.273-.793H10.895c-.797 0-1.157.554-1.274.793-.117.238-.336.863.152 1.492l6.446 8.348a4.94 4.94 0 0 1 1.027 3.007V29.66c0 .399.168.781.465 1.05z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Funnel' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
