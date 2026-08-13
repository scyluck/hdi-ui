<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M2.5 20.016c0-9.664 7.836-17.5 17.5-17.5s17.5 7.836 17.5 17.5-7.836 17.5-17.5 17.5-17.5-7.836-17.5-17.5m2.344 0c0 8.37 6.785 15.156 15.156 15.156 8.367 0 15.156-6.785 15.156-15.156S28.371 4.859 20 4.859 4.844 11.645 4.844 20.016m20.8.832-6.628 6.629a1.17 1.17 0 0 1-1.657-.004l-.02-.02a1.17 1.17 0 0 1 0-1.656l5.782-5.781-5.781-5.782a1.17 1.17 0 0 1 0-1.656l.02-.02a1.17 1.17 0 0 1 1.656 0l6.629 6.633c.457.457.457 1.2 0 1.657"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Right' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
