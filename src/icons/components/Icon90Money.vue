<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M19.926 37.488C10.28 37.488 2.438 29.645 2.438 20S10.28 2.508 19.926 2.508 37.418 10.355 37.418 20 29.57 37.488 19.926 37.488m0-31.48C12.21 6.008 5.934 12.285 5.934 20s6.277 13.992 13.992 13.992S33.918 27.715 33.918 20 27.641 6.008 19.926 6.008m-3.867 11.066h-.653a1.75 1.75 0 1 0 0 3.5h2.77v1.68h-2.77a1.75 1.75 0 1 0 0 3.5h2.77v1.605a1.75 1.75 0 1 0 3.5 0v-1.605h2.77a1.75 1.75 0 1 0 0-3.5h-2.77v-1.68h2.77a1.75 1.75 0 1 0 0-3.5h-.723l1.574-1.574a1.747 1.747 0 0 0 0-2.473 1.747 1.747 0 0 0-2.473 0l-2.933 2.934-2.868-2.867a1.747 1.747 0 0 0-2.472 0 1.747 1.747 0 0 0 0 2.472z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Money' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
