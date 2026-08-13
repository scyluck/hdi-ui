<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M26.573 21.766a10.76 10.76 0 0 0 4.17-8.504c0-5.938-4.833-10.766-10.77-10.766-5.938 0-10.77 4.828-10.77 10.766a10.76 10.76 0 0 0 4.176 8.509c-5.09 2.462-8.61 7.679-8.61 13.702a1.884 1.884 0 0 0 3.766 0c0-6.309 5.133-11.442 11.442-11.442 6.308 0 11.44 5.133 11.44 11.442 0 1.039.845 1.882 1.884 1.882s1.883-.843 1.89-1.882c0-6.027-3.523-11.246-8.618-13.707m-6.403-1.503c3.768-.105 6.803-3.204 6.803-6.997 0-3.86-3.141-7-7-7s-7 3.14-7 7a7.01 7.01 0 0 0 6.807 6.997 15 15 0 0 1 .39 0"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90User4' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
