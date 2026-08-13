<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M34.997 5v3.333c0 16.045-8.955 23.334-20 23.334h-3.17c.353-5.02 1.916-8.059 5.996-11.669 2.007-1.775 1.837-2.8.849-2.211-6.807 4.05-10.189 9.523-10.339 18.263l-.005.617H4.995c0-2.272.193-4.334.577-6.22q-.574-3.235-.575-8.78C4.997 12.462 12.458 5 21.663 5c3.334 0 6.667 1.667 13.334 0"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomLeaf' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
