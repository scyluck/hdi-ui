<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.098 37.496H30.98a5.27 5.27 0 0 0 5.266-5.27V7.872a5.275 5.275 0 0 0-5.27-5.27H9.099a5.275 5.275 0 0 0-5.27 5.27v24.356a5.275 5.275 0 0 0 5.27 5.27M7.316 7.871c0-.98.801-1.781 1.782-1.781h21.879c.98 0 1.78.8 1.78 1.781v24.356c0 .98-.8 1.78-1.78 1.78H9.097c-.98 0-1.78-.8-1.78-1.78zm5.266 6.414h15.07a1.745 1.745 0 0 0-.004-3.492H12.582a1.745 1.745 0 1 0 0 3.492m0 7.477h15.07a1.745 1.745 0 0 0-.004-3.492H12.582a1.745 1.745 0 1 0 0 3.492m0 7.476h9.813a1.745 1.745 0 1 0 0-3.492h-9.813a1.745 1.745 0 1 0 0 3.492"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Article' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
