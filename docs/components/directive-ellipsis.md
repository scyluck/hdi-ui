# v-ellipsis 文本省略

自动为文本添加「溢出省略号」样式，并检测是否真正溢出，溢出时**自动加 `title` 属性**让鼠标悬停即可查看全文。替代手写以下冗长的 CSS：

```css
/* 单行省略 — 需要写 3 行 */
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;

/* 多行省略 — 更难记，还需要浏览器前缀 */
overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
```

## 用法

```vue
<template>
  <!-- 1. 单行省略：溢出自动加 title 显示全文 -->
  <el-table-column label="描述" width="200">
    <template #default="{ row }">
      <span v-ellipsis>{{ row.description }}</span>
    </template>
  </el-table-column>

  <!-- 2. 3 行省略（两种等价写法） -->
  <div style="width: 200px">
    <p v-ellipsis="3">{{ superLongText }}</p>
    <p v-ellipsis:3>{{ superLongText }}</p>
  </div>

  <!-- 3. 不要自动加 title（tooltip: false） -->
  <span v-ellipsis="{ lines: 1, tooltip: false }">
    不需要悬停提示的省略场景
  </span>

  <!--
    4. 显式指定悬停显示的完整文本
    当展示的是「缩略版文本」而不是完整文本时，
    可以把真正的全文通过 v-ellipsis 传进去，溢出时会显示这个全文
  -->
  <span v-ellipsis="fullText">
    {{ summaryText }}  <!-- 显示缩略版 -->
  </span>
</template>

<script setup lang="ts">
const superLongText =
  'Hdi UI 是公司统一前端 UI 框架，基于 Vue 3 + Element Plus + TypeScript，内置权限控制、表单、表格、字典等高频业务组件与工具函数，帮助团队快速搭建后台管理系统。'

const summaryText = '超长文本的缩略版...'
const fullText =
  '这里是完整版的、详细的、包含全部信息的超长文本内容，用于鼠标悬停时展示给用户。'
</script>
```

## 值类型

| 类型 | 说明 |
|------|------|
| 不传 / `undefined` / `null` | 单行省略，取元素 `textContent` 作为 tooltip 文本 |
| `number` | 指定行数，如 `v-ellipsis="3"` 表示 3 行省略 |
| `string` | 显式指定用于悬停显示的全文（如 `v-ellipsis="fullText"`） |
| `{ lines?, tooltip?, text? }` | 对象形式，完整配置 |

对象字段说明：

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lines` | `number` | `1` | 省略行数，`1` = 单行省略，`≥2` = 多行省略 |
| `tooltip` | `boolean` | `true` | 溢出时是否自动加 `title` 属性。若业务自己用 ElTooltip 包裹，可设为 `false` 避免两个提示冲突 |
| `text` | `string` | `''` | 显式指定用于 `title` 显示的全文；不传则默认取元素的 `textContent` |

## arg 形式

`v-ellipsis:3` 与 `v-ellipsis="3"` 等价，都是指定 3 行省略。两者同时写时 `:arg` 形式优先级更高。

```vue
<!-- 以下两种写法等价，都是 3 行省略 -->
<span v-ellipsis:3>{{ text }}</span>
<span v-ellipsis="3">{{ text }}</span>
```

## 自动更新检测

`v-ellipsis` 内部使用两个 Observer 自动维护省略状态，无需业务手动刷新：

- **MutationObserver**：监听子节点文本、字符数据变化，内容变了自动重算
- **ResizeObserver**：监听元素尺寸变化（容器宽度变化、窗口 resize），尺寸变了自动重算

因此无论是响应式变量更新、父容器宽度变化、切 tab 导致隐藏/显示，省略状态和 `title` 属性都会自动保持正确。

## 使用 Element Plus ElTooltip 的场景

如果希望悬停时显示的是美观的 ElTooltip（而不是浏览器原生 `title`），可以将 `tooltip` 设为 `false` 并用 `el-tooltip` 包裹，配合 `v-if` 只在溢出时才启用 tooltip（避免即使没溢出也出现空的 tooltip）：

```vue
<el-tooltip
  v-if="isOverflowed"
  :content="fullText"
  placement="top"
>
  <span
    v-ellipsis="{ lines: 2, tooltip: false }"
    ref="textRef"
    @resize="onResize"
  >
    {{ fullText }}
  </span>
</el-tooltip>
<el-tooltip v-else :content="fullText" :disabled="true">
  <span v-ellipsis="{ lines: 2, tooltip: false }">
    {{ fullText }}
  </span>
</el-tooltip>
```

::: tip 提示
若你判断溢出的逻辑是通用的，也可以直接使用 `v-ellipsis` 的默认行为（`title` 自动加），虽然样式不如 ElTooltip，但足够满足 90% 的表格、列表项省略场景。
:::
