# FormDialog 弹窗表单

`HdiFormDialog` 是对 `HdiForm` 的封装，提供「弹窗/抽屉 + 表单 + 提交/取消」的开箱即用组合。支持 `open({ type, record })` 直接唤起，无需手动管理 `visible`、`formData`、`loading` 等状态。

## 特性

- 🎯 **一键唤起**：`ref.open({ type: 'add' })` 即可打开弹窗
- 🔄 **三种模式**：`add`（新增）/`edit`（编辑）/`view`（查看），自动切换标题和禁用状态
- 📋 **Dialog / Drawer** 双模式：支持弹窗和抽屉两种展示形式
- ✅ **内置校验**：提交时自动调用表单 `validate`
- 🎨 **按钮统一**：Dialog footer 提供提交/取消按钮，不重复渲染表单内置按钮
- 🔌 **插槽透传**：所有 HdiForm 支持的插槽均可透传使用

## 基础用法

### Dialog 弹窗模式

```vue
<template>
  <HdiFormDialog
    ref="dialogRef"
    :form-config="formConfig"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
  <el-button type="primary" @click="dialogRef.open({ type: 'add' })">
    新增
  </el-button>
  <el-button @click="dialogRef.open({ type: 'edit', record: row })">
    编辑
  </el-button>
  <el-button @click="dialogRef.open({ type: 'view', record: row })">
    查看
  </el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HdiFormDialog } from 'hdi-ui'
import type { FormConfig } from 'hdi-ui'
import { ElMessage } from 'element-plus'

const dialogRef = ref()

const formConfig: FormConfig = {
  items: [
    { prop: 'name', label: '姓名', type: 'input', rules: [{ required: true, message: '请输入姓名' }] },
    { prop: 'age', label: '年龄', type: 'input', attrs: { type: 'number' } },
    {
      prop: 'gender', label: '性别', type: 'select',
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
    { prop: 'remark', label: '备注', type: 'textarea', cols: 2 },
  ],
  cols: 2,
  labelWidth: '80px',
}

const handleSubmit = (data: Record<string, any>, done: (ok?: boolean) => void) => {
  // data: 表单提交数据（已合并 record 中的原始字段）
  // done(true): 关闭弹窗；done(false): 阻止关闭
  console.log('提交:', data)
  ElMessage.success('保存成功')
  done(true)
}

const handleCancel = () => {
  console.log('取消')
}
</script>
```

### Drawer 抽屉模式

```vue
<HdiFormDialog
  ref="drawerRef"
  mode="drawer"
  :form-config="formConfig"
  @submit="handleSubmit"
/>
```

## 在 Table 中使用

`HdiTable` 已内置 `HdiFormDialog`，配置 `toolbar` 即可使用：

```vue
<template>
  <HdiTable
    ref="tableRef"
    :config="tableConfig"
    @getTableData="fetchList"
    @addSubmit="handleAdd"
    @editSubmit="handleEdit"
    @delSubmit="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HdiTable } from 'hdi-ui'
import type { TableSetConfig, TableData, PageInfo } from 'hdi-ui'
import { ElMessage } from 'element-plus'

const tableRef = ref()
const list = ref([
  { id: 1, name: '张三', phone: '13800000001', dept: '研发部' },
  { id: 2, name: '李四', phone: '13800000002', dept: '市场部' },
])

const tableConfig: TableSetConfig = {
  items: [
    { prop: 'name', label: '姓名', type: 'input', tableCellType: 'TEXT', isSearch: true },
    { prop: 'phone', label: '手机号', type: 'input', tableCellType: 'TEXT' },
    { prop: 'dept', label: '部门', type: 'select',
      options: [
        { label: '研发部', value: '研发部' },
        { label: '市场部', value: '市场部' },
      ],
      tableCellType: 'TAG',
    },
  ],
  toolbar: [
    { btnType: 'add', btnName: '新增', direction: 'left' },
    { btnType: 'batchDelete', btnName: '批量删除', direction: 'left' },
  ],
  page: { size: 10 },
  // 弹窗配置（可选）
  dialog: {
    width: '600px',
    form: { cols: 2, labelWidth: '80px' },
  },
}

const fetchList = (page: PageInfo, search: Record<string, any>, callback: (data: TableData) => void) => {
  callback({
    records: list.value,
    totalNums: list.value.length,
    totalPages: 1,
  })
}

const handleAdd = (data: any, done: (ok?: boolean) => void) => {
  const newId = list.value.length + 1
  list.value.push({ ...data, id: newId })
  ElMessage.success('新增成功')
  done(true)
}

const handleEdit = (data: any, done: (ok?: boolean) => void) => {
  const idx = list.value.findIndex(item => item.id === data.id)
  if (idx > -1) {
    list.value[idx] = { ...list.value[idx], ...data }
    ElMessage.success('修改成功')
    done(true)
  } else {
    ElMessage.error('未找到数据')
    done(false)  // 阻止关闭
  }
}

const handleDelete = (row: any, ids: any[], callback: (info?: any) => void) => {
  ids.forEach(id => {
    const idx = list.value.findIndex(item => item.id === id)
    if (idx > -1) list.value.splice(idx, 1)
  })
  callback({ msg: '删除成功' })
}
</script>
```

## 自定义按钮

`HdiFormDialog` 不再使用 Dialog footer 渲染按钮，而是使用 `HdiForm` 自带的按钮组（`showSubmit`/`showReset`），通过 `btnsJustifyContent` 控制对齐方式。所有 HdiForm 的按钮插槽（`#btn-prefix` / `#btn-suffix`）均可透传使用。

### 按钮对齐方式

通过 `footer-align` 控制按钮组对齐方式，映射到 HdiForm 的 `btnsJustifyContent`：

```vue
<!-- 居中对齐 -->
<HdiFormDialog footer-align="center" />

<!-- 两端对齐（左侧放额外按钮，右侧放提交/取消） -->
<HdiFormDialog footer-align="space-between">
  <template #btn-prefix="{ submit }">
    <el-button type="danger">删除</el-button>
  </template>
</HdiFormDialog>
```

可选值：`flex-start` / `flex-end`（默认）/ `center` / `space-between` / `space-around` / `space-evenly` / `start` / `end`

### 增加额外按钮（btn-prefix / btn-suffix 插槽）

通过 `#btn-prefix` 或 `#btn-suffix` 插槽在默认按钮前后插入额外按钮：

```vue
<HdiFormDialog
  ref="dialogRef"
  footer-align="space-between"
  :form-config="formConfig"
  @submit="handleSubmit"
>
  <!-- 在提交/取消按钮前插入额外按钮 -->
  <template #btn-prefix="{ submit, reset, isView }">
    <el-button v-if="!isView" type="success" @click="handleSaveAndContinue">
      保存并继续
    </el-button>
    <el-button v-if="!isView" type="danger" @click="handleDelete">
      删除
    </el-button>
  </template>
</HdiFormDialog>
```

效果（`footer-align="space-between"`）：`[保存并继续] [删除]                    [取消] [保存]`

> 注意：`isReverseButton` 默认为 `true`，按钮顺序为「取消 | 保存」，符合弹窗习惯。

### 插槽作用域参数

`#btn-prefix` 和 `#btn-suffix` 插槽提供以下参数：

| 参数 | 类型 | 说明 |
|------|------|------|
| submit | `() => void` | 触发提交（自动校验表单） |
| reset | `() => void` | 触发重置/取消 |

## 自定义控件插槽

`HdiFormDialog` 支持透传所有 HdiForm 的控件插槽，例如自定义 upload 的 trigger：

```vue
<HdiFormDialog ref="dialogRef" :form-config="formConfig" @submit="handleSubmit">
  <template #avatarTrigger>
    <el-button plain>点击上传头像</el-button>
  </template>
</HdiFormDialog>
```

```ts
const formConfig: FormConfig = {
  items: [
    {
      prop: 'avatar', label: '头像', type: 'upload',
      slots: { trigger: 'avatarTrigger' },
      attrs: { limit: 1, fileType: 'PNG,JPG,JPEG', 'list-type': 'picture-card' },
    },
  ],
}
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| mode | `'dialog' \| 'drawer'` | `'dialog'` | 弹窗模式 |
| type | `'add' \| 'edit' \| 'view'` | `'add'` | 弹窗类型（open 时可覆盖） |
| title | `string` | `''` | 自定义标题（open 时可覆盖），未设置时根据 type 自动生成 |
| width | `string` | `'50%'` | 弹窗宽度或抽屉宽度 |
| formConfig | `FormConfig` | `{ items: [] }` | 表单配置，同 HdiForm |
| formData | `Record<string, any>` | `{}` | 新增时的默认表单数据 |
| loading | `boolean` | `false` | 提交加载状态 |
| appendToBody | `boolean` | `false` | 是否挂载到 body |
| direction | `'rtl' \| 'ltr' \| 'ttb' \| 'btt'` | `'rtl'` | 抽屉方向（仅 drawer 模式） |
| footerAlign | `BtnsJustifyContent` | `'flex-end'` | 按钮组对齐方式，映射到 formConfig.btnsJustifyContent |
| submitText | `string` | `'保存'` | 提交按钮文案 |
| cancelText | `string` | `'取消'` | 取消按钮文案 |

## 事件

| 事件 | 参数 | 说明 |
|------|------|------|
| submit | `(data: Record<string, any>, done: (ok?: boolean) => void)` | 表单提交事件。`done(true)` 关闭弹窗，`done(false)` 阻止关闭 |
| cancel | `(data?: Record<string, any>)` | 取消/重置按钮点击事件 |
| closed | — | 弹窗完全关闭后触发 |

## 暴露方法

通过 `ref` 调用：

```ts
const dialogRef = ref()

// 打开弹窗
dialogRef.value?.open({
  type: 'add' | 'edit' | 'view',
  record?: any,                    // 编辑/查看时的行数据
  title?: string,                  // 自定义标题
  formData?: Record<string, any>,  // 新增时的初始数据
})

// 关闭弹窗
dialogRef.value?.close()

// 获取内部 HdiForm 实例
dialogRef.value?.formRef
```

### open 参数详解

| 参数 | 类型 | 说明 |
|------|------|------|
| type | `'add' \| 'edit' \| 'view'` | 弹窗类型。`add` 新增、`edit` 编辑、`view` 查看（自动禁用） |
| record | `any` | 编辑/查看时的行数据，会自动填充到表单中 |
| title | `string` | 自定义标题。不传则根据 type 自动生成（新增/编辑/查看） |
| formData | `Record<string, any>` | 新增时的初始数据。仅在 `type === 'add'` 时生效 |

## 使用场景示例

### 场景一：新增用户

```ts
dialogRef.value?.open({ type: 'add' })
// 效果：标题"新增"，表单空白，可编辑
```

### 场景二：编辑用户

```ts
dialogRef.value?.open({ type: 'edit', record: { id: 1, name: '张三', phone: '13800000001' } })
// 效果：标题"编辑"，表单回填行数据，可修改
```

### 场景三：查看详情

```ts
dialogRef.value?.open({ type: 'view', record: user })
// 效果：标题"查看"，表单自动禁用，隐藏提交按钮
```

### 场景四：带初始数据的新增

```ts
dialogRef.value?.open({
  type: 'add',
  formData: { dept: '研发部', level: 'P6' },
})
// 效果：标题"新增"，表单预填部门和级别
```

### 场景五：自定义标题

```ts
dialogRef.value?.open({
  type: 'edit',
  record: row,
  title: '修改用户信息',
})
// 效果：标题"修改用户信息"，而非默认的"编辑"
```

### 场景六：提交失败阻止关闭

```ts
const handleSubmit = (data: any, done: (ok?: boolean) => void) => {
  if (!data.email.includes('@')) {
    ElMessage.error('邮箱格式不正确')
    done(false)  // 阻止关闭，用户可继续修改
    return
  }
  ElMessage.success('保存成功')
  done(true)
}
```

### 场景七：编辑弹窗带删除按钮

使用 `footer-align="space-between"` 配合 `#btn-prefix` 插槽，实现左侧删除、右侧保存的布局：

```vue
<HdiFormDialog
  ref="dialogRef"
  footer-align="space-between"
  :form-config="formConfig"
  @submit="handleSubmit"
>
  <template #btn-prefix>
    <el-button type="danger" @click="handleDelete">删除</el-button>
  </template>
</HdiFormDialog>
```

效果：`[删除]                                          [取消] [保存]`

### 场景八：保存并继续新增

通过 `#btn-prefix` 插槽在按钮组前面添加"保存并继续"按钮：

```vue
<HdiFormDialog ref="dialogRef" :form-config="formConfig" @submit="handleSubmit">
  <template #btn-prefix="{ submit }">
    <el-button type="success" @click="handleSaveAndContinue(submit)">
      保存并继续
    </el-button>
  </template>
</HdiFormDialog>
```

## 注意事项

::: warning 不要手动设置 visible
`HdiFormDialog` 内部管理 `visible` 状态，请通过 `ref.open()` 打开，`ref.close()` 关闭。
:::

::: tip 按钮行为
按钮组由 HdiForm 自带的按钮组渲染（`showSubmit` / `showReset`），`mergedFormConfig` 会自动配置：
- `showSubmit`: 非 view 模式下为 `true`
- `showReset`: 始终为 `true`（用作取消按钮）
- `isReverseButton`: `true`（按钮顺序为「取消 | 保存」）
- `submitButtonText` / `resetButtonText`: 由 `submitText` / `cancelText` props 控制
- `btnsJustifyContent`: 由 `footerAlign` prop 控制

请勿在 `formConfig` 中覆盖这些配置，否则会与 Dialog 行为冲突。
:::

::: tip TypeScript 类型
可从 `hdi-ui` 导入 `DialogType` 类型：
```ts
import type { DialogType } from 'hdi-ui'
```
:::
