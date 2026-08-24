# InfiniteScroll 无限滚动开发

本文档面向 **hdi-ui 框架的开发维护者**，介绍 InfiniteScroll 的内部结构、与 Table/CardList 的复用关系、触底加载机制，以及如何扩展。

::: tip 配套使用文档
业务侧使用方式见 [InfiniteScroll 无限滚动](/components/infinite-scroll)。
:::

## 目录结构

```
src/components/InfiniteScroll/
├── index.vue          # 主组件（集成搜索/工具栏/滚动列表/弹窗）
├── types.ts           # 类型定义
└── index.ts           # 对外导出

src/composables/
└── useDataView.ts     # 三组件共享的数据层 composable
```

InfiniteScroll 自身代码量很少，绝大部分逻辑（数据加载、搜索、工具栏、弹窗）由 [useDataView](file:///e:/hdi-ui/src/composables/useDataView.ts) 提供，展示区域的搜索栏、工具栏、弹窗直接复用 Table 的子组件。

## 与 Table/CardList 的复用关系

InfiniteScroll 复用 Table 的基础设施和 `useDataView` composable，仅实现了滚动列表展示区域：

| 功能 | InfiniteScroll 来源 | Table 来源 | CardList 来源 |
|------|--------------------|-----------|---------------|
| 数据层逻辑 | `useDataView`（共享） | `useDataView`（共享） | `useDataView`（共享） |
| 搜索栏 | `../Table/search.vue` | `./search.vue` | `../Table/search.vue` |
| 工具栏 | `../Table/toolbar.vue` | `./toolbar.vue` | `../Table/toolbar.vue` |
| 弹窗 | `../Table/dialog.vue` | `./dialog.vue` | `../Table/dialog.vue` |
| 操作按钮 | `../Table/operation.vue` | `./operation.vue` | `../Table/operation.vue` |
| 字段渲染逻辑 | `../Table/utils.ts` 的 `getTableCellDisplay` | `./utils.ts` | `../Table/utils.ts` |
| 字典加载 | `useDataView` 内部调用 `useTableDictionaries` | 同 | 同 |
| **滚动列表** | `./index.vue`（独有） | - | - |
| **表格区域** | - | `./table.vue` | - |
| **卡片区域** | - | - | `./card-area.vue` |

### useDataView composable

[useDataView.ts](file:///e:/hdi-ui/src/composables/useDataView.ts) 是 Table、CardList、InfiniteScroll 三个组件共享的数据层逻辑，职责包括：

- 加载状态（`loading`）
- 搜索条件（`searchData`）与提交/重置
- 分页（`pagination`）与页码变更
- 工具栏按钮点击（add/batchDelete/import/export/refresh/custom）
- 操作按钮点击（view/edit/delete/custom）
- 批量删除（带确认弹窗）
- 弹窗管理（open/close/submit）
- 字典自动加载

各组件的差异通过三个注入点处理：

| 注入点 | 说明 | Table | CardList | InfiniteScroll |
|--------|------|-------|----------|----------------|
| `selection` | 选择行能力来源 | el-table 实例 | CardArea | 不注入（无批量删除） |
| `getRowKey` | 删除操作取主键字段 | `tableConfig.rowKey` | `cardListConfig.rowKey` | `infiniteScrollConfig.rowKey` |
| `accumulative` | 累积模式（追加而非替换数据） | `false` | `false` | `true` |

### 主组件 index.vue

[index.vue](file:///e:/hdi-ui/src/components/InfiniteScroll/index.vue) 通过 `useDataView` 获取数据层逻辑，仅保留 InfiniteScroll 特有的：

- `el-scrollbar` 滚动容器与触底检测
- 列表项渲染（默认字段展示 / `#item` 插槽）
- 操作按钮渲染（复用 `OperateButton`）
- 底部加载状态（loading / noMore）
- `hasMore` 计算与 `loadMore` 方法

## 触底加载机制

### 滚动监听

组件在 `el-scrollbar` 的 `@scroll` 事件中判断是否触底：

```ts
const handleScroll = ({ scrollTop }: { scrollTop: number }) => {
  if (loading.value || !hasMore.value) return
  const wrap = scrollbarRef.value?.wrapRef as HTMLElement | undefined
  if (!wrap) return
  const { scrollHeight, clientHeight } = wrap
  if (scrollHeight - scrollTop - clientHeight < infiniteScrollConfig.value.threshold) {
    loadMore()
  }
}
```

关键点：
- `el-scrollbar` 的 `wrapRef` 是实际的滚动 DOM 元素
- 通过 `scrollHeight - scrollTop - clientHeight` 计算距底部距离
- 小于 `threshold`（默认 50px）时触发加载
- 加载中或没有更多数据时不触发

### hasMore 判断

```ts
const hasMore = computed(() => dataRecords.value.length < pagination.value.total)
```

已加载数量（累积）小于总数时允许加载下一页。

### loadMore 流程

```ts
const loadMore = () => {
  if (loading.value || !hasMore.value) return
  pagination.value.pageNum++
  loadData()  // useDataView 提供
  emit('loadMore', pagination.value)
}
```

## 累积模式

InfiniteScroll 通过 `accumulative: true` 启用 `useDataView` 的累积模式：

- `pageNum > 1` 时，新数据 `records` **追加**到 `internalData.records` 尾部
- `pageNum === 1`（首屏 / 搜索 / 重置）时，**整页替换** `internalData`（清空旧数据）

```ts
// useDataView.loadData 回调
if (accumulative && pagination.value.pageNum > 1) {
  internalData.value = {
    ...data,
    records: [...internalData.value.records, ...data.records],
  }
} else {
  internalData.value = data
}
```

::: warning 累积模式下的 pageNum
累积模式下，`useDataView` **不会**在 `pageNum > totalPages` 时重置为 1（替换模式才会）。这是因为触底加载依赖 `pageNum` 递增，重置会导致重复加载第 1 页。搜索/重置时由组件自行重置 `pageNum = 1`。
:::

### resetList

InfiniteScroll 提供独立的 `resetList` 方法，用于重置到第 1 页：

```ts
const resetList = () => {
  pagination.value.pageNum = 1
  internalData.value = { records: [], totalNums: 0, totalPages: 1 }
  loadData()
}
```

`refresh()` 和 `searchSubmit()` 内部均调用 `resetList`，确保搜索/刷新后从第 1 页开始。

## 列表项渲染

::: tip items 可选
`InfiniteScrollSetConfig.items` 为可选字段。当业务通过 `#item` 插槽完全自定义列表项、且不需要搜索栏/弹窗时，可不配置 `items`。此时下方 `displayFields` 与 `operateButtons` 均返回空数组（`flattenTableTree` 对 `undefined` 返回 `[]`），列表项内容完全由插槽决定。
:::

### displayFields 计算

```ts
const displayFields = computed<TableColumn[]>(() => {
  const cfg = infiniteScrollConfig.value
  const all = flattenTableTree(props.config.items)
  if (cfg.showFields?.length) {
    const map = new Map(all.map((it) => [it.prop, it]))
    return cfg.showFields.map((p) => map.get(p)).filter(Boolean) as TableColumn[]
  }
  return all.filter(
    (it) => it.isTable !== false && it.prop && !filterType.includes(it.type)
  )
})
```

逻辑与 [CardList 的 displayFields](file:///e:/hdi-ui/src/components/CardList/card-item.vue) 一致：优先 `showFields`，否则取所有可展示字段。

### 操作按钮

```ts
const operateButtons = computed<ToolbarButton[]>(() => {
  const operateCol = flattenTableTree(props.config.items).find(
    (it) => it.type === 'operate'
  )
  const options = (operateCol?.options || []) as ToolbarButton[][]
  return options.flat().filter(shouldShowButton).map(enrichButton)
})
```

从 `items` 中查找 `type: 'operate'` 的列，取其 `options` 并展平、过滤、富化。与 Table 的 [table-content.vue](file:///e:/hdi-ui/src/components/Table/table-content.vue) 中 operateButtons 逻辑一致。

## 扩展列表项渲染

### 修改默认字段渲染

默认渲染逻辑位于 [index.vue](file:///e:/hdi-ui/src/components/InfiniteScroll/index.vue) 的模板中。如需调整字段排列方式（如改为纵向、卡片式），直接修改模板中的 `.infinite-scroll-fields` 区域。

新增 `tableCellType` 需同步修改 Table 的 [table-cell.vue](file:///e:/hdi-ui/src/components/Table/table-cell.vue) 和 CardList 的 [card-item.vue](file:///e:/hdi-ui/src/components/CardList/card-item.vue)。

### 新增加载状态样式

底部加载状态位于 `.infinite-scroll-status` 区域，修改 [index.vue](file:///e:/hdi-ui/src/components/InfiniteScroll/index.vue) 的 `<style>` 部分即可。如需骨架屏，可在 `loading && dataRecords.length === 0` 时渲染占位元素。

## 新增业务组件时的注意事项

InfiniteScroll 已注册到以下入口，新增组件时无需单独处理 InfiniteScroll：

- [src/install-components.ts](file:///e:/hdi-ui/src/install-components.ts)：`businessComponents` 记录
- [src/index.ts](file:///e:/hdi-ui/src/index.ts)：命名导出 + `export *`

## types.ts 改动需重新构建

[types.ts](file:///e:/hdi-ui/src/components/InfiniteScroll/types.ts) 中的类型定义通过构建产物被业务项目引用，**修改后必须执行 `npm run build`** 才能让业务项目获取到新的类型。

## useDataView 改动需重新构建

[useDataView.ts](file:///e:/hdi-ui/src/composables/useDataView.ts) 的逻辑被三个组件共享，**修改后必须执行 `npm run build`** 才能让所有组件生效。修改时需同时验证 Table、CardList、InfiniteScroll 三者的行为，避免对某个组件产生回归影响。
