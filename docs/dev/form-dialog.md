# FormDialog 弹窗表单开发

本文档面向 **hdi-ui 框架的开发维护者**，介绍 `HdiFormDialog` 的实现要点与扩展点。

::: tip 配套使用文档
业务侧使用方式见 [FormDialog 弹窗表单](/components/form-dialog)。
:::

## 组件概述

`HdiFormDialog` 是对 `HdiForm` 的上层封装，组合了 Dialog/Drawer + Form + 提交/取消按钮，提供开箱即用的弹窗表单体验。

## 文件结构

```
src/components/FormDialog/
├── FormDialog.vue    # 主组件（Dialog + Drawer 双模式）
└── index.ts          # 导出 HdiFormDialog 组件和 DialogType 类型
```

## 核心实现

### 1. 双模式切换

通过 `mode` prop 切换 Dialog/Drawer：

```vue
<el-dialog v-if="mode === 'dialog'" v-model="visible" ...>
  <!-- HdiForm + footer -->
</el-dialog>
<el-drawer v-else v-model="visible" ...>
  <!-- HdiForm + footer -->
</el-drawer>
```

### 2. open() 方法

通过 `defineExpose` 暴露 `open` 方法，外部无需管理 `visible` 状态：

```ts
const open = (options: { type?: 'add' | 'edit' | 'view'; record?: any; title?: string; formData?: Record<string, any> }) => {
  const type = options.type || props.type || 'add'
  typeRef.value = type
  titleRef.value = options.title || ''
  recordRef.value = options.record || null

  if (type === 'add') {
    innerFormData.value = { ...(options.formData || props.formData || {}) }
  } else {
    innerFormData.value = { ...(options.record || props.formData || {}) }
  }

  visible.value = true
}
```

### 3. 按钮双层渲染防护

`mergedFormConfig` 强制将 `showSubmit` 和 `showReset` 置为 `false`，避免 HdiForm 内置按钮与 Dialog footer 按钮重复：

```ts
const mergedFormConfig = computed<FormConfig>(() => ({
  ...props.formConfig,
  showSubmit: false,
  showReset: false,
}))
```

### 4. 提交校验流程

```
点击提交 → handleSubmit()
  → formRef.formRef.validate()  // HdiForm 内部校验
    → 校验通过 → emit('submit', data, done)
      → 业务层处理 → done(true/false)
        → true: visible = false（弹窗关闭）
        → false: 不关闭（如校验失败）
    → 校验失败: 不触发 submit 事件
```

### 5. 生命周期清理

弹窗关闭后通过 `handleClosed` 重置所有状态：

```ts
const handleClosed = () => {
  typeRef.value = 'add'
  titleRef.value = ''
  recordRef.value = null
  innerFormData.value = {}
  emit('closed')
}
```

## 与 Table 集成

Table 的 [dialog.vue](file:///e:/hdi-ui/src/components/Table/dialog.vue) 包装了 `HdiFormDialog`，适配 Table 的 `openDialog` API：

```vue
<HdiFormDialog ref="formDialogRef" :form-config="formConfig" @submit="handleSubmit" @cancel="handleCancel" @closed="handleClosed">
  <template v-for="slot in slotNames" #[slot]="scope">
    <slot :name="slot" v-bind="scope" />
  </template>
</HdiFormDialog>
```

Table 通过 `dialogRef.value.open({ type, record })` 调用，自动处理：

- `addSubmit` / `editSubmit` 事件
- `add` / `edit` / `view` 弹窗类型切换
- 弹窗关闭后的表格刷新

## 扩展点

### 自定义弹窗内容

通过默认插槽在表单上方添加自定义内容：

```vue
<HdiFormDialog ref="dialogRef" :form-config="formConfig">
  <div class="custom-header">自定义标题区域</div>
</HdiFormDialog>
```

### 自定义按钮

通过 `hideFooter` 隐藏默认按钮，自行实现 footer：

```vue
<HdiFormDialog ref="dialogRef" :form-config="formConfig" :hide-footer="true">
  <template #footer>
    <el-button @click="dialogRef.close()">返回</el-button>
    <el-button type="danger" @click="handleDelete">删除</el-button>
    <el-button type="primary" @click="handleSubmit">保存</el-button>
  </template>
</HdiFormDialog>
```

### 多级弹窗

在 `submit` 回调中可以打开二级弹窗：

```ts
const handleSubmit = (data: any, done: (ok?: boolean) => void) => {
  ElMessageBox.confirm('确认提交？').then(() => {
    // 提交逻辑
    done(true)
  }).catch(() => {
    done(false)  // 用户取消，阻止关闭
  })
}
```

## 关键类型

```ts
// DialogType: 弹窗类型
type DialogType = 'add' | 'edit' | 'view'

// open 参数
interface OpenOptions {
  type?: DialogType
  record?: any
  title?: string
  formData?: Record<string, any>
}

// submit 事件回调
type SubmitHandler = (data: Record<string, any>, done: (ok?: boolean) => void) => void
```

## 修改注意事项

- 改动 `open()` 签名或 `submit` 事件回调时，必须同步 [Table/dialog.vue](file:///e:/hdi-ui/src/components/Table/dialog.vue) 的调用代码，否则 Table 内置弹窗会失效。
- `mergedFormConfig` 的 `showSubmit/showReset=false` 是防止按钮重复的关键，删除前请确认业务侧不再依赖 HdiForm 内置按钮。
