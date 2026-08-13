<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.293 30.762c-4.325-.82-7.605-4.629-7.605-9.192v-9.707c0-5.156 4.195-9.355 9.351-9.355s9.356 4.195 9.356 9.355v9.711c0 4.56-3.284 8.368-7.61 9.188v3.172h4.207a1.745 1.745 0 1 1 0 3.492H14.086a1.745 1.745 0 1 1 0-3.492h4.207zm1.85-3.325a2 2 0 0 0-.207 0 5.87 5.87 0 0 1-5.76-5.863v-9.71A5.87 5.87 0 0 1 20.039 6a5.87 5.87 0 0 1 5.863 5.863v9.711a5.87 5.87 0 0 1-5.76 5.863m-4.311-15.449a4.208 4.208 0 0 0 8.414.004 4.208 4.208 0 0 0-8.414-.004m3.492.004a.715.715 0 1 1 1.43 0 .715.715 0 0 1-1.43 0m-1.23 11.051a1.863 1.863 0 1 0 3.726 0 1.863 1.863 0 0 0-3.726 0"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Webcam2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
