<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M12.45 16.106h17.726v-.004a5.213 5.213 0 0 1 5.207 5.207v10.976a5.213 5.213 0 0 1-5.207 5.207H9.828a5.213 5.213 0 0 1-5.207-5.207V21.313a5.21 5.21 0 0 1 4.328-5.13v-2.62C8.95 7.469 13.906 2.512 20 2.512c4.453 0 8.45 2.648 10.184 6.75a1.75 1.75 0 1 1-3.223 1.363A7.55 7.55 0 0 0 20 6.012c-4.164 0-7.55 3.386-7.55 7.55zm17.726 17.886c.941 0 1.707-.765 1.707-1.707V21.31c0-.942-.766-1.707-1.707-1.707H9.828c-.941 0-1.707.765-1.707 1.707v10.976c0 .942.766 1.707 1.707 1.707zM18.25 25.727c0-.965.785-1.75 1.75-1.75s1.75.785 1.75 1.75v2.863c0 .965-.785 1.75-1.75 1.75s-1.75-.785-1.75-1.75z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Lock' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
