<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.957 36.164h20.105a5.186 5.186 0 0 0 5.145-4.559l2.258-18.804a1.745 1.745 0 0 0-2.547-1.754l-6.89 3.625-6.555-10.024a1.748 1.748 0 0 0-2.922 0L12 14.668l-6.89-3.625a1.75 1.75 0 0 0-1.805.105 1.75 1.75 0 0 0-.743 1.649l2.254 18.805a5.183 5.183 0 0 0 5.141 4.562m-1.672-4.977-1.86-15.503 5.352 2.82a1.746 1.746 0 0 0 2.274-.59l5.96-9.117 5.966 9.113a1.747 1.747 0 0 0 2.273.59l5.352-2.816-1.86 15.503a1.69 1.69 0 0 1-1.676 1.485H9.961a1.685 1.685 0 0 1-1.676-1.485m9.293-2.703a3.54 3.54 0 0 0 4.867 0l3.864-3.668a1.746 1.746 0 0 0-2.407-2.53l-3.918 3.667-3.863-3.668a1.746 1.746 0 0 0-2.406 2.531z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Vip' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
