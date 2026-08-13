<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M22.313 29.5a1.76 1.76 0 0 0 2.125-.281l9.656-9.7a1.755 1.755 0 0 0-.367-2.762l-22.07-12.74a1.757 1.757 0 0 0-2.4.644L2.646 16.117a1.75 1.75 0 0 0-.176 1.332c.12.45.418.832.82 1.067zm.585-3.719L6.57 16.351l.834-1.444 9.96 5.648a1.747 1.747 0 0 0 2.394-.66 1.755 1.755 0 0 0-.66-2.395L9.16 11.865l2.266-3.924 18.562 10.72zm5.582 5.098a1.766 1.766 0 0 0 2.488-.012l5.997-6.058a1.755 1.755 0 0 0-.012-2.485 1.754 1.754 0 0 0-2.484.012l-6 6.059c-.684.687-.676 1.8.011 2.484M2.41 34.484a1.758 1.758 0 0 0 3.516.004v-3.101h.773a5.33 5.33 0 0 0 5.32-5.32 1.758 1.758 0 0 0-3.516 0c0 .995-.808 1.804-1.804 1.804h-.773v-3.098a1.758 1.758 0 0 0-3.516 0z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Webcam' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
