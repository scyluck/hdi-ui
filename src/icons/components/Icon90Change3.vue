<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M7.203 18.023a1.62 1.62 0 0 0 1.766.348c.605-.25 1-.84 1-1.496v-1.276l24.66.01a1.622 1.622 0 0 0 0-3.242l-24.66-.01v-1.279a1.621 1.621 0 0 0-2.766-1.144l-2.898 2.898a1.62 1.62 0 0 0 0 2.293zm23.906 12.45a1.62 1.62 0 0 0 1.766-.348l2.898-2.898a1.62 1.62 0 0 0 0-2.293l-2.898-2.899a1.62 1.62 0 0 0-2.766 1.145v1.276l-24.66-.01a1.622 1.622 0 0 0 0 3.242l24.66.01v1.279c0 .652.395 1.246 1 1.496"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Change3' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
