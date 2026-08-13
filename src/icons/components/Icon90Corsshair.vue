<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.496 11.18a1.622 1.622 0 1 0 3.242-.004v-1.068a10.1 10.1 0 0 1 8.292 8.318h-1.042a1.622 1.622 0 0 0 0 3.242h1.042a10.1 10.1 0 0 1-8.292 8.318v-1.068a1.622 1.622 0 0 0-3.242 0v1.078a10.1 10.1 0 0 1-8.354-8.328h1.108a1.622 1.622 0 0 0 0-3.242h-1.108a10.1 10.1 0 0 1 8.354-8.328zm3.242-4.348V5.457a1.622 1.622 0 0 0-3.242 0v1.368c-6.065.724-10.89 5.54-11.628 11.6h-1.34a1.622 1.622 0 0 0 0 3.243h1.34c.738 6.06 5.563 10.876 11.628 11.6v1.369a1.622 1.622 0 0 0 3.242.004v-1.38c6.036-.75 10.83-5.553 11.566-11.593h1.403c.898 0 1.621-.727 1.625-1.621 0-.895-.727-1.621-1.621-1.621h-1.407c-.736-6.04-5.53-10.844-11.566-11.594"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Corsshair' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
