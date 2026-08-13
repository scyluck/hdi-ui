<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.488 35.129H30.59c3.816 0 6.926-3.11 6.922-6.926V11.82c0-3.82-3.11-6.925-6.926-6.925H9.488c-3.82 0-6.925 3.109-6.925 6.925v16.383c0 3.82 3.109 6.926 6.925 6.926M6.058 11.82c0-1.89 1.54-3.43 3.43-3.43h21.098c1.89 0 3.43 1.54 3.43 3.43v16.383c0 1.89-1.54 3.43-3.43 3.43H9.488c-1.89 0-3.43-1.54-3.43-3.43zm11.184 10.785a5.04 5.04 0 0 0 2.797.852c.973 0 1.95-.285 2.797-.852l8.512-6.726a1.746 1.746 0 1 0-2.168-2.738l-8.328 6.593c-.5.305-1.125.305-1.622 0l-8.328-6.593a1.746 1.746 0 1 0-2.168 2.738l8.395 6.644z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Mail' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
