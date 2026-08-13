<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.938 37.191a1.75 1.75 0 0 0 2.07 0c.55-.402 13.5-10.015 13.5-20.16 0-8.015-6.52-14.535-14.535-14.535S5.438 9.016 5.438 17.031c0 10.145 12.949 19.754 13.5 20.16M8.94 17.031C8.941 10.95 13.891 6 19.973 6s11.03 4.945 11.03 11.031c0 6.895-8.105 14.133-11.03 16.52C17.047 31.164 8.94 23.926 8.94 17.03m4.168 0a6.87 6.87 0 0 0 6.864 6.863c3.785 0 6.867-3.078 6.867-6.863s-3.082-6.863-6.867-6.863a6.87 6.87 0 0 0-6.864 6.863m3.5 0a3.366 3.366 0 0 1 3.364-3.363 3.366 3.366 0 0 1 3.363 3.363 3.366 3.366 0 0 1-3.363 3.363 3.366 3.366 0 0 1-3.364-3.363"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Location2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
