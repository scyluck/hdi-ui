<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M20.027 3.844c-8.957 0-16.199 6.515-16.199 14.539q0 .615.059 1.23c.383 4.09 2.648 7.692 6.023 10.117v5.461c0 .84.895 1.352 1.582.922L17 32.687c.992.157 2 .254 3.031.254 8.48 0 15.438-5.851 16.145-13.304a13 13 0 0 0 .074-1.235c-.02-8.043-7.281-14.558-16.223-14.558m-8.906 13a1.562 1.562 0 1 1 0-3.125h2.43a1.562 1.562 0 1 1 0 3.125zM28.184 22.3c0 .863-.7 1.562-1.563 1.562H13.457a1.562 1.562 0 1 1 0-3.125h13.164c.863 0 1.563.7 1.563 1.563m2.336-7.02c0 .864-.7 1.563-1.563 1.563h-9.508a1.562 1.562 0 1 1 0-3.125h9.508c.863 0 1.563.699 1.563 1.562"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomChat' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
