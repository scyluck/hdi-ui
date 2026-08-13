<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M2.543 20.094a1.562 1.562 0 1 0 3.125 0V7.204c0-.864.7-1.563 1.562-1.563h12.743a1.562 1.562 0 1 0 0-3.125H7.23a4.69 4.69 0 0 0-4.687 4.687zM35.961 2.527c.402 0 .8.153 1.105.457s.457.704.461 1.106v7.605a1.562 1.562 0 1 1-3.125 0V7.86l-7.988 7.989a1.56 1.56 0 0 1-1.105.457c-.403 0-.801-.153-1.106-.457a1.565 1.565 0 0 1 0-2.211l7.985-7.985h-3.836a1.562 1.562 0 1 1 0-3.125zM19.973 37.504h13.656a3.907 3.907 0 0 0 3.902-3.906V19.977a1.562 1.562 0 1 0-3.125 0v13.62c0 .43-.351.782-.781.782H19.973a1.562 1.562 0 1 0 0 3.125m-4.188-13.277a1.566 1.566 0 0 0-2.21 0l-7.93 7.93V28.32a1.562 1.562 0 1 0-3.125 0v7.61a1.56 1.56 0 0 0 1.562 1.562h7.61a1.562 1.562 0 1 0 0-3.125H7.854l7.93-7.93a1.56 1.56 0 0 0 0-2.21"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Fullscreen' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
