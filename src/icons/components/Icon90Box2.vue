<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M7.36 36.094h25.269a4.89 4.89 0 0 0 4.887-4.883V14.863c0-.824-.211-1.636-.614-2.355l-3.441-6.164a4.89 4.89 0 0 0-4.266-2.504H10.793c-1.77 0-3.406.96-4.266 2.504l-3.441 6.164a4.84 4.84 0 0 0-.613 2.355v16.344a4.89 4.89 0 0 0 4.886 4.887m-.673-22.848H33.3l-2.9-5.195a1.38 1.38 0 0 0-1.208-.707H10.793c-.5 0-.961.27-1.207.707zm27.32 3.508V31.21c0 .762-.616 1.383-1.378 1.383H7.359a1.385 1.385 0 0 1-1.382-1.383V16.754zm-10.589 6.828h7.297a1.754 1.754 0 1 0 0-3.508h-7.297a1.754 1.754 0 1 0 0 3.508m-5.66 5.953h12.957a1.754 1.754 0 1 0 0-3.508H17.758a1.754 1.754 0 1 0 0 3.508"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Box2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
