<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.313 37.508h21.886a5.33 5.33 0 0 0 5.324-5.324V16.582a5.23 5.23 0 0 0-5.222-5.223H10.25a2.657 2.657 0 0 1-2.652-2.652 2.655 2.655 0 0 1 2.652-2.652h21.867a1.754 1.754 0 1 0 0-3.508H10.25a6.167 6.167 0 0 0-6.16 6.16v23.578a5.23 5.23 0 0 0 5.223 5.223m8.324-22.64H10.25c-.95 0-1.848-.216-2.652-.602v18.02c0 .944.77 1.714 1.715 1.714h21.886c1.004 0 1.82-.816 1.82-1.82V16.582c0-.945-.769-1.715-1.714-1.715h-1.403V25.63A1.754 1.754 0 0 1 27.051 27l-3.281-2.629L20.488 27a1.75 1.75 0 0 1-1.855.211 1.75 1.75 0 0 1-.996-1.582zm8.761 0h-5.253v7.112l1.527-1.222a1.75 1.75 0 0 1 2.195 0l1.531 1.222z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90BookMark' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
