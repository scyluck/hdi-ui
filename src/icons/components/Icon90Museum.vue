<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M34.047 28.082V15.863h1.687c.79 0 1.48-.53 1.684-1.289a1.75 1.75 0 0 0-.805-1.965L21.086 3.56a1.75 1.75 0 0 0-1.742-.008L3.473 12.6a1.743 1.743 0 0 0 .863 3.262h1.789v12.22H6a3.49 3.49 0 0 0-3.484 3.483V33.2A3.49 3.49 0 0 0 6 36.684h27.996a3.49 3.49 0 0 0 3.484-3.485v-1.633a3.487 3.487 0 0 0-3.433-3.484m-3.492 0h-2.617V15.863h2.617zM18.34 15.863v12.22h-2.617v-12.22zm3.492 0h2.617v12.22h-2.617zm-1.637-8.781 9.078 5.29H10.922l9.277-5.29zM9.617 15.863h2.617v12.22H9.617zM6.007 33.2 6 31.574l27.988-.008.008 1.625z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Museum' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
