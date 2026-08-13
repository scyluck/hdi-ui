<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M16.273 10.832h-3.625V7.207a1.758 1.758 0 0 0-3.515 0v3.625H5.508a1.758 1.758 0 0 0 0 3.516h3.625v3.625a1.758 1.758 0 0 0 3.515 0v-3.625h3.625a1.758 1.758 0 0 0 0-3.516m7.454 3.512h10.765a1.758 1.758 0 0 0 0-3.516H23.727a1.758 1.758 0 0 0 0 3.516m10.765 9.082H23.727a1.758 1.758 0 0 0 0 3.515h10.765a1.758 1.758 0 0 0 0-3.515m0 7.613H23.727a1.758 1.758 0 0 0 0 3.516h10.765a1.758 1.758 0 0 0 0-3.516m-18.55-7.098a1.754 1.754 0 0 0-2.485 0l-2.566 2.567-2.567-2.567a1.754 1.754 0 0 0-2.484 0 1.754 1.754 0 0 0 0 2.485l2.566 2.566L5.84 31.56a1.754 1.754 0 0 0 0 2.484 1.75 1.75 0 0 0 2.484 0l2.567-2.566 2.566 2.566a1.75 1.75 0 0 0 2.484 0 1.754 1.754 0 0 0 0-2.484l-2.566-2.567 2.566-2.566a1.754 1.754 0 0 0 0-2.485"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Calculator2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
