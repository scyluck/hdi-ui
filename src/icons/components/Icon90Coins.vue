<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.43 20.047c0 9.664 7.863 17.523 17.523 17.523s17.524-7.855 17.524-17.52c0-9.663-7.86-17.523-17.524-17.523S2.43 10.383 2.43 20.047m3.504.004c0-7.73 6.289-14.02 14.02-14.02 7.726 0 14.019 6.29 14.019 14.02s-6.29 14.02-14.02 14.02-14.02-6.29-14.02-14.02m11.636 6.547a3.35 3.35 0 0 0 2.383.988 3.34 3.34 0 0 0 2.379-.984l4.172-4.172a3.367 3.367 0 0 0 0-4.758L22.332 13.5c-1.273-1.273-3.492-1.27-4.762 0l-4.172 4.172a3.34 3.34 0 0 0-.988 2.379c0 .898.352 1.742.988 2.379zm2.38-2.575-3.977-3.976 3.98-3.977 3.973 3.977z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Coins' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
