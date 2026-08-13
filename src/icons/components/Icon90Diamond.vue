<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M18.637 35.719a1.75 1.75 0 0 0 1.68.583 1.75 1.75 0 0 0 .995-.583l15.75-18.555c.314-.371.453-.847.405-1.313a1.74 1.74 0 0 0-.337-.898l-5.599-10.09A1.75 1.75 0 0 0 30 3.961H10.91a1.75 1.75 0 0 0-1.5.845L2.8 14.975a1.74 1.74 0 0 0 .116 2.18zM8 17.742l10.223 12.07v-12.07zm-.55-3.5h8.644L11.118 8.6zm7.332-6.777 5.254 5.958 5.808-5.958zM29.606 8.62l-5.481 5.622h8.604zm2.378 9.122H21.723v12.085z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Diamond' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
