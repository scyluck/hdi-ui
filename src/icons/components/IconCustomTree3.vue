<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M32.08 15.692c3.026 1.15 4.32 4.829 3.026 7.59q-1.296 2.762-5.13 2.2c-1.429 2.518-4.2 2.754-6.602 1.688l-2.245 1.736v1.354q0 2.057 1.089 4.969c0 .692-.118.692-.802.691h-3.35c-.685.001-1.034.001-1.034-.691q.772-2.912.772-4.97l-.002-.38-2.53-2.578q-.66.306-1.435.409c-2.166.288-4.318-1.662-4.318-2.7-1.299.43-4.413-.28-5.005-3.106-.593-2.825 1.077-4.975 3.806-6.363-.955-3.19 0-5.935 4.63-6.688.847-3.23 3.514-4.774 6.854-4.773 3.339-.001 5.817 1.542 6.664 4.773 3.28.237 6.337 3.123 5.613 6.84m-14.624 9.864q.203 1.547.288 2.892l-1.87-1.484q.793-.529 1.582-1.408m3.673.547c.34.27 1.19.514 1.565.725l-1.565.953z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomTree3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
