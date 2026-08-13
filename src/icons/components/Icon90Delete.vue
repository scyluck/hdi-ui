<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M13.598 14.031h15.578v17.262c0 .809-.73 1.465-1.625 1.465H12.453c-.894 0-1.625-.656-1.625-1.465V14.031zm0-3.515V9.074a5.326 5.326 0 0 1 5.32-5.32h2.16a5.326 5.326 0 0 1 5.32 5.32v1.442h8.016a1.758 1.758 0 0 1 0 3.516h-1.723v17.261c0 2.746-2.308 4.98-5.14 4.98H12.453c-2.836 0-5.14-2.234-5.14-4.98V14.031H5.586a1.755 1.755 0 0 1-1.758-1.758c0-.972.785-1.757 1.758-1.757zm3.511 0V9.078c0-1 .813-1.808 1.809-1.808h2.16c.996 0 1.809.812 1.809 1.808v1.438zm-2.96 16.496c0 .972.785 1.758 1.757 1.758.973 0 1.758-.786 1.758-1.754V20.52c0-.973-.785-1.758-1.758-1.758-.972 0-1.758.785-1.758 1.758zm8.187 0a1.757 1.757 0 0 0 3.516.004V20.52c0-.973-.786-1.758-1.758-1.758-.973 0-1.758.785-1.758 1.758z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Delete' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
