<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.094 36.172H30.91a5.27 5.27 0 0 0 5.262-5.262V9.094a5.27 5.27 0 0 0-5.262-5.266H9.094a5.27 5.27 0 0 0-5.266 5.266v21.812a5.27 5.27 0 0 0 5.266 5.266M7.324 9.094c0-.977.793-1.77 1.77-1.77H30.91c.973 0 1.766.797 1.766 1.77V30.91a1.77 1.77 0 0 1-1.766 1.77H9.094c-.977 0-1.77-.797-1.77-1.77zm1.86 5.367a5.06 5.06 0 0 0 5.054 5.055 5.06 5.06 0 0 0 5.055-5.055 5.06 5.06 0 0 0-5.055-5.055 5.06 5.06 0 0 0-5.054 5.055m3.496 0c0-.86.699-1.559 1.558-1.559s1.559.7 1.559 1.559c0 .86-.7 1.559-1.559 1.559-.86 0-1.558-.7-1.558-1.56m8.449 15.445h7.187a1.75 1.75 0 1 0 0-3.5H21.13a1.75 1.75 0 1 0 0 3.5"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Record' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
