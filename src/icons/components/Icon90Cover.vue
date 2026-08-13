<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M24.813 24.98h6.496a4.87 4.87 0 0 0 4.867-4.867V8.898a4.873 4.873 0 0 0-4.867-4.867H20.063a4.874 4.874 0 0 0-4.872 4.867v6.497H8.695a4.873 4.873 0 0 0-4.867 4.867v11.215a4.875 4.875 0 0 0 4.871 4.87h11.246a4.874 4.874 0 0 0 4.868-4.87zm-4.868-6.09H8.7a1.37 1.37 0 0 0-1.37 1.372v11.215a1.37 1.37 0 0 0 1.37 1.37h11.246a1.37 1.37 0 0 0 1.371-1.37v-8.129l-.003-.118v-2.968c0-.757-.616-1.37-1.368-1.371m0-3.495a4.876 4.876 0 0 1 4.871 4.867v1.222h6.493a1.37 1.37 0 0 0 1.37-1.37V8.897a1.37 1.37 0 0 0-1.37-1.37H20.063a1.37 1.37 0 0 0-1.372 1.37v6.497z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Cover' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
