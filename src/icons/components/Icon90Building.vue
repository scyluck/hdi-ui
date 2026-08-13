<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M34.422 33.809H32.93V17.914h1.492a1.75 1.75 0 0 0 1.736-1.534 1.74 1.74 0 0 0-.096-.83L31.684 3.829a1.75 1.75 0 0 0-1.641-1.137H9.957a1.75 1.75 0 0 0-1.64 1.137l-4.38 11.727a1.75 1.75 0 0 0 .83 2.163c.25.131.528.2.811.2h1.75v15.89h-1.75a1.75 1.75 0 1 0 0 3.5h28.844a1.75 1.75 0 1 0 0-3.5M11.172 6.19h17.656l3.07 8.223H8.102zm-.34 11.723H29.43V33.81h-3.625v-5.19A5.81 5.81 0 0 0 20 22.816a5.81 5.81 0 0 0-5.805 5.805v5.188h-3.367V17.914zm6.867 15.895V28.62a2.301 2.301 0 0 1 4.601 0v5.188z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Building' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
