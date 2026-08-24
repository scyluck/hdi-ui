# v-focus 自动聚焦

进入页面、打开弹窗、切 tab 后自动聚焦到输入框，让用户可以立即开始输入。

## 用法

```vue
<template>
  <!-- 1. 最常用：挂载后立即聚焦（搜索框默认聚焦、登录页用户名聚焦） -->
  <el-input v-focus v-model="searchText" placeholder="输入关键词搜索" />

  <!-- 2. 聚焦同时选中全部文本（可编辑的默认值 / 邀请码输入框） -->
  <el-input v-focus.select v-model="inviteCode" />

  <!-- 3. 条件聚焦：true 聚焦 / false 失焦，响应式变化会自动切换 -->
  <el-button @click="isEditing = !isEditing">切换编辑状态</el-button>
  <el-input v-focus="isEditing" v-model="form.name" />

  <!-- 4. 延迟聚焦：等待弹窗/抽屉的过渡动画结束再聚焦（通常 200~300ms） -->
  <el-dialog v-model="dialogVisible" title="编辑">
    <el-input v-focus="300" v-model="form.title" />
  </el-dialog>

  <!--
    5. 选择器形式：Element Plus 的 el-input 外层 div 不是真实 input，
       通过 selector 命中内层真实元素聚焦
       两种等价写法：
  -->
  <el-input v-focus="'.el-input__inner'" v-model="name" />
  <el-input v-focus:input v-model="name" />  <!-- :input = selector='input' -->

  <!-- 6. 对象形式：完整配置 + 回调 -->
  <el-input
    v-focus="{
      auto: dialogVisible,       // dialog 打开时聚焦，关闭时失焦
      delay: 250,                // 等过渡结束
      selector: '.el-input__inner',
      select: true,              // 聚焦后选中全部
      onFocus: (el) => console.log('已聚焦', el),
      onBlur: (el) => console.log('已失焦', el),
    }"
    v-model="form.title"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const searchText = ref('')
const inviteCode = ref('ABC-12345')
const isEditing = ref(false)
const dialogVisible = ref(false)

const form = reactive({
  name: '',
  title: '',
})
</script>
```

## 值类型

| 类型 | 说明 |
|------|------|
| 不传 | mounted 时立即聚焦绑定元素自身（或自动查找的第一个可聚焦子元素） |
| `boolean` | `true` 聚焦 / `false` 失焦；支持响应式切换 |
| `number` | 延迟多少毫秒后聚焦（mounted 时只执行一次，用于等过渡动画） |
| `string` | 内部选择器，在绑定元素的子元素中查找匹配项进行聚焦（如 `'.el-input__inner'`） |
| `{ auto?, delay?, selector?, select?, onFocus?, onBlur? }` | 对象形式，完整配置 |

对象字段说明：

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `auto` | `boolean` | `true` | 是否要聚焦；响应式变化会自动切换聚焦/失焦 |
| `delay` | `number` | `0` | 延迟毫秒数，`0` 表示下一帧立即聚焦（`requestAnimationFrame`） |
| `selector` | `string` | — | 在绑定元素内查找真实要聚焦的元素的 CSS 选择器；不传则尝试用自身再自动向下查找第一个可聚焦元素 |
| `select` | `boolean` | `false` | 聚焦成功后是否同时选中输入框的全部文本 |
| `onFocus` | `(el: HTMLElement) => void` | — | 聚焦成功回调 |
| `onBlur` | `(el: HTMLElement) => void` | — | 失焦回调（仅 `auto` 从 true → false 触发的失焦会调用，用户手动 tab 出去不调用） |

## arg 形式

`v-focus:input` 与 `v-focus="'input'"` 等价，都是选择器形式。两者同时写时 `:arg` 形式优先级更高。

```vue
<!-- 以下两种写法等价 -->
<el-input v-focus:input />           <!-- arg 形式 -->
<el-input v-focus="'input'" />       <!-- 绑定值字符串形式 -->
```

`.select` 修饰符与对象形式的 `select: true` 等价：
```vue
<!-- 以下两种写法等价 -->
<input v-focus.select />
<input v-focus="{ select: true }" />
```

## 自动查找可聚焦元素

当绑定的元素自身**不是**可聚焦元素（如外层 `div`、`el-form-item`、组件根节点等）时，`v-focus` 会自动向下查找第一个可聚焦的子元素并聚焦。可聚焦元素的判断优先级：

1. 显式指定了 `selector` → 用 selector 查找
2. 绑定元素自身是 `input` / `textarea` / `select` / `button` 且非 disabled → 用自身
3. 向下查找第一个匹配 `input, textarea, select, button, [tabindex]:not([tabindex="-1"])` 的元素

这让 `v-focus` 可以方便地绑在 `el-dialog`、`el-form`、`div` 外层，无需关心真正的输入框被嵌套了多少层。

## 为什么不直接用 `autofocus` 属性？

原生 `autofocus` 有几个局限：

1. **只在页面首次加载时生效一次**：SPA 切路由、`v-if` 显示元素、关闭后重新打开弹窗，`autofocus` 都不会再次生效。`v-focus` 每次 mounted 都会触发。
2. **不能延迟**：弹窗通常有 200~300ms 的打开过渡动画，`autofocus` 在元素一挂载就聚焦，聚焦时元素还在移动/淡入，体验差且部分浏览器会因为元素不可见而静默失败。`v-focus="300"` 可以等过渡完再聚焦。
3. **不能条件切换**：`autofocus` 是一次性的，无法根据业务状态动态「聚焦/失焦」。`v-focus="boolean"` 支持响应式。
4. **不能选择子元素**：Element Plus `el-input` 渲染出来的根节点是 `div.el-input`，真实 input 在内部，`autofocus` 绑在组件上不生效，需要 `v-focus:input` 或 `v-focus="'.el-input__inner'"` 才能命中。

## 常见场景速查

| 场景 | 推荐写法 |
|------|----------|
| 搜索框页面进入默认聚焦 | `<el-input v-focus:input />` |
| 弹窗打开后第一个输入框聚焦 | `<el-input v-focus="{ auto: visible, delay: 250, selector: '.el-input__inner' }"` |
| 邀请码/激活码输入框默认选中文本 | `<el-input v-focus.select:input v-model="code" />` |
| 点击「编辑」按钮聚焦某一行的输入框 | `<el-input v-focus="row.isEditing" />` |
| 原生 `<input>`（非 el-input）聚焦 | `<input v-focus.select />`（直接绑原生元素，无需 selector） |
