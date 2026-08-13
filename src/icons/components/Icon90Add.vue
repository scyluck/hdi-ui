<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.09 36.168h21.84a5.22 5.22 0 0 0 5.218-5.215V9.051a5.223 5.223 0 0 0-5.218-5.219H9.09a5.223 5.223 0 0 0-5.22 5.219v21.902a5.22 5.22 0 0 0 5.219 5.215M7.367 9.05c0-.95.774-1.723 1.723-1.723h21.84c.949 0 1.722.774 1.722 1.723v21.902c0 .95-.773 1.723-1.722 1.723H9.09c-.95 0-1.723-.774-1.723-1.723zm12.719 18.722a1.745 1.745 0 0 1-1.746-1.746V21.5h-4.527a1.745 1.745 0 1 1 0-3.492h4.527v-4.531a1.745 1.745 0 1 1 3.492 0v4.53h4.531a1.745 1.745 0 1 1 0 3.493h-4.531v4.527a1.743 1.743 0 0 1-1.746 1.746"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Add' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
