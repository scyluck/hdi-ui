<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M12.215 12.957h15.773q.06 0 .118-.004h2.902c.965 0 1.75.785 1.75 1.75V32.22c0 .965-.785 1.75-1.75 1.75H9.195c-.965 0-1.75-.785-1.75-1.75V14.707c0-.965.785-1.75 1.75-1.75v-.004h2.902q.058.004.118.004m-1.75-3.5v-1.73a5.24 5.24 0 0 1 5.234-5.235h8.805a5.24 5.24 0 0 1 5.234 5.235v1.73h1.27a5.25 5.25 0 0 1 5.246 5.246v17.512a5.256 5.256 0 0 1-5.25 5.246H9.195a5.25 5.25 0 0 1-5.246-5.246V14.703a5.25 5.25 0 0 1 5.246-5.246zm3.5 0h12.273v-1.73a1.74 1.74 0 0 0-1.734-1.739h-8.805c-.957 0-1.734.778-1.734 1.739zm6.058 20.504a1.75 1.75 0 0 1-1.75-1.75v-3.004H15.27a1.75 1.75 0 1 1 0-3.5h3.003v-3a1.75 1.75 0 1 1 3.5 0v3h3.004a1.75 1.75 0 1 1 0 3.5h-3.004v3.008c0 .965-.785 1.746-1.75 1.746"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Medical' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
