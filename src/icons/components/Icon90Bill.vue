<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M10.16 9.465a1.727 1.727 0 0 0 3.453 0V8.69h11.645v.774a1.727 1.727 0 0 0 3.453 0V8.69h2.762c.922 0 1.672.75 1.672 1.672v21.809c0 .922-.75 1.672-1.672 1.672H8.449c-.922 0-1.672-.75-1.672-1.672V10.363c0-.922.75-1.672 1.672-1.672h1.711zm3.453-4.23v-.77a1.727 1.727 0 0 0-3.453 0v.77H8.45a5.135 5.135 0 0 0-5.13 5.128v21.809a5.136 5.136 0 0 0 5.13 5.133h23.023a5.136 5.136 0 0 0 5.129-5.133V10.363a5.135 5.135 0 0 0-5.13-5.129h-2.761v-.77a1.727 1.727 0 0 0-3.453 0v.77zm2.535 13.503h-.652a1.727 1.727 0 0 0 0 3.453h2.738v1.664h-2.738a1.727 1.727 0 0 0 0 3.454h2.738v1.59a1.727 1.727 0 0 0 3.454 0v-1.59h2.738a1.727 1.727 0 0 0 0-3.454h-2.738v-1.664h2.738a1.727 1.727 0 0 0 0-3.453h-.719l1.563-1.562a1.728 1.728 0 1 0-2.446-2.446l-2.896 2.897-2.83-2.83a1.728 1.728 0 1 0-2.446 2.445z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Bill' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
