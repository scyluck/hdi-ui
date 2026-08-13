<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M26.484 18.59a1.565 1.565 0 0 1 2.211 0 1.57 1.57 0 0 1 0 2.215l-7.554 7.554a1.56 1.56 0 0 1-1.106.457c-.433 0-.824-.175-1.105-.457l-7.559-7.558a1.566 1.566 0 0 1 0-2.211 1.565 1.565 0 0 1 2.211 0l4.89 4.894V4.144a1.562 1.562 0 1 1 3.126 0V23.48zM7.25 37.453h25.547a4.696 4.696 0 0 0 4.691-4.683v-4.926a4.69 4.69 0 0 0-4.687-4.688h-1.828a1.562 1.562 0 1 0 0 3.125H32.8c.863 0 1.562.7 1.562 1.563v4.926c0 .863-.699 1.562-1.562 1.562H7.25c-.863 0-1.562-.7-1.562-1.562v-4.926c0-.864.699-1.563 1.562-1.563h1.863a1.562 1.562 0 1 0 0-3.125H7.25a4.69 4.69 0 0 0-4.687 4.688v4.922a4.69 4.69 0 0 0 4.687 4.687"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Download2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
