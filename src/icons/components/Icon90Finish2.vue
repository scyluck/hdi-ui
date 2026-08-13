<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.215 37.45h8.683a1.749 1.749 0 0 0 0-3.497H9.215a1.77 1.77 0 0 1-1.766-1.766V7.793c0-.973.793-1.766 1.766-1.766h21.777c.973 0 1.766.79 1.766 1.766v13.05a1.745 1.745 0 1 0 3.492 0V7.794a5.265 5.265 0 0 0-5.258-5.258H9.215a5.265 5.265 0 0 0-5.258 5.258v24.398a5.265 5.265 0 0 0 5.258 5.258m4.805-21.868h11.05a1.746 1.746 0 1 0 0-3.492H14.02a1.745 1.745 0 1 0 0 3.492m0 7.18h4.94a1.745 1.745 0 1 0 0-3.492h-4.94a1.745 1.745 0 1 0 0 3.492m10.8 14.175a1.745 1.745 0 0 0 2.469 0l8.453-8.449a1.74 1.74 0 0 0 0-2.468 1.74 1.74 0 0 0-2.469 0l-7.214 7.214-3.496-3.496a1.74 1.74 0 0 0-2.47 0 1.74 1.74 0 0 0 0 2.47z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Finish2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
