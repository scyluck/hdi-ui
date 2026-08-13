<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="m37.172 35.488-6.77-6.765a15.74 15.74 0 0 0 3.836-10.332 15.75 15.75 0 0 0-4.633-11.188 15.8 15.8 0 0 0-5.027-3.39 15.7 15.7 0 0 0-6.16-1.243A15.75 15.75 0 0 0 7.23 7.203a15.8 15.8 0 0 0-3.39 5.027 15.7 15.7 0 0 0-1.242 6.16A15.75 15.75 0 0 0 7.23 29.579a15.77 15.77 0 0 0 11.188 4.633 15.75 15.75 0 0 0 10.328-3.832l6.766 6.77a1.173 1.173 0 0 0 1.66-1.66m-18.754-3.617c-7.43 0-13.477-6.047-13.477-13.476S10.988 4.918 18.418 4.918s13.477 6.047 13.477 13.477S25.848 31.87 18.418 31.87"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Search' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
