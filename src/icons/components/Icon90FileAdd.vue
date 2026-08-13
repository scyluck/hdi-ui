<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.531 37.488h21.082a4.885 4.885 0 0 0 4.883-4.883V15.691c0-1.18-.426-2.316-1.2-3.207l-7.16-8.222a4.88 4.88 0 0 0-3.683-1.676H9.531a4.89 4.89 0 0 0-4.883 4.883v25.136a4.89 4.89 0 0 0 4.883 4.883M32.004 17.84h-5.582a4.877 4.877 0 0 1-4.871-4.871v-6.89H9.53c-.77 0-1.394.624-1.394 1.394v25.136c0 .77.625 1.395 1.394 1.395h21.082c.77 0 1.39-.625 1.39-1.395zm-.714-3.488h-4.864a1.385 1.385 0 0 1-1.383-1.383V7.174zM20.352 31.578a1.746 1.746 0 0 1-1.747-1.746v-2.984h-2.984a1.745 1.745 0 1 1 0-3.493h2.984v-2.984a1.745 1.745 0 1 1 3.493 0v2.984h2.984a1.746 1.746 0 0 1 .004 3.493h-2.988v2.984c0 .965-.782 1.746-1.746 1.746"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90FileAdd' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
