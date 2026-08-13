<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M18.553 11.358V6.312Q18.1 4.2 16.371 5.487L4.366 15.854q-2.64 1.833-.18 3.213l11.825 10.276q2.366 1.744 2.546-.918v-4.68q12.005-3.764 16.917 11.29.453.824.727 0Q40.84 12.46 18.553 11.358"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomBack4' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
