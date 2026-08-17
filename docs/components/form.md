# Form 表单

业务级表单组件，基于 Element Plus `el-form` 封装，支持多种字段类型、字典数据、表单校验、字段联动、分组标题等。

## 基础用法

```vue

<template>
  <HdiForm
      ref="formRef"
      v-model="formData"
      :config="formConfig"
      @submit="handleSubmit"
      @reset="handleReset"
  />
</template>

<script setup lang="ts">
  import {ref} from 'vue'
  import {HdiForm} from 'hdi-ui'
  import type {FormConfig} from 'hdi-ui'

  const formRef = ref()
  const formData = ref({
    name: '',
    age: undefined,
    gender: 1,
  })

  const formConfig: FormConfig = {
    cols: 2,
    labelWidth: '80px',
    showSubmit: true,
    showReset: true,
    items: [
      {prop: 'name', label: '姓名', type: 'input', rules: [{required: true, message: '请输入姓名'}]},
      {prop: 'age', label: '年龄', type: 'input', attrs: {type: 'number'}},
      {
        prop: 'gender', label: '性别', type: 'select',
        options: [
          {label: '男', value: 1},
          {label: '女', value: 2},
        ],
      },
    ],
  }

  const handleSubmit = (data) => {
    console.log('提交:', data)
  }
  const handleReset = (data) => {
    console.log('重置:', data)
  }
</script>
```

## Props

### FormConfig 配置

| 属性                   | 说明                    | 类型                                                                                                                                       | 默认值        |
|----------------------|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------|------------|
| `items`              | 表单项配置数组               | `FormItem[]`                                                                                                                             | `[]`       |
| `cols`               | 每行显示的表单项数量            | `number`                                                                                                                                 | `2`        |
| `xGap`               | 表单项间距（px）             | `number`                                                                                                                                 | `12`       |
| `inline`             | 是否行内表单                | `boolean`                                                                                                                                | `false`    |
| `isTable`            | 是否以表格样式展示             | `boolean`                                                                                                                                | `false`    |
| `disabled`           | 是否禁用整个表单              | `boolean`                                                                                                                                | `false`    |
| `labelWidth`         | 标签宽度                  | `string \| number`                                                                                                                       | `'auto'`   |
| `labelPosition`      | 标签位置                  | `'left' \| 'right' \| 'top'`                                                                                                             | `'right'`  |
| `labelSuffix`        | 标签后缀                  | `string`                                                                                                                                 | `''`       |
| `showSubmit`         | 是否显示提交按钮              | `boolean`                                                                                                                                | `true`     |
| `showReset`          | 是否显示重置按钮              | `boolean`                                                                                                                                | `true`     |
| `isReverseButton`    | 是否调换按钮位置              | `boolean`                                                                                                                                | `false`    |
| `submitButtonText`   | 提交按钮文字                | `string`                                                                                                                                 | `'保存'`     |
| `resetButtonText`    | 重置按钮文字                | `string`                                                                                                                                 | `'重置'`     |
| `btnsJustifyContent` | 按钮对齐方式                | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly' \| 'start' \| 'end' \| 'left' \| 'right'` | `'center'` |
| `rules`              | 表单验证规则（按 prop 分组）     | `Record<string, any[]>`                                                                                                                  | `{}`       |
| `validate`           | 验证回调函数                | `ValidateFunction`                                                                                                                       | -          |
| `customClass`        | 自定义类名                 | `string`                                                                                                                                 | `''`       |
| `attrs`              | 按字段配置 Element Plus 属性 | `Record<string, Record<string, any>>`                                                                                                    | -          |
| `events`             | 按字段配置事件               | `Record<string, Record<string, Function>>`                                                                                               | -          |
| `slots`              | 按字段配置插槽               | `Record<string, Record<string, string>>`                                                                                                 | -          |

### FormItem 表单项配置

| 属性            | 说明                | 类型                         | 默认值     |
|---------------|-------------------|----------------------------|---------|
| `prop`        | 字段名               | `string`                   | -       |
| `type`        | 字段类型              | `string`                   | -       |
| `label`       | 字段标签              | `string`                   | -       |
| `desc`        | 标签 tooltip 提示     | `string`                   | -       |
| `placeholder` | 占位符               | `string`                   | 自动生成    |
| `disabled`    | 是否禁用              | `boolean`                  | `false` |
| `width`       | 表单项宽度             | `string`                   | -       |
| `labelWidth`  | 标签宽度              | `string`                   | -       |
| `rules`       | 校验规则              | `any[]`                    | -       |
| `options`     | 选项数据（数组或字典 code）  | `array \| string`          | -       |
| `component`   | 自定义组件             | `Component`                | -       |
| `attrs`       | Element Plus 控件属性 | `Record<string, any>`      | -       |
| `events`      | Element Plus 控件事件 | `Record<string, Function>` | -       |
| `slots`       | 控件插槽配置            | `Record<string, string>`   | -       |
| `customClass` | 自定义类名             | `string`                   | -       |
| `unit`        | 单位（如 "kg"、"元"）    | `string`                   | -       |
| `children`    | 子表单项（分组）          | `FormItem[]`               | -       |

### 联动配置

| 属性        | 说明         | 类型                                       | 默认值 |
|-----------|------------|------------------------------------------|-----|
| `show`    | 是否显示（支持函数） | `boolean \| ((formData) => boolean)`     | -   |
| `linkage` | 联动条件       | `LinkageCondition \| LinkageCondition[]` | -   |

`LinkageCondition` 结构：

```ts
{
  prop: string       // 关联的字段名
  value: any         // 期望的值
  operator ? : '==' | '!=' | '>' | '<' | '>=' | '<=' | 'includes' | 'notIncludes'
}
```

### 选项类字段通用配置（select / radio / radio-button / checkbox / checkbox-button）

| 属性            | 说明                     | 类型       | 默认值       |
|---------------|------------------------|----------|-----------|
| `selectValue` | 选项值字段名，用于读取每个选项的 value | `string` | `'value'` |
| `selectLabel` | 选项标签字段名，用于读取每个选项的显示文本  | `string` | `'label'` |

### Checkbox 专用配置

| 属性             | 说明       | 类型                           | 默认值 |
|----------------|----------|------------------------------|-----|
| `filterValues` | 需要过滤的选项值 | `any[]`                      | -   |
| `mode`         | 显示模式     | `'horizontal' \| 'vertical'` | -   |

## 字段类型

| type              | 说明     | 示例                                                                     |
|-------------------|--------|------------------------------------------------------------------------|
| `input`           | 输入框    | `{ type: 'input', prop: 'name', label: '姓名' }`                         |
| `select`          | 下拉选择   | `{ type: 'select', prop: 'city', label: '城市', options: [...] }`        |
| `select-group`    | 分组下拉   | `{ type: 'select-group', options: [{ label: '组1', options: [...] }] }` |
| `radio`           | 单选     | `{ type: 'radio', prop: 'gender', options: [...] }`                    |
| `radio-button`    | 按钮单选   | `{ type: 'radio-button', prop: 'type', options: [...] }`               |
| `checkbox`        | 多选     | `{ type: 'checkbox', prop: 'hobby', options: [...] }`                  |
| `checkbox-button` | 按钮多选   | `{ type: 'checkbox-button', prop: 'tags', options: [...] }`            |
| `switch`          | 开关     | `{ type: 'switch', prop: 'enabled' }`                                  |
| `date`            | 日期选择   | `{ type: 'date', prop: 'birthday' }`                                   |
| `time`            | 时间选择   | `{ type: 'time', prop: 'time' }`                                       |
| `cascader`        | 级联选择   | `{ type: 'cascader', prop: 'area', options: [...] }`                   |
| `slider`          | 滑块     | `{ type: 'slider', prop: 'progress' }`                                 |
| `color`           | 颜色选择   | `{ type: 'color', prop: 'color' }`                                     |
| `upload`          | 文件上传   | `{ type: 'upload', prop: 'file' }`                                     |
| `text`            | 纯文本展示  | `{ type: 'text', prop: 'name' }`                                       |
| `text-option`     | 文本选项展示 | `{ type: 'text-option', prop: 'status', options: [...] }`              |
| `text-date`       | 文本日期展示 | `{ type: 'text-date', prop: 'createTime' }`                            |
| `slot`            | 自定义插槽  | `{ type: 'slot', prop: 'custom' }`                                     |
| `header`          | 标题分组   | `{ type: 'header', label: '基本信息' }`                                    |
| `line`            | 分割线    | `{ type: 'line' }`                                                     |
| `hidden`          | 隐藏字段   | `{ type: 'hidden', prop: 'id' }`                                       |

## 字典选项

`options` 支持三种形式：

```ts
// 1. 数组（静态选项）
{
  prop: 'status', label
:
  '状态', type
:
  'select',
    options
:
  [
    {label: '启用', value: 1},
    {label: '禁用', value: 0},
  ],
}

// 2. 字符串（字典 code，自动请求）
{
  prop: 'status', label
:
  '状态', type
:
  'select',
    options
:
  'user_status',  // 自动调用 provideDictionary 配置的 fetcher
}

// 3. 自定义字段名
{
  prop: 'dept', label
:
  '部门', type
:
  'select',
    options
:
  [{name: '技术部', id: 1}, {name: '产品部', id: 2}],
    selectLabel
:
  'name',  // 指定 label 字段
    selectValue
:
  'id',    // 指定 value 字段
}
```

::: tip 字典前置配置
使用字典 code 前，需在入口文件配置 `provideDictionary({ fetcher })`，详见 [Dictionary 字典](./dictionary.md)。
:::

## 字段联动

### show 函数

通过 `show` 函数根据表单数据动态控制显示：

```ts
const formConfig = {
  items: [
    {
      prop: 'type', label: '类型', type: 'select', options: [
        {label: '个人', value: 'person'},
        {label: '企业', value: 'company'},
      ]
    },
    {
      prop: 'companyName', label: '公司名称', type: 'input',
      show: (data) => data.type === 'company',
    },
    {
      prop: 'personName', label: '姓名', type: 'input',
      show: (data) => data.type === 'person',
    },
  ],
}
```

### linkage 条件

通过 `linkage` 声明式配置联动：

```ts
const formConfig = {
  items: [
    {prop: 'country', label: '国家', type: 'select', options: [...]},
    {
      prop: 'province', label: '省份', type: 'select', options: [...],
      linkage: {prop: 'country', value: 'CN'},  // 仅当 country === 'CN' 时显示
    },
    {
      prop: 'city', label: '城市', type: 'select', options: [...],
      linkage: [
        {prop: 'country', value: 'CN'},
        {prop: 'province', value: 'GD', operator: '=='},
      ],  // 多条件同时满足时显示
    },
  ],
}
```

支持的 operator：`==`（默认）、`!=`、`>`、`<`、`>=`、`<=`、`includes`、`notIncludes`。

## 表单校验

```ts
const formConfig = {
  items: [
    {
      prop: 'username', label: '用户名', type: 'input',
      rules: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 3, max: 20, message: '长度 3-20 个字符', trigger: 'blur'},
      ],
    },
    {
      prop: 'email', label: '邮箱', type: 'input',
      rules: [
        {required: true, message: '请输入邮箱', trigger: 'blur'},
        {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
      ],
    },
  ],
  // 全局校验规则（按 prop 分组，与 item.rules 合并）
  rules: {
    username: [{pattern: /^[a-zA-Z0-9_]+$/, message: '只能包含字母数字下划线'}],
  },
}
```

## 分组标题

通过 `header` 和 `children` 实现分组：

```ts
const formConfig = {
  items: [
    {type: 'header', label: '基本信息'},
    {prop: 'name', label: '姓名', type: 'input'},
    {prop: 'age', label: '年龄', type: 'input'},
    {type: 'line'},
    {type: 'header', label: '联系方式'},
    {prop: 'phone', label: '手机号', type: 'input'},
    {prop: 'email', label: '邮箱', type: 'input'},
  ],
}
```

```ts
const formConfig = {
  items: [
    {
      type: 'header', label: '基本信息', children: [
        {prop: 'name', label: '姓名', type: 'input'},
        {prop: 'age', label: '年龄', type: 'input'},
      ]
    },
    {type: 'line'},
    {
      type: 'header', label: '联系方式', children: [
        {prop: 'phone', label: '手机号', type: 'input'},
        {prop: 'email', label: '邮箱', type: 'input'},
      ]
    },
  ],
}
```

## 自定义插槽

通过 `type: 'slot'` 使用自定义插槽：

```vue

<template>
  <HdiForm v-model="formData" :config="formConfig">
    <template #customField="{ data }">
      <el-input v-model="data.customField" type="textarea" :rows="3"/>
    </template>
  </HdiForm>
</template>

<script setup lang="ts">
  const formConfig = {
    items: [
      {prop: 'customField', label: '自定义', type: 'slot'},
    ],
  }
</script>
```

## 传递 Element Plus 属性

通过 `attrs` 透传属性到 Element Plus 控件：

```ts
const formConfig = {
  items: [
    {
      prop: 'remark', label: '备注', type: 'input',
      attrs: {
        type: 'textarea',
        rows: 4,
        maxlength: 200,
        showWordLimit: true,
      },
    },
    {
      prop: 'time', label: '时间', type: 'date',
      attrs: {
        type: 'datetimerange',
        'value-format': 'YYYY-MM-DD HH:mm:ss',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
      },
    },
  ],
}
```

也可在 FormConfig 层级按 prop 配置：

```ts
const formConfig = {
  items: [...],
  attrs: {
    remark: {type: 'textarea', rows: 4},
  },
}
```

## 事件

| 事件名                 | 参数           | 说明        |
|---------------------|--------------|-----------|
| `update:modelValue` | `(value)`    | 表单数据变化    |
| `submit`            | `(formData)` | 点击提交且校验通过 |
| `reset`             | `(formData)` | 点击重置      |

## 暴露方法

通过 `ref` 可调用：

```ts
const formRef = ref()

// 手动触发提交（会先校验）
formRef.value.submit()

// 手动重置
formRef.value.reset()

// 获取 el-form 实例（可调用 validate、clearValidate 等）
formRef.value.formRef
```

## 表格样式表单

设置 `isTable: true` 可渲染为表格样式的表单（常用于详情展示）：

```ts
const formConfig = {
  isTable: true,
  labelWidth: '120px',
  items: [
    {prop: 'name', label: '姓名', type: 'text'},
    {prop: 'age', label: '年龄', type: 'text'},
  ],
}
```
