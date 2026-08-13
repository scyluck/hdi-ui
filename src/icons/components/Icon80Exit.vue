<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M18.441 18.434a1.562 1.562 0 1 0 3.125 0V4.07a1.562 1.562 0 1 0-3.125 0zM13.59 36.172c2.043.863 4.215 1.3 6.45 1.3 2.237 0 4.405-.437 6.444-1.296a16.6 16.6 0 0 0 5.266-3.551 16.5 16.5 0 0 0 3.55-5.266 16.5 16.5 0 0 0 1.302-6.449c0-3.004-.813-5.95-2.352-8.512a16.66 16.66 0 0 0-6.77-6.293 1.56 1.56 0 0 0-2.097.692 1.56 1.56 0 0 0 .691 2.098q.253.129.5.265a13.46 13.46 0 0 1 6.903 11.746c0 7.41-6.032 13.442-13.442 13.442S6.594 28.316 6.594 20.906a13.46 13.46 0 0 1 7.394-12.008 1.563 1.563 0 0 0 .692-2.097 1.56 1.56 0 0 0-2.098-.692q-.293.147-.574.305a16.55 16.55 0 0 0-8.535 14.492c0 2.235.441 4.407 1.3 6.45a16.6 16.6 0 0 0 3.551 5.265 16.5 16.5 0 0 0 5.266 3.55"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Exit' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
