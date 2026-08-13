<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M22.852 36.637a3.4 3.4 0 0 0 3.21.652 3.41 3.41 0 0 0 2.282-2.348l7.86-28.14a3.34 3.34 0 0 0-1.126-3.535 3.34 3.34 0 0 0-3.687-.383L5.766 16.09a3.417 3.417 0 0 0-.633 5.652l4.187 3.52a1.747 1.747 0 1 0 2.246-2.676L7.465 19.14 28.67 8.209 13.36 26.57a1.74 1.74 0 0 0-.407 1.118v8.007c0 .965.781 1.746 1.746 1.746s1.75-.785 1.75-1.75v-4.434zm-5.606-9.273L31.651 10.09l-6.643 23.797z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Paperplane2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
