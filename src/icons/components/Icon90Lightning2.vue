<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M16.773 37.461a2.7 2.7 0 0 1-1.37-.379 2.66 2.66 0 0 1-1.227-2.992l2.41-9.11-10.867-1.82a2.66 2.66 0 0 1-2.13-1.887 2.66 2.66 0 0 1 .77-2.738l16.696-15.2a2.66 2.66 0 0 1 3.215-.296 2.66 2.66 0 0 1 1.167 3.008l-2.328 8.258 10.899 1.824a2.66 2.66 0 0 1 2.12 1.86c.302.98.028 2.023-.714 2.726l-16.797 16a2.66 2.66 0 0 1-1.844.746m-8.78-17.484 10.073 1.687a2.68 2.68 0 0 1 2.149 3.332l-1.887 7.137 13.45-12.809-10.169-1.703a2.67 2.67 0 0 1-1.82-1.21 2.68 2.68 0 0 1-.316-2.161l1.789-6.348z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Lightning2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
