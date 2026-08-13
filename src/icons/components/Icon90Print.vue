<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M30.207 28.055h2.543a3.29 3.29 0 0 0 3.289-3.293V9.039a6.47 6.47 0 0 0-6.465-6.465H10.66A6.47 6.47 0 0 0 4.195 9.04v15.723a3.296 3.296 0 0 0 3.293 3.293h2.547v5.851a3.583 3.583 0 0 0 3.578 3.578h13.012a3.59 3.59 0 0 0 3.582-3.582zm0-3.492h2.344V9.039a2.977 2.977 0 0 0-2.973-2.973H10.66A2.977 2.977 0 0 0 7.688 9.04v15.524h2.347V21.55c0-.965.781-1.746 1.746-1.746h16.68c.965 0 1.746.78 1.746 1.746zM11.781 11.887h2.57a1.745 1.745 0 1 0 0-3.492h-2.57a1.745 1.745 0 1 0 0 3.492m1.742 22.015V23.297h13.192v10.605c0 .051-.04.09-.09.09H13.613a.09.09 0 0 1-.09-.09"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Print' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
