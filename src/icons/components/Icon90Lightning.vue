<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M11.938 37.426a1.44 1.44 0 0 1-1.387-1.832l3.293-11.805-7.2.055a1.41 1.41 0 0 1-1.207-.633 1.45 1.45 0 0 1-.14-1.356l7.57-18.53a1.445 1.445 0 0 1 1.336-.9h14.149a1.447 1.447 0 0 1 1.343 1.977L25.102 15.98h8.23c.797 0 1.445.649 1.441 1.446 0 .418-.183.816-.496 1.09l-21.39 18.558a1.44 1.44 0 0 1-.946.356zm3.808-16.54a1.44 1.44 0 0 1 1.387 1.833l-2.52 9.027 14.844-12.879h-6.488a1.446 1.446 0 0 1-1.344-1.976l4.594-11.578H15.164L8.777 20.94l6.95-.054.011.004z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Lightning' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
