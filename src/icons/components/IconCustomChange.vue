<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M19.992 2.508c-9.668 0-17.508 7.84-17.508 17.508s7.84 17.507 17.508 17.507S37.5 29.688 37.5 20.016 29.66 2.508 19.992 2.508M9.82 16.332c0-.305.246-.555.555-.555h12.328v-4.004c0-.48.574-.734.926-.406l6.45 5.926c.37.34.128.96-.376.96H10.367a.554.554 0 0 1-.555-.554v-1.367zm20.438 7.363a.554.554 0 0 1-.555.555H17.38v4.008c0 .48-.574.734-.926.406L10 22.734a.554.554 0 0 1 .375-.96h19.336c.305 0 .555.246.555.554v1.367z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomChange' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
