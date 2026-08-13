<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M10.563 9.766a1.671 1.671 0 1 0 3.343 0v-.743h11.25v.743a1.671 1.671 0 1 0 3.344 0v-.743h2.664c.89 0 1.617.727 1.617 1.618v3.496H7.301V10.64a1.62 1.62 0 0 1 1.617-1.618h1.645zm3.343-4.082v-.746a1.671 1.671 0 1 0-3.343 0v.746H8.918a4.96 4.96 0 0 0-4.957 4.957v5.052a2 2 0 0 0 0 .231v15.787a4.96 4.96 0 0 0 4.957 4.957H31.16a4.966 4.966 0 0 0 4.961-4.953V10.64a4.96 4.96 0 0 0-4.957-4.957H28.5v-.746a1.671 1.671 0 1 0-3.344 0v.746zM7.301 17.48v14.235c0 .89.726 1.617 1.617 1.617h22.246a1.62 1.62 0 0 0 1.617-1.617V17.48zm10.476 13.29a1.67 1.67 0 0 0 2.36-.004l8.113-8.106a1.672 1.672 0 0 0-2.363-2.363l-6.926 6.926-3.453-3.453a1.672 1.672 0 0 0-2.363 2.363z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Checkin' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
