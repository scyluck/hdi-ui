<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.715 18.881c-3.37-.79-5.887-3.82-5.887-7.428V4.316a1.741 1.741 0 1 1 3.485 0v7.137a4.145 4.145 0 0 0 4.14 4.14 4.143 4.143 0 0 0 4.14-4.14V4.316a1.741 1.741 0 1 1 3.485 0v7.137c.003 3.607-2.512 6.637-5.879 7.428v16.826a1.741 1.741 0 1 1-3.484.004zm0-7.22a1.741 1.741 0 1 0 3.484 0V4.315a1.741 1.741 0 1 0-3.484 0zm21.055 7.285c3.465-.573 5.48-2.924 5.48-6.528 0-5.98-2.836-9.844-7.223-9.844-4.96 0-7.222 5.102-7.222 9.844 0 3.604 2.015 5.955 5.48 6.528V35.71c0 .96.778 1.742 1.742 1.742a1.74 1.74 0 0 0 1.743-1.746zm-1.743-3.352c-3.308 0-3.734-1.696-3.734-3.176 0-2.555.996-6.356 3.734-6.356 3.63 0 3.735 5.704 3.735 6.356 0 1.477-.426 3.176-3.735 3.176"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Dining' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
