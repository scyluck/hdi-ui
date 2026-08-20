# CardList 卡片列表

卡片列表组件，适用于表格不适合的场景（如图片列表、商品卡片），配置化生成卡片列表，卡片内展示内容可通过插槽自定义。与 HdiTable 共享 `items` 配置，搜索、工具栏、分页、弹窗逻辑完全一致。

## 基础用法

```vue
<template>
  <div style="height: 100vh;">
    <HdiCardList
      ref="cardListRef"
      :config="config"
      @getTableData="handleGetData"
      @addSubmit="handleAdd"
      @editSubmit="handleEdit"
      @delSubmit="handleDelete"
      @selectionChange="handleSelectionChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { HdiCardList } from 'hdi-ui'
import type { CardListSetConfig, TableData, PageInfo } from 'hdi-ui'

const cardListRef = ref()

const config: CardListSetConfig = {
  items: [
    { prop: 'id', label: 'ID', type: 'index', isSearch: false, isAdd: false, isEdit: false, isView: true },
    {
      prop: 'cover', label: '封面图', type: 'input',
      isSearch: false, isAdd: true, isEdit: true,
    },
    {
      prop: 'name', label: '名称', type: 'input',
      isSearch: true, isAdd: true, isEdit: true, isView: true,
    },
    {
      prop: 'price', label: '价格', type: 'input',
      isSearch: false, isAdd: true, isEdit: true,
    },
    {
      prop: 'status', label: '状态', type: 'select',
      isSearch: true, isAdd: true, isEdit: true,
      options: [
        { label: '上架', value: 1 },
        { label: '下架', value: 0 },
      ],
    },
    {
      prop: 'operate', label: '操作', type: 'operate',
      options: [
        { btnType: 'edit' },
        { btnType: 'delete' },
      ],
    },
  ],
  cardList: {
    grid: { cols: 4, gutter: 16 },
    card: {
      coverField: 'cover',
      titleField: 'name',
      showFields: ['price', 'status'],
      selectable: true,
      shadow: 'hover',
    },
    rowKey: 'id',
  },
  toolbar: [
    { btnType: 'add', direction: 'left' },
    { btnType: 'batchDelete', direction: 'left' },
    { btnType: 'refresh', direction: 'right' },
  ],
  page: { size: 12, pageSizes: [12, 24, 48] },
  isStartGet: true,
}

const handleGetData = (pageInfo: PageInfo, formSearch: Record<string, any>, callback: (data?: TableData) => void) => {
  const records = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    cover: `https://picsum.photos/300/200?random=${i + 1}`,
    name: `商品${i + 1}`,
    price: `¥${(i + 1) * 99}`,
    status: i % 2 === 0 ? 1 : 0,
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

const handleSelectionChange = (selection: any[]) => {
  console.log('选中:', selection)
}
</script>
```

## 整体配置 CardListSetConfig

与 [TableSetConfig](./table.md#整体配置-tablesetconfig) 几乎一致，仅将 `table` 替换为 `cardList`，不支持 `customColumns` 和 `customSearch`。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `items` | 列配置数组（同时控制搜索栏、卡片、弹窗），复用 [TableColumn](./table.md#列配置-tablecolumn) | `TableColumn[]` | - |
| `cardList` | 卡片列表专用配置 | `CardListConfig` | - |
| `search` | 搜索栏配置（传 `false` 隐藏） | `FormConfig \| false` | - |
| `toolbar` | 工具栏按钮配置（传 `false` 隐藏） | `ToolbarButton[] \| false` | - |
| `page` | 分页配置（传 `false` 隐藏） | `PaginationProps \| false` | - |
| `dialog` | 弹窗配置（传 `false` 隐藏） | `DialogConfig \| false` | - |
| `isStartGet` | 是否自动加载数据 | `boolean` | `true` |
| `isSearchAndToolbarRow` | 搜索栏和工具栏是否同一行 | `boolean` | `false` |

::: tip 与 Table 的关系
`items`、`search`、`toolbar`、`page`、`dialog` 的配置方式与 HdiTable 完全一致，详情参考 [Table 文档](./table.md)。`TableColumn` 的 `type`、`tableCellType`、`bindCell`、操作列等配置在 CardList 中同样生效。
:::

## 卡片列表配置 CardListConfig

```ts
cardList: {
  grid: { cols: 4, gutter: 16 },
  card: {
    coverField: 'cover',
    titleField: 'name',
    descField: 'description',
    showFields: ['price', 'status'],
    shadow: 'hover',
    selectable: true,
    operatePosition: 'bottom',
  },
  rowKey: 'id',
  emptyText: '暂无数据',
}
```

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `grid` | 网格布局配置 | `CardGridConfig` | `{ cols: 4, gutter: 16 }` |
| `card` | 单卡片渲染配置 | `CardItemConfig` | `{ shadow: 'hover' }` |
| `rowKey` | 行数据唯一标识字段名 | `string` | `'id'` |
| `emptyText` | 空数据文案 | `string` | `'暂无数据'` |

## 网格布局 CardGridConfig

```ts
grid: {
  cols: 4,    // 每行列数
  gutter: 16, // 卡片间距 (px)
  xs: 1,      // <768px 时每行列数
  sm: 2,      // ≥768px
  md: 3,      // ≥992px
  lg: 4,      // ≥1200px
  xl: 6,      // ≥1920px
}
```

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `cols` | 每行列数 | `number` | `4` |
| `gutter` | 卡片间距 (px) | `number` | `16` |
| `xs` | `<768px` 时每行列数 | `number` | - |
| `sm` | `≥768px` 时每行列数 | `number` | - |
| `md` | `≥992px` 时每行列数 | `number` | - |
| `lg` | `≥1200px` 时每行列数 | `number` | - |
| `xl` | `≥1920px` 时每行列数 | `number` | - |

## 单卡片配置 CardItemConfig

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `coverField` | 封面图字段名（取 `row[coverField]`） | `string` | - |
| `coverPlaceholder` | 封面图占位提示 | `string` | `'暂无图片'` |
| `coverHeight` | 封面图高度 | `number \| string` | `180` |
| `coverFit` | 封面图 fit 模式 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |
| `titleField` | 标题字段名 | `string` | - |
| `descField` | 描述字段名 | `string` | - |
| `showFields` | 卡片内容区展示的字段 prop 列表 | `string[]` | 所有非特殊类型字段 |
| `shadow` | 卡片阴影 | `'always' \| 'hover' \| 'never'` | `'hover'` |
| `bodyStyle` | 卡片 body 样式 | `Record<string, any>` | - |
| `selectable` | 是否支持选择 | `boolean` | `false` |
| `operatePosition` | 操作按钮位置 | `'bottom' \| 'top'` | `'bottom'` |

## 插槽

CardList 提供多层级插槽，从粗粒度到细粒度：

| 插槽名 | 作用域参数 | 说明 |
|--------|-----------|------|
| `card` | `{ row, index }` | 完全替换卡片内容（最高优先级） |
| `card-cover` | `{ row, index }` | 替换封面图区域 |
| `card-title` | `{ row, index }` | 替换标题区域 |
| `card-desc` | `{ row, index }` | 替换描述区域 |
| `card-fields` | `{ row, index }` | 替换整个字段列表区域 |
| `card-operate` | `{ row, index }` | 替换操作按钮区域 |

此外，字段级别的插槽通过 `tableCellType: 'SLOT'` + `tableCellFormatter` 指定，与 [Table 单元格插槽](./table.md#单元格插槽) 用法一致。

### 完全自定义卡片

```vue
<HdiCardList :config="config" @getTableData="getData">
  <template #card="{ row, index }">
    <div class="custom-card">
      <img :src="row.cover" />
      <h3>{{ row.name }}</h3>
      <p>{{ row.description }}</p>
    </div>
  </template>
</HdiCardList>
```

### 自定义封面图

```vue
<HdiCardList :config="config" @getTableData="getData">
  <template #card-cover="{ row }">
    <video :src="row.videoUrl" controls />
  </template>
</HdiCardList>
```

### 字段级插槽

```vue
<HdiCardList :config="config" @getTableData="getData">
  <template #statusSlot="{ row }">
    <el-badge :type="row.status === 1 ? 'success' : 'danger'" :content="row.status === 1 ? '上架' : '下架'" />
  </template>
</HdiCardList>

<script setup>
const config = {
  items: [
    // ...
    {
      prop: 'status', label: '状态', type: 'select',
      tableCellType: 'SLOT',
      tableCellFormatter: 'statusSlot',
    },
  ],
}
</script>
```

## 事件

事件与 [Table 事件](./table.md#事件) 基本一致，额外支持以下事件：

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `selectionChange` | `(selection: any[])` | 卡片选择变化（不依赖 el-table） |
| `cardClick` | `(rowData: any, index: number)` | 卡片点击 |

其余事件（`getTableData`、`addSubmit`、`editSubmit`、`delSubmit`、`toolbarButtonClick`、`operateButtonClick`、`tableImport`、`tableExport`、`pageChange`）与 Table 完全一致，参考 [Table 事件文档](./table.md#事件)。

## 暴露方法

```ts
const cardListRef = ref()

// 刷新数据
cardListRef.value.refresh()

// 打开弹窗
cardListRef.value.openDialog('add')
cardListRef.value.openDialog('edit', row)
cardListRef.value.openDialog('view', row)

// 关闭弹窗
cardListRef.value.closeDialog()

// 手动触发搜索
cardListRef.value.searchSubmit({ name: '商品A' })

// 手动触发分页
cardListRef.value.pageChange(2, 12)

// 选择相关
cardListRef.value.clearSelection()
cardListRef.value.getSelectionRows()
cardListRef.value.toggleRowSelection(row, true)
cardListRef.value.toggleAllSelection()

// 关闭加载状态
cardListRef.value.closeTheLoading(true)
```

## 完整示例

```ts
const config: CardListSetConfig = {
  items: [
    { prop: 'id', label: 'ID', type: 'index', isSearch: false, isAdd: false, isEdit: false, isView: true },
    {
      prop: 'cover', label: '封面图', type: 'input',
      isSearch: false, isAdd: true, isEdit: true,
    },
    {
      prop: 'name', label: '名称', type: 'input',
      isSearch: true, isAdd: true, isEdit: true, isView: true,
      rules: [{ required: true, message: '请输入名称' }],
    },
    {
      prop: 'price', label: '价格', type: 'input',
      isSearch: false, isAdd: true, isEdit: true,
    },
    {
      prop: 'status', label: '状态', type: 'select',
      isSearch: true, isAdd: true, isEdit: true,
      options: 'product_status',
      tableCellType: 'TAG',
      bindCell: { type: { 1: 'success', 0: 'danger' } },
    },
    {
      prop: 'createTime', label: '创建时间', type: 'date',
      isSearch: false, isTable: true, isAdd: false, isEdit: false, isView: true,
      tableCellType: 'DATE',
      tableCellFormatter: 'YYYY-MM-DD',
    },
    {
      prop: 'operate', label: '操作', type: 'operate',
      options: [
        { btnType: 'view' },
        { btnType: 'edit' },
        { btnType: 'delete' },
      ],
    },
  ],
  cardList: {
    grid: {
      cols: 4,
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 6,
    },
    card: {
      coverField: 'cover',
      coverHeight: 160,
      coverFit: 'cover',
      titleField: 'name',
      descField: 'price',
      showFields: ['status', 'createTime'],
      selectable: true,
      shadow: 'hover',
      operatePosition: 'bottom',
    },
    rowKey: 'id',
    emptyText: '暂无商品',
  },
  search: { cols: 3 },
  toolbar: [
    { btnType: 'add', direction: 'left' },
    { btnType: 'batchDelete', direction: 'left' },
    { btnType: 'export', direction: 'left' },
    { btnType: 'refresh', direction: 'right' },
  ],
  page: {
    size: 12,
    pageSizes: [12, 24, 48, 96],
  },
  dialog: {
    width: '600px',
    closeOnClickModal: false,
    form: { cols: 2, labelWidth: '100px' },
  },
  isStartGet: true,
}
```
