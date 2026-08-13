<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M12.54 34.09c1.401 1.406 3.132 2.133 4.726 2.133 1.191 0 2.304-.407 3.14-1.246L34.672 20.71c.754-.754 1.191-1.805 1.234-2.957l.34-9.52c.04-1.097-.441-2.23-1.32-3.109-.88-.879-2.012-1.36-3.11-1.32l-9.52.34c-1.152.043-2.202.48-2.956 1.234L5.074 19.645c-1.957 1.957-1.566 5.414.887 7.867zM31.933 7.043h.011c.157 0 .434.113.692.371.261.262.375.55.37.703l-.339 9.52c-.008.234-.063.558-.285.781L18.117 32.684c-.562.566-2.09.308-3.285-.887l-6.578-6.578C7.059 24.027 6.8 22.5 7.367 21.934L21.633 7.668c.222-.219.547-.277.781-.285zm-5.68 6.941a1.8 1.8 0 1 1 2.547-2.546 1.8 1.8 0 0 1-2.547 2.546"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Tag' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
