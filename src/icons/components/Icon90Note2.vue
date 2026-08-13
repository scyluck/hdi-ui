<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.105 37.508h21.88a5.273 5.273 0 0 0 5.265-5.266V7.734a5.27 5.27 0 0 0-5.266-5.265H9.105A5.27 5.27 0 0 0 3.84 7.734v24.508a5.27 5.27 0 0 0 5.265 5.266M7.344 7.734c0-.972.789-1.761 1.761-1.761h21.88c.968 0 1.761.789 1.761 1.761v24.508c0 .973-.789 1.762-1.762 1.762H9.105c-.968 0-1.761-.79-1.761-1.762zm6.453 10.715h8.426a3.564 3.564 0 0 0 3.558-3.558v-2.375a3.564 3.564 0 0 0-3.558-3.559h-8.426a3.564 3.564 0 0 0-3.559 3.559v2.375a3.564 3.564 0 0 0 3.559 3.558m-.055-3.558.055-2.43 8.476.055v2.375a.053.053 0 0 1-.054.054zm7.723 16.648h6.36a1.754 1.754 0 0 0 0-3.508h-6.36a1.754 1.754 0 1 0 0 3.508"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Note2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
