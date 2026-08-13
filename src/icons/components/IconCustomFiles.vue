<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path d="M27.5 3.053 14.643 3c-2.25 0-4.286 2.072-4.286 4.25l-1.232.053C6.875 7.303 5 9.322 5 11.5v21.25C5 34.928 7.036 37 9.286 37h16.071c2.25 0 4.286-2.072 4.286-4.25h1.071c2.25 0 4.286-2.072 4.286-4.25v-17zm-2.143 31.822H9.286c-1.125 0-2.143-1.062-2.143-2.125V11.5c0-1.594 1.286-2.125 3.214-2.125V28.5c0 2.178 2.036 4.25 4.286 4.25H27.5c0 1.275-.857 2.125-2.143 2.125m2.143-9.562h-9.643a1.07 1.07 0 0 1-1.071-1.063 1.07 1.07 0 0 1 1.071-1.062H27.5c.59 0 1.071.478 1.071 1.062a1.07 1.07 0 0 1-1.071 1.063m0-5.313h-9.643a1.07 1.07 0 0 1-1.071-1.062 1.07 1.07 0 0 1 1.071-1.063H27.5c.59 0 1.071.478 1.071 1.063A1.07 1.07 0 0 1 27.5 20m2.143-8.5c-1.125 0-2.143-1.01-2.143-2.125V5.178l5.357 6.322z"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomFiles' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
