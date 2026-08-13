<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M23.457 2.496c1.85 0 3.365 1.45 3.474 3.27h.444c4.02 0 7.29 3.27 7.29 7.289v17.187c0 4.02-3.27 7.29-7.29 7.29h-14.73c-4.02 0-7.29-3.27-7.29-7.29V13.055c0-4.02 3.27-7.29 7.29-7.29h.443a3.484 3.484 0 0 1 3.474-3.269zm-6.865 6.74-.02-3.097 6.871-.024v3.067zm6.9 3.307h-6.96a3.453 3.453 0 0 1-3.446-3.273h-.441a3.79 3.79 0 0 0-3.786 3.785v17.187c0 2.086 1.7 3.785 3.786 3.785h14.73a3.79 3.79 0 0 0 3.785-3.785V13.055a3.79 3.79 0 0 0-3.785-3.785h-.442a3.45 3.45 0 0 1-3.44 3.273m-4.918 17.422a1.75 1.75 0 0 1-1.238-.512l-4.652-4.652a1.752 1.752 0 0 1 2.476-2.477l3.414 3.414 6.903-6.902a1.752 1.752 0 0 1 2.476 2.476l-8.14 8.141a1.75 1.75 0 0 1-1.239.512"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Finish' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
