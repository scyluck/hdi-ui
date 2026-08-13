<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M33.134 28.778c-.004 4.075-3.32 7.395-7.4 7.395a7.4 7.4 0 0 1-7.395-7.396V11a4.14 4.14 0 0 0-4.132-4.132A4.14 4.14 0 0 0 10.075 11v18.59h1.566a1.637 1.637 0 0 1 1.156 2.797l-3.2 3.203c-.304.308-.718.48-1.156.48-.433 0-.851-.172-1.156-.48l-3.203-3.203a1.637 1.637 0 0 1 1.156-2.797h1.57V11a7.4 7.4 0 0 1 7.395-7.395c4.08 0 7.4 3.316 7.4 7.395v17.777a4.14 4.14 0 0 0 4.131 4.132 4.14 4.14 0 0 0 4.133-4.132V10.215h-1.57a1.637 1.637 0 0 1-1.156-2.797l3.203-3.203a1.63 1.63 0 0 1 2.312 0l3.2 3.203a1.637 1.637 0 0 1-1.157 2.797h-1.565z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Connection' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
