<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.762 21.324a1.746 1.746 0 0 0 2.468 0L35.738 6.816a1.74 1.74 0 0 0 0-2.468 1.74 1.74 0 0 0-2.468 0L18.762 18.855a1.74 1.74 0 0 0 0 2.47M9.07 36.25h21.852a5.234 5.234 0 0 0 5.23-5.234V18.344a1.745 1.745 0 1 0-3.492 0v12.672a1.74 1.74 0 0 1-1.738 1.738H9.07a1.74 1.74 0 0 1-1.738-1.738V9.16A1.74 1.74 0 0 1 9.07 7.422h12.672a1.745 1.745 0 1 0 0-3.492H9.07a5.24 5.24 0 0 0-5.234 5.234v21.852A5.24 5.24 0 0 0 9.07 36.25"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Edit3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
