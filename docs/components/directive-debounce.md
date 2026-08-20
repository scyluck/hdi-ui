# v-debounce 防抖

将连续多次触发合并为一次执行。常用于搜索框按钮、表单提交、长按等场景。

## 用法

```vue
<template>
  <!-- 1. 默认：300ms 防抖，监听 click，尾部触发 -->
  <el-button v-debounce="handleSubmit">提交</el-button>

  <!-- 2. 通过 arg 指定延迟（ms） -->
  <el-button v-debounce:500="handleSubmit">500ms 提交</el-button>

  <!-- 3. 通过 modifier 指定事件名 -->
  <el-button v-debounce.mousedown="handlePress">长按</el-button>

  <!-- 4. 同时指定延迟与事件 -->
  <el-button v-debounce:500.mousedown="handlePress">500ms 长按</el-button>

  <!-- 5. 立即触发（leading）：进入周期立即执行一次 -->
  <el-button v-debounce.leading="handleSubmit">立即触发</el-button>

  <!-- 6. leading + trailing 组合：首尾各触发一次 -->
  <el-button v-debounce:500.leading.trailing="handleSubmit">首尾触发</el-button>

  <!-- 7. 对象形式：完整配置 -->
  <el-button
    v-debounce="{
      handler: handleSubmit,
      delay: 500,
      event: 'click',
      leading: true,
      trailing: false,
    }"
  >
    对象配置
  </el-button>
</template>

<script setup lang="ts">
const handleSubmit = () => {
  console.log('提交')
}
const handlePress = () => {
  console.log('长按')
}
</script>
```

## 参数说明

| 参数 | 来源 | 默认值 | 说明 |
|------|------|--------|------|
| `handler` | 绑定值（必填） | - | 防抖触发的回调 |
| `delay` | `arg` / 对象 | `300` | 延迟毫秒数 |
| `event` | 修饰符 / 对象 | `'click'` | 监听的事件名 |
| `leading` | `.leading` 修饰符 / 对象 | `false` | 进入周期是否立即触发一次 |
| `trailing` | `.trailing` 修饰符 / 对象 | `true` | 周期结束时是否触发尾部回调 |

## 触发矩阵

| `leading` | `trailing` | 行为 |
|-----------|------------|------|
| `false` | `true` | **默认**：连续触发只在最后一次后延迟执行一次 |
| `true` | `false` | 进入周期立即执行一次，期间被触发都忽略，周期结束后再次响应 |
| `true` | `true` | 进入周期立即执行一次，期间若有新触发，周期结束时再触发一次 |
| `false` | `false` | 不触发（不推荐） |

::: warning leading + trailing 行为细节
`leading=true, trailing=true` 时，进入周期立即触发（leading），若周期内又有新触发，周期结束时再触发一次（trailing）；若周期内无新触发，则不会重复触发。即「首尾触发」并非每次都执行两次，而是首部必触发、尾部按需触发。
:::
