<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M28.5 22a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13m-3.423 4.633h5.46L29.26 25.33a.594.594 0 0 1 0-.828.566.566 0 0 1 .811 0l2.257 2.304c.361.369.105 1-.406 1h-6.845a.586.586 0 0 1 0-1.172m6.846 3.734h-5.46l1.278 1.304a.594.594 0 0 1 0 .829.565.565 0 0 1-.812 0l-2.257-2.304c-.361-.37-.105-1 .406-1h6.845a.586.586 0 0 1 0 1.171"/><path fill-rule="evenodd" d="M7.234 5h23.533C32 5 33 5.99 33 7.21v14.616a7.8 7.8 0 0 0-2.94-1.092 9 9 0 0 0-1.344-.114c-1.657.005-3.326.503-4.677 1.46a8.3 8.3 0 0 0-3.008 3.906c-1.145 3.1-.135 6.775 2.44 8.872l.18.142H7.234C6 35 5 34.01 5 32.79V7.21C5 5.99 6 5 7.234 5m3.234 5.912a1.25 1.25 0 1 0 0 2.5h17.064a1.25 1.25 0 1 0 0-2.5zm0 6.999a1.25 1.25 0 0 0 0 2.5h12.456a1.25 1.25 0 1 0 0-2.5zm0 6.998a1.25 1.25 0 1 0 0 2.5h7.282a1.25 1.25 0 1 0 0-2.5z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'IconCustomChange2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
