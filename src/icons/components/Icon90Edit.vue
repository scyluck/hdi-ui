<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M4.414 35.645c.328.332.77.511 1.23.511.07 0 .141-.008.211-.015a30.6 30.6 0 0 0 17.891-8.703l10.93-10.93a4.9 4.9 0 0 0 1.441-3.48 4.9 4.9 0 0 0-1.441-3.481l-4.164-4.164a4.9 4.9 0 0 0-3.48-1.442 4.9 4.9 0 0 0-3.481 1.442l-10.93 10.93a30.58 30.58 0 0 0-8.703 17.89 1.73 1.73 0 0 0 .496 1.442M26.012 7.844a1.443 1.443 0 0 1 2.04 0l4.163 4.164c.27.273.422.637.422 1.02 0 .386-.149.745-.422 1.019l-4.148 4.148c-.776-.79-1.97-1.95-3.805-3.734a1.737 1.737 0 0 0-2.461.035 1.737 1.737 0 0 0 .035 2.461 357 357 0 0 1 3.763 3.705l-4.314 4.315a27.1 27.1 0 0 1-13.527 7.32 27.13 27.13 0 0 1 7.324-13.524zm.034 12.371-.001.002z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Edit' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
