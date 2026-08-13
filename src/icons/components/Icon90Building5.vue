<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M35.129 32.8h.004a1.68 1.68 0 0 1-.004 3.36H4.863a1.68 1.68 0 1 1 0-3.36h.582V19.685a5.03 5.03 0 0 1 2.801-4.524l7.32-3.648V8.898c0-1.613.743-3.093 2.04-4.054a5.01 5.01 0 0 1 4.472-.785l8.7 2.617a5.025 5.025 0 0 1 3.597 4.84V32.8zm-16.195-.003h12.082V11.512a1.68 1.68 0 0 0-1.204-1.621l-8.699-2.618a1.67 1.67 0 0 0-1.496.262c-.433.324-.683.82-.683 1.36zm3.835-19.844h4.403a1.68 1.68 0 1 1 0 3.36h-4.403a1.68 1.68 0 1 1 0-3.36M9.75 18.168c-.578.29-.937.871-.937 1.516V32.8h6.757V15.266zm13.02 1.73h4.402a1.68 1.68 0 1 1 0 3.36h-4.403a1.68 1.68 0 1 1 0-3.36m0 6.696h4.402a1.68 1.68 0 1 1 0 3.36h-4.403a1.68 1.68 0 1 1 0-3.36"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Building5' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
