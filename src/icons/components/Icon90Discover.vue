<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M2.55 19.969c0 9.629 7.833 17.46 17.462 17.46s17.46-7.831 17.46-17.46-7.831-17.461-17.46-17.461S2.55 10.34 2.55 19.968m3.505-.004c0-7.695 6.261-13.957 13.957-13.957 7.695 0 13.957 6.262 13.957 13.957s-6.262 13.957-13.957 13.957S6.055 27.66 6.055 19.965m5.668 8.496a2.14 2.14 0 0 0 2.21.52l10.43-3.508a2.16 2.16 0 0 0 1.356-1.356l3.508-10.43a2.15 2.15 0 0 0-.52-2.21 2.14 2.14 0 0 0-2.21-.52l-10.43 3.508a2.16 2.16 0 0 0-1.356 1.355l-3.508 10.43a2.15 2.15 0 0 0 .52 2.21m3.668-3.668 2.43-7.223 7.222-2.43-2.43 7.223z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Discover' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
