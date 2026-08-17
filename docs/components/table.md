# Table 表格

业务级表格组件，集成搜索栏、工具栏、表格、分页、新增/编辑/查看弹窗，一个配置完成完整的增删改查功能。

## 基础用法

```vue
<template>
  <div style="height: 100vh;">
    <HdiTable
      ref="tableRef"
      :config="config"
      @getTableData="handleGetData"
      @addSubmit="handleAdd"
      @editSubmit="handleEdit"
      @delSubmit="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { HdiTable } from 'hdi-ui'
import type { TableSetConfig, TableData, PageInfo } from 'hdi-ui'

const tableRef = ref()

const config: TableSetConfig = {
  items: [
    { prop: 'id', label: 'ID', type: 'index', isSearch: false, isAdd: false, isEdit: false, isView: true },
    {
      prop: 'name', label: '姓名', type: 'input',
      isSearch: true, isTable: true, isAdd: true, isEdit: true, isView: true,
    },
    {
      prop: 'status', label: '状态', type: 'select',
      isSearch: true, isTable: true, isAdd: true, isEdit: true,
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
    {
      prop: 'createTime', label: '创建时间', type: 'date',
      isTable: true, isAdd: false, isEdit: false,
      tableCellType: 'DATE',
      tableCellFormatter: 'YYYY-MM-DD',
    },
    {
      prop: 'operate', label: '操作', type: 'operate', isTable: true,
      options: [
        { btnType: 'edit' },
        { btnType: 'delete' },
      ],
    },
  ],
  toolbar: [
    { btnType: 'add', direction: 'left' },
    { btnType: 'batchDelete', direction: 'left' },
    { btnType: 'refresh', direction: 'right' },
  ],
  page: { size: 10, pageSizes: [10, 20, 50, 100] },
  isStartGet: true,
}

const handleGetData = (pageInfo: PageInfo, formSearch: Record<string, any>, callback: (data?: TableData) => void) => {
  const records = Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    status: i % 2 === 0 ? 1 : 0,
    createTime: new Date(Date.now() - i * 86400000).toISOString(),
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
</script>
```

## 整体配置 TableSetConfig

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `items` | 列配置数组（同时控制搜索栏、表格、弹窗） | `TableColumn[]` | - |
| `search` | 搜索栏配置（传 `false` 隐藏） | `FormConfig \| false` | - |
| `toolbar` | 工具栏按钮配置（传 `false` 隐藏） | `ToolbarButton[] \| false` | - |
| `table` | 表格配置 | `TableConfig` | - |
| `page` | 分页配置（传 `false` 隐藏） | `PaginationProps \| false` | - |
| `dialog` | 弹窗配置（传 `false` 隐藏） | `DialogConfig \| false` | - |
| `isStartGet` | 是否自动加载数据 | `boolean` | `true` |
| `isSearchAndToolbarRow` | 搜索栏和工具栏是否同一行 | `boolean` | `false` |

## 列配置 TableColumn

TableColumn 继承自 FormItem，同时增加以下属性：

### 显示控制

通过 `is*` 属性控制字段在各个区域的显示：

| 属性 | 说明 | 默认值 |
|------|------|--------|
| `isSearch` | 搜索栏显示 | `true` |
| `isTable` | 表格列显示 | `true` |
| `isAdd` | 新增弹窗显示 | `true` |
| `isEdit` | 编辑弹窗显示 | `true` |
| `isView` | 查看弹窗显示 | `true` |

```ts
{
  prop: 'createTime', label: '创建时间', type: 'date',
  isSearch: false,   // 搜索栏不显示
  isTable: true,     // 表格列显示
  isAdd: false,      // 新增弹窗不显示
  isEdit: false,     // 编辑弹窗不显示
  isView: true,      // 查看弹窗显示
}
```

### 列类型 type

除了 [Form 支持的所有类型](./form.md#字段类型)，Table 还支持：

| type | 说明 |
|------|------|
| `index` | 序号列 |
| `selection` | 多选列 |
| `expand` | 展开行 |
| `operate` | 操作列 |

### 单元格类型 tableCellType

| 值 | 说明 | tableCellFormatter |
|----|------|---------------------|
| `TEXT` | 纯文本（默认） | 无效 |
| `ENUM` | 枚举映射（根据 options 转换） | 无效 |
| `ENUMS` | 多值枚举（数组） | 分隔符，默认逗号 |
| `BOOLEAN` | 布尔值 | 显示文字，默认 "是,否" |
| `DATE` | 日期格式化 | 日期格式，默认 `YYYY-MM-DD HH:mm:ss` |
| `TAG` | 标签 | 无效 |
| `SLOT` | 自定义插槽 | 插槽名称 |

```ts
// 枚举映射
{
  prop: 'status', label: '状态', type: 'select',
  options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }],
  tableCellType: 'ENUM',  // 值 1 → 显示 "启用"
}

// 多值枚举
{
  prop: 'tags', label: '标签', type: 'checkbox',
  options: [...],
  tableCellType: 'ENUMS',             // [1, 3] → "标签1,标签3"
  tableCellFormatter: '、',           // 自定义分隔符
}

// 布尔值
{
  prop: 'enabled', label: '是否启用', type: 'switch',
  tableCellType: 'BOOLEAN',
  tableCellFormatter: '开启,关闭',    // 自定义显示文字
}

// 日期格式化
{
  prop: 'createTime', label: '创建时间', type: 'date',
  tableCellType: 'DATE',
  tableCellFormatter: 'YYYY-MM-DD',   // 支持 YYYY-MM-DD HH:mm:ss 等
}

// 标签
{
  prop: 'status', label: '状态', type: 'select',
  options: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 },
  ],
  tableCellType: 'TAG',
  bindCell: {
    type: { 1: 'success', 0: 'danger' },  // 值为 1 时 type=success
  },
}

// 自定义插槽
{
  prop: 'avatar', label: '头像', type: 'input',
  tableCellType: 'SLOT',
  tableCellFormatter: 'avatarSlot',  // 插槽名
}
```

### 单元格属性 bindCell

通过 `bindCell` 动态设置单元格属性（支持函数、对象映射、静态值）：

```ts
{
  prop: 'status', label: '状态', type: 'select',
  tableCellType: 'TAG',
  options: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 },
  ],
  bindCell: {
    // 对象映射：根据值查找
    type: { 1: 'success', 0: 'danger' },
    // 函数：接收 (value, row)
    effect: (val, row) => val === 1 ? 'light' : 'dark',
    // 静态值
    size: 'small',
  },
}
```

### 列属性 bindColumn

通过 `bindColumn` 透传属性到 `el-table-column`：

```ts
{
  prop: 'name', label: '姓名', type: 'input',
  bindColumn: {
    width: '200',
    fixed: 'left',
    showOverflowTooltip: true,
  },
}
```

## 操作列

操作列 `type: 'operate'`，按钮配置在 `options` 中：

```ts
{
  prop: 'operate', label: '操作', type: 'operate', isTable: true,
  options: [
    { btnType: 'view' },                                   // 查看（打开查看弹窗）
    { btnType: 'edit' },                                   // 编辑（打开编辑弹窗）
    { btnType: 'delete' },                                 // 删除（带确认弹窗）
    { btnType: 'custom', btnName: '复制', directive: { hasPermission: 'copy' } },  // 自定义
  ],
}
```

### 操作按钮配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `btnType` | 按钮类型 | `string` | - |
| `btnName` | 按钮名称 | `string` | 自动从 [const.ts](file:///e:/hdi-ui/src/components/Table/const.ts) 获取 |
| `icon` | 图标组件 | `Component` | 不显示 |
| `show` | 是否显示 | `boolean \| ((row) => boolean)` | `true` |
| `disabled` | 是否禁用 | `boolean \| ((row) => boolean)` | `false` |
| `btnBind` | 透传到 el-button 的属性 | `Record<string, any>` | - |
| `directive` | 权限指令配置 | `directiveConfig` | - |

```ts
// 条件显示
{
  btnType: 'custom', btnName: '审核',
  show: (row) => row.status === 'pending',
}

// 禁用
{
  btnType: 'custom', btnName: '编辑',
  disabled: (row) => row.status === 'locked',
}

// 自定义按钮样式
{
  btnType: 'custom', btnName: '下载',
  btnBind: { type: 'success', size: 'small' },
}
```

## 工具栏配置

```ts
toolbar: [
  { btnType: 'add', direction: 'left' },
  { btnType: 'batchDelete', direction: 'left' },
  { btnType: 'import', direction: 'left' },
  { btnType: 'export', direction: 'left' },
  { btnType: 'refresh', direction: 'right' },
  { btnType: 'custom', btnName: '自定义操作', direction: 'right' },
]
```

### 内置按钮类型

| btnType | 说明 | 触发事件 |
|---------|------|----------|
| `add` | 新增 | 打开新增弹窗 |
| `batchDelete` | 批量删除 | `delSubmit` |
| `import` | 导入 | `tableImport` |
| `export` | 导出 | `tableExport` |
| `refresh` | 刷新 | 重新加载数据 |
| `custom` | 自定义 | `toolbarButtonClick` |

### ToolbarButton 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `btnType` | 按钮类型 | `string` | - |
| `btnName` | 按钮名称 | `string` | 自动获取 |
| `icon` | 图标 | `Component` | 不显示 |
| `direction` | 位置（left 左侧 / right 右侧） | `'left' \| 'right'` | `'right'` |
| `show` | 是否显示 | `boolean \| ((row) => boolean)` | `true` |
| `disabled` | 是否禁用 | `boolean \| ((row) => boolean)` | `false` |
| `btnBind` | 透传到 el-button 的属性 | `Record<string, any>` | - |
| `isFold` | 是否折叠到下拉菜单 | `boolean` | `false` |
| `directive` | 权限指令配置 | `directiveConfig` | - |

## 表格配置 TableConfig

```ts
table: {
  rowKey: 'id',           // 行数据的 Key
  maxHeight: '400px',     // 表格最大高度
  tableBoxType: 'table',  // 'table' 使用组件 | 'slot' 使用自定义插槽
  tableAttrs: {           // 透传到 el-table 的属性
    border: true,
    stripe: true,
    'highlight-current-row': true,
  },
  tableEvents: {          // el-table 事件
    'row-click': (row) => console.log(row),
  },
  tableSlots: {},         // 自定义插槽
}
```

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `rowKey` | 行数据的 Key | `string` | `'id'` |
| `maxHeight` | 表格最大高度 | `string` | - |
| `tableBoxType` | 表格类型 | `'table' \| 'slot'` | `'table'` |
| `tableAttrs` | el-table 属性 | `Record<string, any>` | - |
| `tableEvents` | el-table 事件 | `Record<string, Function>` | - |
| `tableSlots` | 自定义插槽 | `Record<string, any>` | - |

## 分页配置

```ts
page: {
  size: 10,                              // 每页条数
  pageSizes: [10, 20, 50, 100],          // 可选每页条数
  layout: 'total, sizes, prev, pager, next, jumper',  // 布局
  background: true,                       // 是否带背景
  align: 'center',                        // 对齐方式
  hideOnSinglePage: false,                // 单页是否隐藏
}
```

传 `false` 隐藏分页：`page: false`

## 弹窗配置

```ts
dialog: {
  title: '自定义标题',          // 不设置则自动为 新增/编辑/查看
  width: '500px',              // 弹窗宽度
  closeOnClickModal: false,    // 点击遮罩不关闭
  closeOnPressEscape: true,    // ESC 关闭
  appendToBody: true,          // 是否追加到 body
  form: {                      // 弹窗内表单配置
    cols: 2,
    labelWidth: '100px',
  },
}
```

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `title` | 弹窗标题 | `string` | 自动（新增/编辑/查看） |
| `width` | 弹窗宽度 | `string` | `'50%'` |
| `height` | 弹窗高度 | `string` | - |
| `showClose` | 是否显示关闭按钮 | `boolean` | `true` |
| `closeOnClickModal` | 点击遮罩是否关闭 | `boolean` | - |
| `closeOnPressEscape` | ESC 是否关闭 | `boolean` | - |
| `appendToBody` | 是否追加到 body | `boolean` | - |
| `form` | 弹窗内表单配置（传 `false` 禁用表单） | `FormConfig \| false` | - |
| `slots` | 自定义插槽 | `Record<string, any>` | - |

## 事件

### 数据获取

```ts
// 获取表格数据（必须实现）
const handleGetData = (
  pageInfo: PageInfo,                              // 分页信息
  formSearch: Record<string, any>,                 // 搜索条件
  callback: (data?: TableData) => void             // 回调函数
) => {
  // 调用接口获取数据后，通过 callback 回传
  callback({
    records: [],      // 当前页数据
    totalNums: 0,     // 总条数
    totalPages: 0,    // 总页数
  })
}
```

### 增删改事件

所有事件通过 `callback` 通知组件操作结果。`callback` 返回 `false` 时**不刷新列表**，返回其他值时**刷新列表**。

```ts
// 新增提交
const handleAdd = (formData: any, callback: (result?: any) => void) => {
  api.add(formData).then(() => {
    callback({ msg: '新增成功' })  // 刷新列表
  }).catch(() => {
    callback(false)                // 不刷新列表
  })
}

// 编辑提交
const handleEdit = (formData: any, callback: (result?: any) => void) => {
  api.update(formData).then(() => callback({ msg: '编辑成功' }))
}

// 删除提交（单条和批量删除都走这个事件）
const handleDelete = (
  rows: any[],                 // 选中的行数据
  ids: any[],                  // 选中的行 ID 数组
  callback: (result?: any) => void
) => {
  api.delete(ids).then(() => callback({ msg: '删除成功' }))
}
```

### 工具栏事件

```ts
// 自定义工具栏按钮点击（内置按钮不触发此事件）
const handleToolbarClick = (btn: any, callback: (result?: any) => void) => {
  if (btn.btnType === 'custom') {
    // 处理自定义逻辑
    callback({ msg: '操作成功' })  // 刷新列表
    // callback(false)             // 不刷新
  }
}

// 导入
const handleImport = (
  callback: (info: any, type: 'Blob' | 'url', fileName?: string) => void,
  pageInfo: any,
  searchData: any
) => {
  // 处理导入逻辑
  callback({ msg: '导入成功' }, 'url')
}

// 导出
const handleExport = (pageInfo: any, searchData: any) => {
  // 处理导出逻辑
}

// 操作列按钮点击（view/edit/delete 为内置按钮，不触发此事件）
const handleOperateClick = (
  btn: any,
  row: any,
  callback: (result?: any) => void
) => {
  if (btn.btnType === 'custom') {
    callback({ msg: '操作成功' })
  }
}
```

### 事件总表

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `getTableData` | `(pageInfo, formSearch, callback)` | 获取表格数据 |
| `addSubmit` | `(formData, callback)` | 新增提交 |
| `editSubmit` | `(formData, callback)` | 编辑提交 |
| `delSubmit` | `(rows, ids, callback)` | 删除提交（单条和批量） |
| `toolbarButtonClick` | `(btn, callback)` | 自定义工具栏按钮点击 |
| `operateButtonClick` | `(btn, row, callback)` | 自定义操作列按钮点击 |
| `tableImport` | `(callback, pageInfo, searchData)` | 导入 |
| `tableExport` | `(pageInfo, searchData)` | 导出 |
| `pageChange` | `(currentPage, pageSize)` | 页码变化 |

## 暴露方法

```ts
const tableRef = ref()

// 刷新表格数据
tableRef.value.refresh()

// 关闭加载状态
tableRef.value.closeTheLoading(true)

// 打开弹窗
tableRef.value.openDialog('add')        // 新增
tableRef.value.openDialog('edit', row)  // 编辑
tableRef.value.openDialog('view', row)  // 查看

// 关闭弹窗
tableRef.value.closeDialog()

// 手动触发搜索
tableRef.value.searchSubmit({ name: '张三' })

// 手动触发分页
tableRef.value.pageChange(2, 10)

// el-table 方法
tableRef.value.clearSelection()
tableRef.value.getSelectionRows()
tableRef.value.toggleRowSelection(row, true)
tableRef.value.toggleAllSelection()
tableRef.value.setCurrentRow(row)

// 获取 el-table 实例
tableRef.value.getElTable()
```

## 自定义插槽

### 单元格插槽

通过 `tableCellType: 'SLOT'` 自定义单元格内容：

```vue
<template>
  <HdiTable :config="config" @getTableData="getData">
    <template #avatarSlot="{ row }">
      <el-image :src="row.avatar" style="width: 40px; height: 40px" fit="cover" />
    </template>
  </HdiTable>
</template>

<script setup lang="ts">
const config = {
  items: [
    {
      prop: 'avatar', label: '头像', type: 'input',
      tableCellType: 'SLOT',
      tableCellFormatter: 'avatarSlot',  // 插槽名
    },
  ],
}
</script>
```

### 表单插槽

搜索栏和弹窗中的表单也支持 `type: 'slot'`：

```vue
<HdiTable :config="config" @getTableData="getData">
  <template #customField="{ data }">
    <el-input v-model="data.customField" type="textarea" />
  </template>
</HdiTable>
```

### 自定义整个表格

设置 `table.tableBoxType: 'slot'` 可完全自定义表格内容：

```vue
<HdiTable :config="config" @getTableData="getData">
  <template #tableBox="{ data }">
    <!-- 自定义表格渲染，data 为表格数据 -->
    <div v-for="item in data" :key="item.id">
      {{ item.name }}
    </div>
  </template>
</HdiTable>
```

## 完整示例

```ts
const config: TableSetConfig = {
  items: [
    { prop: 'selection', type: 'selection', isSearch: false, isAdd: false, isEdit: false, isView: false },
    { prop: 'id', label: 'ID', type: 'index', isSearch: false, isAdd: false, isEdit: false, isView: true },
    {
      prop: 'name', label: '姓名', type: 'input',
      isSearch: true, isTable: true, isAdd: true, isEdit: true, isView: true,
      rules: [{ required: true, message: '请输入姓名' }],
    },
    {
      prop: 'status', label: '状态', type: 'select',
      isSearch: true, isTable: true, isAdd: true, isEdit: true,
      options: 'user_status',  // 字典 code
      tableCellType: 'TAG',
      bindCell: {
        type: { 1: 'success', 0: 'danger' },
      },
    },
    {
      prop: 'createTime', label: '创建时间', type: 'date',
      isSearch: false, isTable: true, isAdd: false, isEdit: false, isView: true,
      tableCellType: 'DATE',
      tableCellFormatter: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      prop: 'operate', label: '操作', type: 'operate', isTable: true,
      bindColumn: { fixed: 'right', width: '200' },
      options: [
        { btnType: 'view' },
        { btnType: 'edit' },
        { btnType: 'delete' },
        { btnType: 'custom', btnName: '复制', show: (row) => row.status === 1 },
      ],
    },
  ],
  search: { cols: 3 },
  toolbar: [
    { btnType: 'add', direction: 'left' },
    { btnType: 'batchDelete', direction: 'left' },
    { btnType: 'export', direction: 'left' },
    { btnType: 'refresh', direction: 'right' },
  ],
  table: {
    rowKey: 'id',
    maxHeight: 'calc(100vh - 280px)',
    tableAttrs: { border: true, stripe: true },
  },
  page: {
    size: 20,
    pageSizes: [10, 20, 50, 100],
  },
  dialog: {
    width: '600px',
    closeOnClickModal: false,
    form: { cols: 2, labelWidth: '100px' },
  },
  isStartGet: true,
}
```
