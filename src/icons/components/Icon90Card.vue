<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M33.95 14.383v-3.34c0-.992-.805-1.797-1.798-1.797H7.914c-.992 0-1.797.805-1.797 1.797v3.34zm-31.31 1.62v-4.96A5.28 5.28 0 0 1 7.919 5.77H32.16a5.28 5.28 0 0 1 5.274 5.273v5.078q0 .08-.008.16V29.1a5.276 5.276 0 0 1-5.274 5.274H7.914a5.28 5.28 0 0 1-5.277-5.273v-12.98q0-.06.004-.119m3.477 1.856v11.243a1.8 1.8 0 0 0 1.797 1.796h24.242c.992 0 1.797-.804 1.797-1.796V17.859zm19.43 10.32h4.004a1.737 1.737 0 1 0 0-3.477l-4.004.001a1.737 1.737 0 1 0 0 3.477"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Card' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
