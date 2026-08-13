<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M17.95 2.8a3.9 3.9 0 0 1 3.905 0l11.78 6.801a3.9 3.9 0 0 1 1.953 3.383v13.602a3.9 3.9 0 0 1-1.953 3.383l-11.78 6.801a3.9 3.9 0 0 1-3.906 0l-11.78-6.8a3.9 3.9 0 0 1-1.953-3.384V12.984c0-1.396.745-2.685 1.953-3.383zm2.343 2.706a.78.78 0 0 0-.781 0l-11.78 6.801a.78.78 0 0 0-.39.677v13.602c0 .28.148.537.39.677l11.78 6.801c.241.14.54.14.781 0l11.78-6.801a.78.78 0 0 0 .39-.677V12.984a.78.78 0 0 0-.39-.677zm-.371 3.322c.863 0 1.562.7 1.562 1.563v8.473l7.338 4.236a1.562 1.562 0 1 1-1.562 2.706l-7.338-4.236-7.338 4.236a1.562 1.562 0 1 1-1.562-2.706l7.337-4.236V10.39c0-.863.7-1.563 1.563-1.563"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon80Function' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
