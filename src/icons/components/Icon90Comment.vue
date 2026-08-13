<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M19.953 36.367h.024a4.82 4.82 0 0 0 3.503-1.496l2.973-3.09h5.906a4.88 4.88 0 0 0 4.875-4.875V8.711a4.88 4.88 0 0 0-4.875-4.875H7.72A4.88 4.88 0 0 0 2.844 8.71v18.2a4.88 4.88 0 0 0 4.875 4.874h5.832l2.887 3.059a4.83 4.83 0 0 0 3.515 1.523M6.281 8.711a1.44 1.44 0 0 1 1.438-1.438h24.64a1.44 1.44 0 0 1 1.438 1.438v18.195a1.44 1.44 0 0 1-1.438 1.438H26.4c-.895 0-1.762.37-2.383 1.015l-3.012 3.133c-.27.281-.637.438-1.027.438h-.008a1.4 1.4 0 0 1-1.031-.446l-2.926-3.101a3.32 3.32 0 0 0-2.407-1.04H7.72a1.44 1.44 0 0 1-1.438-1.437zm5.559 7.191h16.398a1.719 1.719 0 1 0 0-3.437H11.84a1.719 1.719 0 0 0 0 3.437m0 7.856h10.445c.95 0 1.719-.77 1.715-1.719 0-.95-.77-1.719-1.719-1.719H11.84a1.719 1.719 0 0 0 0 3.438"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Comment' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
