<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M20.012 20.168c-4.875 0-8.84-3.965-8.84-8.84s3.965-8.84 8.84-8.84 8.84 3.969 8.84 8.84-3.97 8.84-8.84 8.84m0-13.895a5.06 5.06 0 0 0-5.055 5.055 5.063 5.063 0 0 0 5.055 5.055 5.06 5.06 0 0 0 5.054-5.055 5.06 5.06 0 0 0-5.054-5.055m8.953 31.215h-17.91a5.37 5.37 0 0 1-5.316-6.121l.734-5.176c.375-2.629 2.656-4.613 5.312-4.613h16.438c2.656 0 4.941 1.984 5.312 4.613l.746 5.176a5.37 5.37 0 0 1-5.316 6.121m-19.477-5.59a1.57 1.57 0 0 0 .371 1.262c.176.203.567.547 1.196.547h17.91c.629 0 1.02-.34 1.195-.547.176-.203.461-.64.371-1.262l-.734-5.175a1.59 1.59 0 0 0-1.567-1.36H11.793c-.785 0-1.457.586-1.566 1.36z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90User8' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
