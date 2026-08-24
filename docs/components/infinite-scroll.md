# InfiniteScroll 无限滚动

无限滚动列表组件，基于 `el-scrollbar` 实现触底自动加载，适用于长列表、信息流等场景。与 HdiTable / HdiCardList 共享 `items`、搜索、工具栏、弹窗配置体系，仅展示形式不同。

::: tip 三组件的关系
`HdiTable`（表格）、`HdiCardList`（卡片网格）、`HdiInfiniteScroll`（无限滚动）共享数据层逻辑（加载/搜索/工具栏/弹窗），配置结构一致，差异仅在展示区域。三者内部均通过 `useDataView` composable 复用公共逻辑。
:::

## 基础用法

```vue
<template>
  <div style="height: 100vh;">
    <HdiInfiniteScroll
      ref="scrollRef"
      :config="config"
      @getTableData="handleGetData"
      @addSubmit="handleAdd"
      @editSubmit="handleEdit"
      @delSubmit="handleDelete"
      @loadMore="handleLoadMore"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { HdiInfiniteScroll } from 'hdi-ui'
import type { InfiniteScrollSetConfig, TableData, PageInfo } from 'hdi-ui'

const scrollRef = ref()

const config: InfiniteScrollSetConfig = {
  items: [
    { prop: 'id', label: 'ID', type: 'index', isSearch: false, isAdd: false, isEdit: false, isView: true },
    {
      prop: 'title', label: '标题', type: 'input',
      isSearch: true, isAdd: true, isEdit: true, isView: true,
    },
    {
      prop: 'author', label: '作者', type: 'input',
      isSearch: true, isAdd: true, isEdit: true,
    },
    {
      prop: 'status', label: '状态', type: 'select',
      isSearch: true, isAdd: true, isEdit: true,
      options: [
        { label: '已发布', value: 1 },
        { label: '草稿', value: 0 },
      ],
    },
    {
      prop: 'createTime', label: '创建时间', type: 'date',
      isTable: true, isAdd: false, isEdit: false,
      tableCellType: 'DATE',
      tableCellFormatter: 'YYYY-MM-DD',
    },
    {
      prop: 'operate', label: '操作', type: 'operate',
      options: [
        { btnType: 'edit' },
        { btnType: 'delete' },
      ],
    },
  ],
  infiniteScroll: {
    height: '100%',
    threshold: 50,
    pageSize: 20,
    rowKey: 'id',
  },
  toolbar: [
    { btnType: 'add', direction: 'left' },
    { btnType: 'refresh', direction: 'right' },
  ],
  isStartGet: true,
}

const handleGetData = (pageInfo: PageInfo, formSearch: Record<string, any>, callback: (data?: TableData) => void) => {
  const records = Array.from({ length: 53 }, (_, i) => ({
    id: i + 1,
    title: `文章${i + 1}`,
    author: `作者${(i % 5) + 1}`,
    status: i % 2 === 0 ? 1 : 0,
    createTime: new Date(Date.now() - i * 3600000).toISOString(),
  }))
  const start = (pageInfo.pageNum - 1) * pageInfo.pageSize
  callback({
    records: records.slice(start, start + pageInfo.pageSize),
    totalNums: records.length,
    totalPages: Math.ceil(records.length / pageInfo.pageSize),
  })
}

const handleAdd = (formData: any, callback: (result?: any) => void) => {
  ElMessage.success('新增成功')
  callback({ msg: '新增成功' })
}

const handleEdit = (formData: any, callback: (result?: any) => void) => {
  ElMessage.success('编辑成功')
  callback({ msg: '编辑成功' })
}

const handleDelete = (rows: any[], ids: any[], callback: (result?: any) => void) => {
  ElMessage.success('删除成功')
  callback({ msg: '删除成功' })
}

const handleLoadMore = (pageInfo: PageInfo) => {
  console.log('加载下一页：', pageInfo)
}
</script>
```

## 组件 Props

`<HdiInfiniteScroll>` 组件本身的 props：

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `config` | 无限滚动整体配置，见下方 [InfiniteScrollSetConfig](#整体配置-infinitescrollsetconfig) | `InfiniteScrollSetConfig` | - |
| `data` | 外部数据（不提供时通过 `getTableData` 事件获取） | `TableData` | `{ records: [], totalNums: 0, totalPages: 1 }` |

## 整体配置 InfiniteScrollSetConfig

与 [TableSetConfig](./table.md#整体配置-tablesetconfig) 几乎一致，仅将 `table` 与 `page`（无分页器）替换为 `infiniteScroll`，不支持 `customColumns` 和 `customSearch`。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `items` | 列配置数组（同时控制搜索栏、列表项、弹窗），复用 [TableColumn](./table.md#列配置-tablecolumn)。使用 `#item` 插槽完全自定义列表项时可省略 | `TableColumn[]` | - |
| `infiniteScroll` | 无限滚动专用配置 | `InfiniteScrollConfig` | - |
| `search` | 搜索栏配置（传 `false` 隐藏） | `FormConfig \| false` | - |
| `toolbar` | 工具栏按钮配置（传 `false` 隐藏） | `ToolbarButton[] \| false` | - |
| `dialog` | 弹窗配置（传 `false` 隐藏） | `DialogConfig \| false` | - |
| `isStartGet` | 是否自动加载首屏数据 | `boolean` | `true` |
| `isSearchAndToolbarRow` | 搜索栏和工具栏是否同一行 | `boolean` | `false` |

::: tip 与 Table 的关系
`items`、`search`、`toolbar`、`dialog` 的配置方式与 HdiTable 完全一致，详情参考 [Table 文档](./table.md)。`TableColumn` 的 `type`、`tableCellType`、操作列等配置在 InfiniteScroll 中同样生效。
:::

::: tip 仅使用插槽时 `items` 可省略
当通过 `#item` 插槽完全自定义列表项渲染，且不需要搜索栏/弹窗时，`items` 可不配置。此时组件只负责数据加载与触底分页，列表项内容由插槽完全决定。
:::

::: warning 无分页器
InfiniteScroll 不支持 `page` 配置（无分页器），分页参数由 `infiniteScroll.pageSize` 控制并在内部自动管理。触底时自动递增 `pageNum` 请求下一页，并将新数据**追加**到已加载列表尾部。
:::

## 无限滚动配置 InfiniteScrollConfig

```ts
infiniteScroll: {
  height: '100%',       // 滚动容器高度
  threshold: 50,         // 触底距离阈值 (px)
  pageSize: 20,          // 每页条数
  rowKey: 'id',          // 行数据唯一标识
  emptyText: '暂无数据',  // 空数据文案
  loadingText: '加载中...', // 加载中文案
  noMoreText: '没有更多了', // 没有更多数据时的文案
  showFields: ['title', 'author', 'status', 'createTime'], // 默认展示字段
}
```

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `rowKey` | 行数据唯一标识字段名 | `string` | `'id'` |
| `height` | 滚动容器高度（传给 el-scrollbar） | `string \| number` | `'100%'` |
| `threshold` | 触底距离阈值 px，距底部小于该值即触发加载下一页 | `number` | `50` |
| `pageSize` | 每页条数（内部按分页请求，但不渲染分页器） | `number` | `10` |
| `emptyText` | 空数据文案 | `string` | `'暂无数据'` |
| `loadingText` | 加载中文案 | `string` | `'加载中...'` |
| `noMoreText` | 没有更多数据时的文案 | `string` | `'没有更多了'` |
| `showFields` | 列表项展示的字段 prop 列表 | `string[]` | 所有 `isTable !== false` 且带 `prop` 的字段 |

## 列表项展示

### 默认渲染

未提供 `#item` 插槽时，组件按以下规则渲染每个列表项：

1. 如果配置了 `showFields`，按给定顺序展示对应字段
2. 否则展示所有 `isTable !== false` 且非 `index/selection/expand/operate` 类型、带 `prop` 的字段

每项以「标签 + 值」的横向排列展示，字段值渲染复用 Table 的 `getTableCellDisplay`，支持 `TEXT`/`ENUM`/`ENUMS`/`BOOLEAN`/`DATE`/`TAG` 等 `tableCellType`。

### 操作按钮

`items` 中 `type: 'operate'` 的列，其 `options` 配置的按钮会自动渲染到每个列表项底部（与 Table 操作列配置完全一致）。

```ts
{
  prop: 'operate', label: '操作', type: 'operate',
  options: [
    { btnType: 'view' },
    { btnType: 'edit' },
    { btnType: 'delete' },
    { btnType: 'custom', btnName: '复制', show: (row) => row.status === 1 },
  ],
}
```

## 插槽

InfiniteScroll 提供列表项级别的插槽，可完全自定义每项内容：

| 插槽名 | 作用域参数 | 说明 |
|--------|-----------|------|
| `item` | `{ row, index }` | 完全替换列表项内容 |

此外，搜索栏和弹窗中的表单字段支持 `type: 'slot'`，与 [Table 表单插槽](./table.md#表单插槽) 用法一致。

### 自定义列表项

```vue
<HdiInfiniteScroll :config="config" @getTableData="getData">
  <template #item="{ row, index }">
    <div class="custom-item">
      <span class="item-index">#{{ index + 1 }}</span>
      <h3 class="item-title">{{ row.title }}</h3>
      <p class="item-author">{{ row.author }}</p>
      <el-tag :type="row.status === 1 ? 'success' : 'info'">
        {{ row.status === 1 ? '已发布' : '草稿' }}
      </el-tag>
    </div>
  </template>
</HdiInfiniteScroll>
```

::: tip 插槽内操作按钮
使用 `#item` 插槽完全自定义列表项时，操作按钮不会自动渲染。如需保留操作按钮，可在插槽内自行渲染，或通过 `ref` 调用 `openDialog('edit', row)` 等方法。
:::

### 仅使用插槽（省略 items）

当列表项完全由插槽渲染、且不需要搜索栏与弹窗时，`items` 可省略，配置更简洁：

```vue
<HdiInfiniteScroll :config="config" @getTableData="getData">
  <template #item="{ row, index }">
    <div class="custom-item">
      <span>#{{ index + 1 }}</span>
      <h3>{{ row.title }}</h3>
      <p>{{ row.author }}</p>
    </div>
  </template>
</HdiInfiniteScroll>

<script setup lang="ts">
import type { InfiniteScrollSetConfig } from 'hdi-ui'

// 无需 items，仅配置滚动参数
const config: InfiniteScrollSetConfig = {
  infiniteScroll: {
    height: 'calc(100vh - 120px)',
    pageSize: 20,
    rowKey: 'id',
  },
  isStartGet: true,
}
</script>
```

## 触底加载机制

组件基于 `el-scrollbar` 监听滚动事件，当满足以下条件时自动触发加载下一页：

- 未在加载中（`loading === false`）
- 还有更多数据（已加载数量 < 总数 `total`）
- 距底部距离小于 `threshold`（`scrollHeight - scrollTop - clientHeight < threshold`）

触发后自动递增 `pageNum` 并请求下一页，新数据**追加**到已加载列表尾部。当没有更多数据时，底部显示 `noMoreText` 文案。

### 搜索与重置

点击搜索或重置时，组件会：

1. 将 `pageNum` 重置为 1
2. 清空已加载的累积数据
3. 重新加载首屏

这意味着搜索/重置后的数据是整页替换，而非追加。

## 事件

事件与 [Table 事件](./table.md#事件) 基本一致，额外支持以下事件：

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `loadMore` | `(pageInfo: PageInfo)` | 触底加载下一页时触发，`pageInfo` 为即将请求的分页信息 |

其余事件（`getTableData`、`addSubmit`、`editSubmit`、`delSubmit`、`toolbarButtonClick`、`operateButtonClick`、`tableImport`、`tableExport`）与 Table 完全一致，参考 [Table 事件文档](./table.md#事件)。

::: warning 不支持的事件
InfiniteScroll 无分页器，**不支持** `pageChange`、`columnsChange`、`searchChange` 事件。
:::

## 暴露方法

```ts
const scrollRef = ref()

// 刷新：重置到第 1 页并重新加载（清空已加载数据）
scrollRef.value.refresh()

// 重置列表（与 refresh 等效）
scrollRef.value.resetList()

// 手动加载下一页（不等触底）
scrollRef.value.loadMore()

// 打开弹窗
scrollRef.value.openDialog('add')
scrollRef.value.openDialog('edit', row)
scrollRef.value.openDialog('view', row)

// 关闭弹窗
scrollRef.value.closeDialog()

// 手动触发搜索（重置到第 1 页并按条件加载）
scrollRef.value.searchSubmit({ title: '关键词' })

// 关闭加载状态
scrollRef.value.closeTheLoading(true)
```

::: tip refresh 与 loadMore 的区别
- `refresh()` / `resetList()`：清空已加载数据，回到第 1 页重新加载（整页替换）
- `loadMore()`：在当前列表基础上追加下一页数据（累积追加）

工具栏的 `refresh` 按钮调用的是 `refresh()`（重置），而非 `loadMore()`（追加）。
:::

## 完整示例

```ts
const config: InfiniteScrollSetConfig = {
  items: [
    { prop: 'id', label: 'ID', type: 'index', isSearch: false, isAdd: false, isEdit: false, isView: true },
    {
      prop: 'title', label: '标题', type: 'input',
      isSearch: true, isAdd: true, isEdit: true, isView: true,
      rules: [{ required: true, message: '请输入标题' }],
    },
    {
      prop: 'author', label: '作者', type: 'input',
      isSearch: true, isAdd: true, isEdit: true,
    },
    {
      prop: 'status', label: '状态', type: 'select',
      isSearch: true, isAdd: true, isEdit: true,
      options: 'article_status',  // 字典 code
      tableCellType: 'TAG',
      bindCell: { type: { 1: 'success', 0: 'info' } },
    },
    {
      prop: 'createTime', label: '创建时间', type: 'date',
      isSearch: false, isAdd: false, isEdit: false, isView: true,
      tableCellType: 'DATE',
      tableCellFormatter: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      prop: 'operate', label: '操作', type: 'operate',
      options: [
        { btnType: 'view' },
        { btnType: 'edit' },
        { btnType: 'delete' },
        { btnType: 'custom', btnName: '置顶', show: (row) => row.status === 1 },
      ],
    },
  ],
  infiniteScroll: {
    height: 'calc(100vh - 160px)',
    threshold: 80,
    pageSize: 20,
    rowKey: 'id',
    emptyText: '暂无文章',
    noMoreText: '已加载全部',
    showFields: ['title', 'author', 'status', 'createTime'],
  },
  search: { cols: 3 },
  toolbar: [
    { btnType: 'add', direction: 'left' },
    { btnType: 'refresh', direction: 'right' },
  ],
  dialog: {
    width: '600px',
    closeOnClickModal: false,
    // 表单按钮相关属性直接写在 form 下，与 HdiForm 一致；title 省略时按 type 内建默认
    form: {
      cols: 2,
      labelWidth: '100px',
      // submitButtonText: '保存',
      // resetButtonText: '取消',
      // btnsJustifyContent: 'flex-end',
    },
  },
  isStartGet: true,
}
```
