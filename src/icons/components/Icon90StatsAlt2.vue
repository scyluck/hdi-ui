<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M14.981 6v28a3.2 3.2 0 0 0 3.2 3.2h3.638a3.2 3.2 0 0 0 3.2-3.2V6a3.2 3.2 0 0 0-3.2-3.2H18.18a3.2 3.2 0 0 0-3.2 3.2m6.438 27.6H18.58V6.4h2.838zM2.379 14.533V34a3.2 3.2 0 0 0 3.2 3.2h3.636a3.2 3.2 0 0 0 3.2-3.2V14.533a3.2 3.2 0 0 0-3.2-3.2H5.578a3.2 3.2 0 0 0-3.2 3.2M8.814 33.6H5.978V14.933h2.837zm18.77-12.555V34a3.2 3.2 0 0 0 3.2 3.2h3.637a3.2 3.2 0 0 0 3.2-3.2V21.045a3.2 3.2 0 0 0-3.2-3.2h-3.637a3.2 3.2 0 0 0-3.2 3.2m3.6 12.555V21.445h2.837V33.6z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90StatsAlt2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
