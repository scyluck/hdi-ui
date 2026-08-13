<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M7.332 2.516h25.344A3.516 3.516 0 0 1 36.19 6.03v27.895a3.52 3.52 0 0 1-3.515 3.515H7.332a3.52 3.52 0 0 1-3.516-3.515V6.03a3.52 3.52 0 0 1 3.516-3.515m0 32.582h25.344c.648 0 1.172-.528 1.168-1.176v-14.18a1.7 1.7 0 0 1-.371-.172l-3.899-2.422-3.898 2.422a1.76 1.76 0 0 1-1.781.043 1.76 1.76 0 0 1-.903-1.535V4.86H7.332c-.645 0-1.172.528-1.172 1.172v27.895c0 .644.527 1.172 1.172 1.172M33.82 6.03c0-.644-.527-1.172-1.172-1.172h-7.312v12.168l3.418-2.12a1.54 1.54 0 0 1 1.648 0l3.418 2.12zM19.281 24.94h-8.816a1.17 1.17 0 0 1-1.172-1.171 1.17 1.17 0 0 1 1.172-1.172h8.816a1.17 1.17 0 0 1 1.172 1.172 1.17 1.17 0 0 1-1.172 1.171m-8.816 3.868h19.082a1.17 1.17 0 1 1 0 2.344H10.465a1.17 1.17 0 0 1-1.172-1.173 1.17 1.17 0 0 1 1.172-1.171"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60FileMarked' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
