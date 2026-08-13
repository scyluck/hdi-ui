<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path d="M35.594 4.46a1.77 1.77 0 0 0-1.563-.272l-1.168.351a16.44 16.44 0 0 1-9.734-.055l-.297-.093a19.9 19.9 0 0 0-8.96-.711l-4.24.633v-.04a1.766 1.766 0 0 0-3.53 0v29.711h-.618a1.766 1.766 0 0 0 0 3.532H16.72a1.766 1.766 0 0 0 0-3.532H9.633v-8.851l3.199-.817a16.5 16.5 0 0 1 9.195.305 20.1 20.1 0 0 0 6.219.992c2.066 0 4.137-.324 6.149-.968l.687-.223a1.76 1.76 0 0 0 1.223-1.68V5.882c0-.562-.262-1.085-.711-1.421m-2.82 16.985a16.46 16.46 0 0 1-9.653-.183 20.05 20.05 0 0 0-11.164-.367l-2.324.59v-13.6l4.758-.711a16.4 16.4 0 0 1 7.379.586l.296.093a20 20 0 0 0 10.707.372z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90Flag2' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
