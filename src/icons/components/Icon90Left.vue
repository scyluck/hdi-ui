<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.425 32.29a1.84 1.84 0 0 1-1.305.538 1.84 1.84 0 0 1-1.305-.539L4.832 21.305a1.74 1.74 0 0 1-.617-1.356 1.84 1.84 0 0 1 .542-1.328L15.815 7.562a1.84 1.84 0 0 1 2.61 0 1.84 1.84 0 0 1 0 2.61l-8.063 8.063 23.712.023c.961 0 1.742.781 1.742 1.746a1.735 1.735 0 0 1-1.738 1.738l-23.61-.02 7.957 7.958a1.84 1.84 0 0 1 0 2.61"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Left' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
