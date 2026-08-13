<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M30.207 20.023H8.961a1.76 1.76 0 0 0-1.758 1.758v10.375c0 .969.79 1.758 1.758 1.758h22.023a1.76 1.76 0 0 0 1.758-1.758V21.781a1.76 1.76 0 0 0-1.758-1.758zm1.754-3.417V7.59a5.265 5.265 0 0 0-5.258-5.258H13.238A5.265 5.265 0 0 0 7.98 7.59v9.017a5.27 5.27 0 0 0-4.289 5.174v10.375a5.274 5.274 0 0 0 5.27 5.266h22.02a5.28 5.28 0 0 0 5.273-5.266V21.781a5.276 5.276 0 0 0-4.293-5.175m-3.508-.09H11.488V7.59c0-.965.785-1.75 1.75-1.75h13.465c.965 0 1.75.785 1.75 1.75zm-12.48-2.66a1.754 1.754 0 0 1-1.754-1.754v-1.91a1.754 1.754 0 1 1 3.508 0v1.91c0 .968-.786 1.753-1.754 1.753m7.96 0a1.754 1.754 0 0 1-1.753-1.754v-1.91a1.754 1.754 0 1 1 3.508 0v1.91c0 .968-.786 1.753-1.754 1.753"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Usb' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
