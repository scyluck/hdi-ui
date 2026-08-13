<template>
  <IconBase :size="size" :color="color" view-box="0 0 40 40" v-bind="$attrs">
    <path fill-rule="evenodd" d="M27.875 31.281a4.77 4.77 0 0 0 4.762 4.762 4.764 4.764 0 0 0 4.761-4.766V13.824c0-.37-.117-.73-.335-1.031l-6.024-8.238a1.749 1.749 0 1 0-2.824 2.066l3.312 4.533v3.698a1.752 1.752 0 0 0 2.371 1.636V31.28c0 .696-.566 1.262-1.261 1.262a1.264 1.264 0 0 1-1.262-1.262v-8.355a4.77 4.77 0 0 0-4.762-4.762h-1.261V9.121A5.287 5.287 0 0 0 20.07 3.84H7.68a5.287 5.287 0 0 0-5.282 5.28v25.172c0 .965.786 1.75 1.75 1.75h19.454a1.75 1.75 0 0 0 1.75-1.75V21.664h1.261c.696 0 1.262.566 1.262 1.262zm-6.023-11.367v-3.312H9.488c-.965 0-1.75-.786-1.75-1.75 0-.965.785-1.75 1.75-1.75h12.364v-3.98c0-.985-.801-1.782-1.782-1.782H7.68c-.985 0-1.782.8-1.782 1.781v23.422h15.954z"/>
  </IconBase>
</template>

<script setup lang="ts">
import IconBase from '../../components/Icon/IconBase.vue'
import type { IconProps } from '../../components/Icon/types'

defineOptions({ name: 'Icon90PetrolPump' })

withDefaults(defineProps<IconProps>(), {
  size: 16,
})
</script>
