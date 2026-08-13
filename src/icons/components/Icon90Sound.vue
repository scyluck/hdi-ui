<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M12 20.004c0 4.434 3.605 8.039 8.04 8.039 4.433 0 8.038-3.605 8.038-8.04v-9.37c0-4.434-3.605-8.04-8.039-8.04S12 6.2 12 10.634zm3.492-9.371a4.55 4.55 0 0 1 4.547-4.547 4.55 4.55 0 0 1 4.547 4.547v9.371a4.55 4.55 0 0 1-4.547 4.547 4.55 4.55 0 0 1-4.547-4.547zm2.875 22.078c-6.248-.82-11.086-6.18-11.086-12.648a1.745 1.745 0 1 1 3.492 0c0 5.109 4.157 9.27 9.27 9.27s9.27-4.157 9.27-9.27a1.745 1.745 0 1 1 3.492 0c-.007 6.417-4.77 11.742-10.946 12.628v1.317h3.235a1.745 1.745 0 1 1 0 3.492h-9.961a1.745 1.745 0 1 1 0-3.492h3.234z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Sound' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
