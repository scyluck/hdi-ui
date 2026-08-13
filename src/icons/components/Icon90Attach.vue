<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M14.828 37.508c-2.7 0-5.402-1.027-7.457-3.082a10.48 10.48 0 0 1-3.09-7.457c0-2.817 1.098-5.465 3.09-7.457L22.125 4.758c2.996-3 7.875-3 10.875 0a7.64 7.64 0 0 1 2.254 5.437c0 2.055-.8 3.985-2.254 5.438L18.203 30.43a4.84 4.84 0 0 1-6.84 0 4.84 4.84 0 0 1 0-6.84L25.555 9.398a1.893 1.893 0 0 1 2.675 2.676L14.04 26.266a1.052 1.052 0 0 0 1.487 1.488L30.32 12.957a3.91 3.91 0 0 0 0-5.523 3.88 3.88 0 0 0-2.761-1.145 3.88 3.88 0 0 0-2.762 1.145l-14.75 14.754a6.72 6.72 0 0 0-1.98 4.78 6.72 6.72 0 0 0 1.98 4.782 6.77 6.77 0 0 0 9.562 0l12.735-12.734a1.893 1.893 0 0 1 2.676 2.675L22.285 34.426a10.52 10.52 0 0 1-7.457 3.082"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Attach' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
