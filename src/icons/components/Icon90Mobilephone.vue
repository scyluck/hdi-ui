<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M12.25 37.426h15.324a5.24 5.24 0 0 0 5.23-5.23V7.651a5.235 5.235 0 0 0-5.23-5.226H12.25a5.23 5.23 0 0 0-5.23 5.226V32.2a5.235 5.235 0 0 0 5.23 5.227M10.52 7.652c0-.949.777-1.726 1.73-1.726h15.324c.953 0 1.73.773 1.73 1.726v15.313H10.52zm0 18.813h18.785v5.73a1.73 1.73 0 0 1-1.73 1.727H12.25a1.73 1.73 0 0 1-1.73-1.727zm7.998 5.072a1.969 1.969 0 1 1 2.784-2.785 1.969 1.969 0 0 1-2.784 2.785"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Mobilephone' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
