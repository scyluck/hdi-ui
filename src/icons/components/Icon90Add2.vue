<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.258 34.492a1.754 1.754 0 1 0 3.508 0V21.766h12.73a1.754 1.754 0 0 0-.004-3.508H21.766V5.528a1.754 1.754 0 1 0-3.508 0v12.73H5.528a1.754 1.754 0 1 0 0 3.508h12.73z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Add2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
