<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M16.75 25.61A12.02 12.02 0 0 0 23.956 28c6.66 0 12.082-5.422 12.082-12.082S30.621 3.836 23.957 3.836 11.875 9.254 11.875 15.918c0 2.7.89 5.195 2.39 7.208l-2.177 2.177-5.4-5.4a1.754 1.754 0 0 0-2.485 0 1.754 1.754 0 0 0 0 2.484l5.4 5.4-5.36 5.361a1.754 1.754 0 0 0 0 2.485 1.75 1.75 0 0 0 2.484 0l5.36-5.362 5.343 5.342a1.75 1.75 0 0 0 2.484 0 1.754 1.754 0 0 0 0-2.484l-5.342-5.342zm-1.363-9.692c0-4.727 3.843-8.57 8.57-8.57 4.723 0 8.57 3.843 8.57 8.57s-3.843 8.57-8.57 8.57-8.57-3.843-8.57-8.57"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Female' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
