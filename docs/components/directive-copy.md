# v-copy 一键复制

点击元素时把指定文本复制到剪贴板，自动适配安全上下文（`navigator.clipboard`）与非安全上下文（`execCommand` 回退）。

## 用法

```vue
<template>
  <!-- 1. 字符串：复制固定文本 -->
  <el-button v-copy="'Hello World'">复制固定文本</el-button>

  <!-- 2. 函数：动态返回要复制的文本 -->
  <el-button v-copy="() => formRef.value?.name">复制表单值</el-button>

  <!-- 3. 对象：配置成功/失败回调 -->
  <el-button
    v-copy="{
      text: () => currentRow.url,
      success: (text) => ElMessage.success(`已复制：${text}`),
      error: (err) => ElMessage.error(`复制失败：${err.message}`),
    }"
  >
    复制并提示
  </el-button>

  <!-- 4. 无值：复制元素自身的 textContent -->
  <span class="copyable" v-copy>这段文字可点击复制</span>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const currentRow = ref({ url: 'https://example.com' })
</script>
```

## 值类型

| 类型 | 说明 |
|------|------|
| `string` | 复制固定文本 |
| `() => string` | 点击时动态计算要复制的文本 |
| `{ text?, success?, error? }` | 对象形式，可配置文本与回调 |
| 不传 | 复制元素的 `textContent` |

回调签名：
- `success?: (text: string) => void`
- `error?: (err: Error) => void`
