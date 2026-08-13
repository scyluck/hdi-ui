<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M3.828 20c0 8.918 7.254 16.172 16.172 16.172h.004c8.918 0 16.172-7.254 16.172-16.172v-8.96c0-.981-.793-1.774-1.774-1.774-.98 0-1.773.793-1.773 1.773v8.965c0 6.965-5.664 12.629-12.629 12.629S7.371 26.969 7.371 20.003C7.371 13.04 13.04 7.376 20 7.376h14.398a1.772 1.772 0 1 0 0-3.547H20C11.082 3.828 3.828 11.082 3.828 20m8.742-2.32c0 .98.793 1.773 1.774 1.773.98 0 1.773-.793 1.773-1.773v-1.82a1.772 1.772 0 1 0-3.547 0zm11.801 0c0 .98.793 1.773 1.774 1.773.98 0 1.773-.793 1.773-1.773v-1.82a1.772 1.772 0 1 0-3.547 0z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Mine4' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
