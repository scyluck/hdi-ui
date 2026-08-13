<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M19.05 27.355c.282.176.602.262.923.262.32 0 .64-.086.922-.262l7.488-4.63v6.584c0 1.468-1.32 2.664-2.942 2.664H14.508c-1.621 0-2.942-1.196-2.942-2.664v-6.583zM8.067 20.562l-4.773-2.953a1.746 1.746 0 0 1 0-2.976l15.762-9.75a1.76 1.76 0 0 1 1.843 0l15.762 9.746a1.76 1.76 0 0 1 .824 1.653v13.347a1.747 1.747 0 0 1-1.75 1.75 1.75 1.75 0 0 1-1.75-1.75V19.26l-2.101 1.3v8.749c0 3.398-2.89 6.164-6.442 6.164H14.508c-3.555 0-6.442-2.766-6.442-6.168zm11.907 3.247L7.543 16.12l12.43-7.687 12.43 7.687z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Student' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
