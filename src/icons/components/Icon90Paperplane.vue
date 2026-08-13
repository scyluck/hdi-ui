<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M22.734 36.687a3.4 3.4 0 0 0 2.196.805h.004c.34 0 .68-.055 1.015-.156a3.41 3.41 0 0 0 2.285-2.348l7.86-28.172a3.34 3.34 0 0 0-1.125-3.539 3.34 3.34 0 0 0-3.692-.382L5.63 16.117a3.42 3.42 0 0 0-1.832 2.66 3.39 3.39 0 0 0 1.168 2.973l4.644 4.094-.097 9.547a1.75 1.75 0 0 0 .98 1.59 1.75 1.75 0 0 0 1.856-.208l5.379-4.293zm-3.851-7.808a1.74 1.74 0 0 0-1.125-.41l-.004.004c-.396 0-.78.135-1.09.382l-3.625 2.891.07-6.668a1.75 1.75 0 0 0-.593-1.328l-5.188-4.574L32.66 6.117l-7.765 27.817zm-2.137-6.164c.344.34.79.512 1.238.512h.004a1.73 1.73 0 0 0 1.235-.512l6.539-6.543a1.747 1.747 0 0 0 0-2.473 1.747 1.747 0 0 0-2.473 0l-6.543 6.543a1.747 1.747 0 0 0 0 2.473"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Paperplane' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
