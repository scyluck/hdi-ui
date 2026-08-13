<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M34.52 8.035a11.09 11.09 0 0 0-11.508-2.793 9.3 9.3 0 0 1-6.02 0A11.09 11.09 0 0 0 5.484 8.035c-4.148 4.3-3.984 11.34.364 15.684l9.828 9.828a6.08 6.08 0 0 0 4.328 1.793 6.08 6.08 0 0 0 4.328-1.793l9.832-9.832c4.348-4.344 4.504-11.38.36-15.68zm-2.84 13.203-9.832 9.832a2.58 2.58 0 0 1-1.848.766c-.7 0-1.356-.274-1.848-.766L8.32 21.242c-3.004-3.004-3.144-7.836-.316-10.773a7.57 7.57 0 0 1 7.855-1.906c2.707.917 5.57.917 8.278 0a7.57 7.57 0 0 1 7.855 1.91c2.828 2.933 2.688 7.765-.312 10.765m-7.344-3.867h-2.582V14.79a1.754 1.754 0 1 0-3.508 0v2.582h-2.582a1.754 1.754 0 1 0 0 3.508h2.582v2.582a1.754 1.754 0 1 0 3.508 0V20.88h2.582a1.754 1.754 0 1 0 0-3.508"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Healthy' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
