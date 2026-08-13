<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M34.066 10.27h-9.765a3.43 3.43 0 0 1-2.582-1.172l-3.442-3.926A3.44 3.44 0 0 0 15.695 4H5.953A3.433 3.433 0 0 0 2.52 7.434v25.254a3.433 3.433 0 0 0 3.433 3.433h28.113a3.433 3.433 0 0 0 3.434-3.434V13.703a3.43 3.43 0 0 0-3.434-3.433m-6.37 13.265a1.167 1.167 0 0 1-1.657 0l-4.828-4.828v11.715a1.17 1.17 0 0 1-1.172 1.172 1.17 1.17 0 0 1-1.172-1.172V18.707l-4.828 4.828c-.23.23-.527.344-.828.344s-.602-.113-.828-.344a1.17 1.17 0 0 1 0-1.656l6.828-6.828a1.17 1.17 0 0 1 1.656 0l6.828 6.828c.457.457.457 1.2 0 1.656"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomFileUpload2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
