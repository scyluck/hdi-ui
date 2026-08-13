<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M17.375 36.816a5.27 5.27 0 0 0 5.25 0l10.598-6.12a5.26 5.26 0 0 0 2.625-4.544V13.91a5.26 5.26 0 0 0-2.625-4.543L22.62 3.247a5.26 5.26 0 0 0-5.246 0L6.777 9.366a5.26 5.26 0 0 0-2.625 4.543v12.242a5.26 5.26 0 0 0 2.625 4.543zm1.754-30.535a1.74 1.74 0 0 1 1.742 0l10.602 6.121c.539.309.87.887.87 1.508v12.242c0 .621-.331 1.2-.87 1.508L20.87 33.781a1.76 1.76 0 0 1-1.742 0l-10.602-6.12a1.74 1.74 0 0 1-.87-1.509V13.91c0-.62.331-1.2.87-1.508zm-8.547 10.336 7.664 4.431v8.675a1.754 1.754 0 0 0 3.508.004v-8.594l7.5-4.383a1.754 1.754 0 0 0-1.77-3.027l-7.41 4.332-7.738-4.473a1.75 1.75 0 0 0-2.395.64c-.484.84-.199 1.91.641 2.395"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Function' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
