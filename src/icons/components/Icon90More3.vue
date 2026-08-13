<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.665 5.37a2.957 2.957 0 1 1 2.264 5.464 2.957 2.957 0 0 1-2.264-5.464m0 11.968a2.957 2.957 0 1 1 2.264 5.464 2.957 2.957 0 0 1-2.264-5.464m-.96 12.54a2.957 2.957 0 1 1 4.183 4.182 2.957 2.957 0 0 1-4.182-4.182"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90More3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
