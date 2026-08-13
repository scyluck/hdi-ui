<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="m30.824 15.922-.008-7.176c0-.781-.632-1.414-1.414-1.414H10.48c-.75 0-1.355.61-1.355 1.355v3.368a1.745 1.745 0 1 1-3.492 0V8.687a4.856 4.856 0 0 1 4.851-4.851h18.918a4.92 4.92 0 0 1 4.91 4.906l.008 7.18h1.383a1.745 1.745 0 0 1 1.235 2.98l-3.125 3.125a1.76 1.76 0 0 1-1.239.512 1.74 1.74 0 0 1-1.234-.512l-3.125-3.125a1.746 1.746 0 0 1 1.234-2.98zm-21.7 7.21h1.38a1.745 1.745 0 0 0 1.234-2.98l-3.125-3.125a1.747 1.747 0 0 0-2.472 0l-3.125 3.125a1.746 1.746 0 0 0 1.234 2.98h1.382l.009 8.15a4.916 4.916 0 0 0 4.91 4.906h18.918a4.845 4.845 0 0 0 4.844-4.852v-4.098a1.746 1.746 0 1 0-3.493 0v4.098c0 .746-.61 1.355-1.355 1.355H10.547a1.416 1.416 0 0 1-1.414-1.414z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Refresh' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
