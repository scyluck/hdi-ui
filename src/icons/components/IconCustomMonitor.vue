<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M20.344 37.513c-1.32 0-2.64-.336-3.82-1.004l-8.219-4.672c-2.547-1.453-4.133-4.219-4.133-7.223V10.763a4.93 4.93 0 0 1 3.625-4.746l11.266-3.082a4.9 4.9 0 0 1 2.558 0l11.27 3.082a4.93 4.93 0 0 1 3.625 4.746v13.851c0 3.004-1.582 5.77-4.133 7.22l-8.219 4.671a7.7 7.7 0 0 1-3.82 1.004zm-.555-10.477a8.57 8.57 0 0 0 4.429-1.226q.064.087.142.165l3.36 3.368c.561.562 1.47.562 2.032 0 .56-.562.56-1.473 0-2.035l-3.356-3.363a8.6 8.6 0 0 0 2.01-5.545c0-4.769-3.858-8.635-8.617-8.635s-8.617 3.866-8.617 8.635 3.858 8.636 8.617 8.636m0-2.879c3.173 0 5.745-2.577 5.745-5.757s-2.572-5.757-5.745-5.757-5.744 2.578-5.744 5.757c0 3.18 2.572 5.757 5.744 5.757"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomMonitor' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
