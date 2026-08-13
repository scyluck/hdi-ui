<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M23.352 2.46a3.56 3.56 0 0 1 3.539 3.22h.675a7.105 7.105 0 0 1 7.098 7.097v17.508a7.105 7.105 0 0 1-7.098 7.098H12.512a7.105 7.105 0 0 1-7.098-7.098V12.777a7.105 7.105 0 0 1 7.098-7.097h.672a3.557 3.557 0 0 1 3.535-3.22zm-6.63 6.02V6.441c0-.276.232-.488.508-.488h5.68c.276 0 .508.223.508.5v2.051c0 .277-.23.491-.508.49l-5.68-.023a.5.5 0 0 1-.507-.49m6.669 4.008h-6.704a3.523 3.523 0 0 1-3.513-3.316h-.662v-.004a3.61 3.61 0 0 0-3.606 3.605v17.508a3.61 3.61 0 0 0 3.606 3.606h15.054a3.61 3.61 0 0 0 3.606-3.606V12.777a3.61 3.61 0 0 0-3.606-3.605h-.665a3.517 3.517 0 0 1-3.51 3.316m3.382 8.32H13.305a1.745 1.745 0 1 1 0-3.492h13.472a1.745 1.745 0 1 1-.004 3.493m-6.035 7.962h-7.433a1.745 1.745 0 1 1 0-3.493h7.437a1.745 1.745 0 1 1-.004 3.493"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Order' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
