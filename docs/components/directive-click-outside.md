# v-click-outside 点击外部

点击元素外部时触发回调。

## 用法

```vue
<template>
  <div ref="panelRef" v-click-outside="handleClickOutside">
    点击我外面会触发回调
  </div>
</template>

<script setup lang="ts">
const handleClickOutside = (event: MouseEvent) => {
  console.log('点击了元素外部', event.target)
}
</script>
```
