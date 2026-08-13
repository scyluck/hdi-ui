<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M19.622 35.806a1.76 1.76 0 0 0 .834 0 7.82 7.82 0 0 0 5.165-2.302l10.11-10.113a1.752 1.752 0 0 0-2.477-2.477L23.14 31.027a4.4 4.4 0 0 1-1.35.922l.025-26.113a1.75 1.75 0 0 0-1.75-1.754 1.75 1.75 0 0 0-1.754 1.75l-.025 26.12c-.5-.217-.96-.528-1.357-.925L6.816 20.914a1.752 1.752 0 0 0-2.476 2.477l10.117 10.113a7.82 7.82 0 0 0 5.165 2.302"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Down' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
