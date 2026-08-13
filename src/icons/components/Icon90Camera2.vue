<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.05 36.262h21.92a5.256 5.256 0 0 0 5.254-5.254V9.086a5.26 5.26 0 0 0-5.254-5.254H9.05a5.26 5.26 0 0 0-5.254 5.254v21.922a5.26 5.26 0 0 0 5.254 5.254M7.306 9.086c0-.961.78-1.746 1.746-1.746H30.97c.965 0 1.75.781 1.75 1.746v21.922c0 .96-.785 1.746-1.75 1.746H9.05a1.75 1.75 0 0 1-1.746-1.746zm19.476 2.316a1.972 1.972 0 1 0 3.945 0 1.972 1.972 0 0 0-3.945 0m-6.77 16.34c-4.241 0-7.695-3.453-7.695-7.695s3.454-7.695 7.696-7.695 7.695 3.453 7.695 7.695-3.453 7.695-7.695 7.695m0-11.883a4.193 4.193 0 0 0-4.187 4.188 4.193 4.193 0 0 0 4.188 4.187 4.193 4.193 0 0 0 4.187-4.187 4.193 4.193 0 0 0-4.187-4.188"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Camera2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
