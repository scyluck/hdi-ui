<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M9.027 30.738h21.946a5.205 5.205 0 0 0 5.199-5.199V7.934c0-2.868-2.332-5.2-5.2-5.2H9.028a5.205 5.205 0 0 0-5.199 5.2v17.605c0 2.867 2.332 5.2 5.2 5.2M7.281 7.934c0-.965.785-1.747 1.746-1.747h21.946a1.75 1.75 0 0 1 1.746 1.747v17.605a1.75 1.75 0 0 1-1.746 1.746H9.027a1.75 1.75 0 0 1-1.746-1.746zm13.332 13.785h.004a1.73 1.73 0 0 0 1.219-.504l6.512-6.512a1.723 1.723 0 0 0 0-2.441 1.723 1.723 0 0 0-2.442 0l-5.293 5.293-3.195-3.196a1.723 1.723 0 0 0-2.441 0l-3.329 3.328a1.723 1.723 0 0 0 0 2.442 1.723 1.723 0 0 0 2.442 0l2.11-2.11 3.195 3.196c.323.32.763.503 1.218.504M5.648 35.539c0 .953.774 1.727 1.727 1.727h25.254a1.727 1.727 0 0 0 0-3.454H7.375c-.953 0-1.727.774-1.727 1.727"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Date3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
