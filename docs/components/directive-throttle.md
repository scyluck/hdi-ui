# v-throttle 节流

在一个时间窗口内，频繁调用只按固定间隔触发。与 `v-debounce` 的区别：

- **debounce（防抖）**：等事件「停下来」后才触发，适合搜索联想、按钮防重复提交
- **throttle（节流）**：按固定频率触发，适合滚动监听、窗口 resize、鼠标拖拽等需要实时反馈但又不能每次触发都执行的场景

## 用法

```vue
<template>
  <!-- 1. 默认：300ms 节流窗口，监听 click，leading + trailing（与 lodash throttle 语义一致） -->
  <el-button v-throttle="handleClick">提交</el-button>

  <!-- 2. 通过 arg 指定节流窗口（ms） -->
  <el-button v-throttle:500="handleClick">500ms 节流</el-button>

  <!-- 3. 通过 modifier 指定事件名：滚动监听高频场景 -->
  <div v-throttle.scroll="handleScroll" style="height: 400px; overflow: auto">
    <div v-for="i in 100" :key="i">第 {{ i }} 行</div>
  </div>

  <!-- 4. 窗口 resize：16ms ≈ 60fps 流畅度 -->
  <div v-throttle:16.resize="onResize">窗口变化</div>

  <!-- 5. 拖拽：mousemove 高频触发，20ms ≈ 50fps -->
  <div
    v-throttle:20.mousemove="onDrag"
    style="width: 100px; height: 100px; background: #409eff; cursor: move"
  >
    拖拽我
  </div>

  <!-- 6. 仅 leading：每 300ms 的第一次点击立即响应，后续点击忽略到下一周期 -->
  <el-button v-throttle.leading="handleClick">仅头部触发</el-button>

  <!-- 7. 仅 trailing：每 300ms 的最后一次点击在周期结束时触发 -->
  <el-button v-throttle.trailing="handleClick">仅尾部触发</el-button>

  <!-- 8. 对象形式：完整配置 -->
  <el-button
    v-throttle="{
      handler: handleClick,
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
const handleClick = () => {
  console.log('点击')
}
const handleScroll = (e: Event) => {
  console.log('滚动位置', (e.target as HTMLElement).scrollTop)
}
const onResize = () => {
  console.log('窗口尺寸', window.innerWidth, window.innerHeight)
}
const onDrag = (e: MouseEvent) => {
  console.log('鼠标位置', e.clientX, e.clientY)
}
</script>
```

## 参数说明

| 参数 | 来源 | 默认值 | 说明 |
|------|------|--------|------|
| `handler` | 绑定值（必填） | - | 节流触发的回调 |
| `delay` | `arg` / 对象 | `300` | 节流窗口毫秒数 |
| `event` | 修饰符 / 对象 | `'click'` | 监听的事件名 |
| `leading` | `.leading` 修饰符 / 对象 | `true` | 进入周期是否立即触发一次 |
| `trailing` | `.trailing` 修饰符 / 对象 | `true` | 周期结束时若有新触发是否再触发一次尾部回调 |

## 触发矩阵

| `leading` | `trailing` | 行为 |
|-----------|------------|------|
| `true` | `true` | **默认**：进入周期立即执行一次；周期内若有新触发，周期结束时再触发最后一次 |
| `true` | `false` | 仅头部触发：每周期只在开头执行一次，后续调用直接忽略 |
| `false` | `true` | 仅尾部触发：每周期只在结束时执行一次（最后一次调用的参数） |
| `false` | `false` | 不触发（不推荐） |

## debounce vs throttle 选型建议

| 场景 | 推荐指令 | 原因 |
|------|----------|------|
| 搜索框输入联想 | `v-debounce` | 等用户停下来再请求，减少接口调用 |
| 按钮提交防重复点 | `v-debounce` | 只认最后一次提交，确保状态一致性 |
| 页面滚动加载更多 | `v-throttle` | 每固定距离/时间判断一次是否到底，需要实时反馈 |
| 窗口 resize 后重绘图表 | `v-throttle` | 需要持续感知尺寸变化，但不能每像素都重绘 |
| 拖拽过程跟随鼠标移动 | `v-throttle` | 需要平滑跟随，但每帧最多一次就够了（16ms ≈ 60fps） |
| 点击外部关闭菜单 | `v-click-outside` | 专用指令，不用自己写 debounce |
