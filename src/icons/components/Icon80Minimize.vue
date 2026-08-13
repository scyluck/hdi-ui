<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M2.543 19.977a1.562 1.562 0 1 0 3.125 0V7.203c0-.863.7-1.562 1.562-1.562h12.887a1.562 1.562 0 1 0 0-3.125H7.23a4.69 4.69 0 0 0-4.687 4.687zM37.027 2.984a1.566 1.566 0 0 0-2.21 0l-7.93 7.93V7.078a1.562 1.562 0 1 0-3.125 0v7.61a1.56 1.56 0 0 0 1.562 1.562h7.61a1.562 1.562 0 1 0 0-3.125h-3.836l7.93-7.93a1.565 1.565 0 0 0 0-2.21m-17.054 34.52H33.63a3.907 3.907 0 0 0 3.902-3.906V20.094a1.562 1.562 0 1 0-3.125 0v13.504c0 .43-.351.78-.781.78H19.973a1.562 1.562 0 1 0 0 3.126m-5.207-13.785c.402 0 .8.152 1.105.457.309.304.461.707.461 1.105v7.61a1.562 1.562 0 1 1-3.125 0v-3.836L5.22 37.043a1.56 1.56 0 0 1-1.106.457c-.402 0-.8-.152-1.105-.457a1.565 1.565 0 0 1 0-2.211l7.984-7.988H7.156a1.562 1.562 0 1 1 0-3.125z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Minimize' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
