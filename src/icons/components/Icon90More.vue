<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M5.131 21.167a2.957 2.957 0 1 1 5.464-2.263 2.957 2.957 0 0 1-5.464 2.263m11.97 0a2.957 2.957 0 1 1 5.463-2.263 2.957 2.957 0 0 1-5.464 2.263m12.539.96a2.957 2.957 0 1 1 4.181-4.183 2.957 2.957 0 0 1-4.181 4.182"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90More' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
