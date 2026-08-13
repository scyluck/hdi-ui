<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <g clip-path="url(#a)"><path fill-rule="evenodd" d="M25.121 4.852H14.965a1.17 1.17 0 0 1-1.172-1.172 1.17 1.17 0 0 1 1.172-1.172H25.12a1.173 1.173 0 0 1 0 2.344M4.911 7.859h30.265a1.17 1.17 0 0 1 1.172 1.172 1.17 1.17 0 0 1-1.172 1.172h-3.39v23.723a3.52 3.52 0 0 1-3.517 3.515H11.816a3.52 3.52 0 0 1-3.515-3.515V10.203H4.91a1.17 1.17 0 0 1-1.173-1.172A1.17 1.17 0 0 1 4.91 7.86m23.358 27.239c.645 0 1.172-.528 1.172-1.172V10.203H10.645v23.723c0 .644.527 1.172 1.171 1.172zm-13.007-6.75v-11.4a1.17 1.17 0 0 1 1.172-1.172 1.17 1.17 0 0 1 1.171 1.172v11.399a1.173 1.173 0 0 1-2.344 0m7.218 0V16.949a1.17 1.17 0 0 1 1.172-1.172 1.17 1.17 0 0 1 1.172 1.172v11.399a1.173 1.173 0 0 1-2.344 0"/></g>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon60Delete' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
