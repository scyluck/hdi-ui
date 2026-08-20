# Table 表格开发

本文档面向 **hdi-ui 框架的开发维护者**，介绍如何扩展表格单元格类型、工具栏按钮，以及表格内部弹窗的集成方式。

::: tip 配套使用文档
业务侧使用方式见 [Table 表格](/components/table)。
:::

## 目录结构

```
src/components/Table/
├── table-cell.vue     # 单元格渲染（tableCellType）
├── table-content.vue  # 表格主体 + enrichButton 按钮 enrichment
├── table-toolbar.vue  # 工具栏模板
├── dialog.vue          # Table 内置弹窗（包装 HdiFormDialog）
├── utils.ts            # 工具函数（formatTime / getTableCellDisplay 等）
└── const.ts            # 常量定义（defaultButtonMap 等）
```

## 新增表格单元格类型

Table 通过 `tableCellType` 控制单元格渲染方式。

### 现有类型

| tableCellType | 说明 | 渲染方式 |
|---------------|------|----------|
| `TAG` | 标签 | `<el-tag>` 包裹 |
| `SLOT` | 自定义插槽 | 通过 `tableCellFormatter` 指定插槽名 |
| `DATE` | 日期格式化 | 在 `getTableCellDisplay` 中处理 |
| `ENUM` | 枚举映射 | 在 `getTableCellDisplay` 中处理 |
| 不设置 | 默认 | `<span>` 纯文本 |

### 渲染逻辑位置

[table-cell.vue](file:///e:/hdi-ui/src/components/Table/table-cell.vue#L1-L17) 负责单元格渲染：

```vue
<el-tag v-if="column.tableCellType === 'TAG'" v-bind="getCellProps(column, row)">
  {{ getTableCellDisplay(column, row) }}
</el-tag>
<slot v-else-if="column.tableCellType === 'SLOT'" :name="column.tableCellFormatter" />
<span v-else v-bind="getCellProps(column, row)">
  {{ getTableCellDisplay(column, row) }}
</span>
```

`getTableCellDisplay`（[utils.ts](file:///e:/hdi-ui/src/components/Table/utils.ts)）负责值的格式化（DATE、ENUM 等）。

### 新增单元格类型示例（以 IMAGE 为例）

1. **修改 [table-cell.vue](file:///e:/hdi-ui/src/components/Table/table-cell.vue)**

   新增一个 `v-else-if` 分支：

```vue
<el-image
  v-else-if="column.tableCellType === 'IMAGE'"
  :src="row[column.prop]"
  :style="{ width: '40px', height: '40px' }"
  fit="cover"
/>
```

2. **在业务中使用**

```ts
{
  prop: 'avatar',
  label: '头像',
  type: 'input',
  isTable: true,
  tableCellType: 'IMAGE',
}
```

### 日期格式化的兼容

`getTableCellDisplay` 中处理 `DATE` 类型时支持 `YYYY-MM-DD` 与 `yyyy-MM-dd` 两种写法（[utils.ts](file:///e:/hdi-ui/src/components/Table/utils.ts) 会把大写 `Y` → `y`、`D` → `d` 统一）。新增日期相关单元格类型时若复用此函数，自动获得相同兼容性。

## 新增工具栏按钮

Table 工具栏通过 `toolbar` 配置，`btnType` 决定按钮类型。

### 现有按钮类型

| btnType | 说明 |
|---------|------|
| `add` | 新增（自动打开新增弹窗） |
| `batchDelete` | 批量删除（需选中行） |
| `import` | 导入 |
| `export` | 导出 |
| `refresh` | 刷新 |
| `custom` | 自定义（配合 `btnName`） |

### 按钮配置位置

- 默认按钮名称和图标：[const.ts](file:///e:/hdi-ui/src/components/Table/const.ts) 的 `defaultButtonMap`
- 按钮渲染逻辑：[table-content.vue](file:///e:/hdi-ui/src/components/Table/table-content.vue) 的 `enrichButton` 函数
- 工具栏模板：[table-toolbar.vue](file:///e:/hdi-ui/src/components/Table/table-toolbar.vue)

### 新增按钮类型示例（以 download 为例）

1. **修改 [const.ts](file:///e:/hdi-ui/src/components/Table/const.ts)** 的 `defaultButtonMap`：

```ts
export const defaultButtonMap: Record<string, ButtonConfig> = {
  // ... 已有按钮
  download: { btnName: '下载', icon: Download },  // 如需图标
}
```

2. **在业务中使用**

```ts
toolbar: [
  { btnType: 'download', direction: 'left' },
]
```

3. **处理点击事件**

   在业务中监听 `toolbarButtonClick` 事件：

```ts
const handleToolbarClick = (btn, callback) => {
  if (btn.btnType === 'download') {
    // 下载逻辑
    callback({ msg: '下载成功' })
  }
}
```

## 工具栏按钮图标约定

工具栏按钮仅当业务在 `defaultButtonMap` 或 `toolbar` 配置中显式配置 `icon` 属性时才显示图标。修改 `defaultButtonMap` 时若不希望默认显示图标，**不要**给 `icon` 赋值。

## 操作列按钮约定

操作列按钮必须配置在 `column.options` 字段下，**不是** `column.children`。新增操作列相关 API 或修改渲染逻辑时请保持此约定。

## 与 HdiFormDialog 集成

Table 内置 [dialog.vue](file:///e:/hdi-ui/src/components/Table/dialog.vue) 包装 [HdiFormDialog](file:///e:/hdi-ui/src/components/FormDialog/FormDialog.vue)，调用方式：

```ts
dialogRef.value.open({ type: 'add' | 'edit' | 'view', record })
```

- `addSubmit` / `editSubmit` 事件会自动转发到表格的 `addSubmit` / `editSubmit`
- 弹窗关闭后会触发表格刷新

修改 dialog.vue 时注意保持与 HdiFormDialog 的 `open()` 签名一致（详见 [FormDialog 开发指南](/dev/form-dialog)）。

## utils.ts 改动需重新构建

[utils.ts](file:///e:/hdi-ui/src/components/Table/utils.ts) 中的格式化逻辑（如日期格式）通过相对路径被业务项目引用，**修改后必须执行 `npm run build`** 才能让业务项目生效。修改完直接发布会让下游业务使用旧版逻辑，请务必走完整构建流程。
