# 表单组件使用说明文档

## 1. 组件介绍

本表单组件是一个基于 Element Plus 封装的动态表单生成器，支持通过配置快速生成复杂表单，具有以下特性：

- **动态表单生成**：通过配置数组快速生成表单
- **丰富的组件类型**：支持输入框、选择器、日期选择器等多种表单控件
- **表单项联动**：支持基于其他字段值的条件显示
- **表格样式表单**：支持以表格形式展示表单
- **表单验证**：集成 Element Plus 的表单验证功能
- **自定义组件**：支持插入自定义组件
- **灵活的布局**：支持多列布局、行内表单等多种布局方式

## 2. 安装和引入

### 2.1 安装依赖

```bash
# 安装 Element Plus
npm install element-plus

# 安装本组件库
# 假设已在项目中集成
```

### 2.2 引入组件

```typescript
import { CustomForm } from '@/components/form'
```

## 3. 基本使用

### 3.1 简单示例

```vue
<template>
  <CustomForm
    v-model="formData"
    :form="formConfig"
    @submit="handleSubmit"
    @reset="handleReset"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomForm } from '@/components/form'
import type { FormConfig } from '@/components/form/types'

const formData = ref({
  name: '',
  age: 0,
  gender: '',
  email: ''
})

const formConfig: FormConfig = {
  cols: 2,
  labelWidth: '100px',
  items: [
    {
      prop: 'name',
      type: 'input',
      label: '姓名',
      rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
    },
    {
      prop: 'age',
      type: 'input',
      label: '年龄',
      attrs: { type: 'number' },
      rules: [{ required: true, message: '请输入年龄', trigger: 'blur' }]
    },
    {
      prop: 'gender',
      type: 'select',
      label: '性别',
      options: 'gender',
      rules: [{ required: true, message: '请选择性别', trigger: 'change' }]
    },
    {
      prop: 'email',
      type: 'input',
      label: '邮箱',
      attrs: { type: 'email' },
      rules: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
    }
  ]
}

const handleSubmit = (data: any) => {
  console.log('提交数据:', data)
}

const handleReset = () => {
  console.log('表单重置')
}
</script>
```

### 3.2 表格样式表单

```vue
<template>
  <CustomForm
    v-model="formData"
    :form="formConfig"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomForm } from '@/components/form'
import type { FormConfig } from '@/components/form/types'

const formData = ref({
  name: '',
  age: 0,
  gender: '',
  email: ''
})

const formConfig: FormConfig = {
  isTable: true,
  cols: 2,
  items: [
    {
      prop: 'name',
      type: 'input',
      label: '姓名'
    },
    {
      prop: 'age',
      type: 'input',
      label: '年龄',
      attrs: { type: 'number' }
    },
    {
      prop: 'gender',
      type: 'select',
      label: '性别',
      options: 'gender'
    },
    {
      prop: 'email',
      type: 'input',
      label: '邮箱',
      attrs: { type: 'email' }
    }
  ]
}

const handleSubmit = (data: any) => {
  console.log('提交数据:', data)
}
</script>
```

## 4. 配置说明

### 4.1 表单配置（FormConfig）

| 参数                 | 类型 | 默认值 | 说明 |
|--------------------|------|------|------|
| disabled           | boolean | false | 是否禁用整个表单 |
| xGap               | number | 12 | 表单项之间的水平间距（px） |
| inline             | boolean | false | 是否为行内表单 |
| cols               | number | 2 | 一行展示的表单项个数 |
| isTable            | boolean | false | 是否以表格样式展示 |
| labelWidth         | string \| number | 'auto' | 标签宽度 |
| labelPosition      | string | 'right' | 标签位置（left/right/top） |
| labelSuffix        | string | '' | 标签后缀 |
| rules              | Record<string, any[]> | {} | 表单验证规则 |
| showSubmit         | boolean | true | 是否显示提交按钮 |
| showReset          | boolean | true | 是否显示重置按钮 |
| isReverseButton    | boolean | false | 是否调换提交和重置按钮位置 |
| submitButtonText   | string | '保存' | 提交按钮文字 |
| resetButtonText    | string | '重置' | 重置按钮文字 |
| btnsJustifyContent | string | 'center' | 按钮对齐方式 |
| validate           | ValidateFunction | - | 验证函数 |
| customClass        | string | '' | 表单自定义类名 |
| items              | FormItem[] | [] | 表单项配置 |
| attrs              | Record<string, any[]> | {} | 表单属性 |
| slots              | Record<string, any[]> | {} | 表单插槽配置 |
| events             | Record<string, any[]> | {} | 表单事件配置 |

### 4.2 表单项配置（FormItem）

| 参数 | 类型 | 说明                              |
|------|------|---------------------------------|
| prop | string | 字段名，相当于 el-form 中的 prop         |
| type | string \| any | 字段类型                            |
| label | string | 字段标签                            |
| desc | string | 标题中 tooltip,type=header时有效 |
| placeholder | string | 占位符                             |
| disabled | boolean | 是否禁用                            |
| attrs | Record<string, any> | Element Plus 组件属性               |
| events | Record<string, EventHandler> | Element Plus 组件事件               |
| component | Component | 自定义组件                           |
| options | any[] \| Record<string, any> \| string | 下拉选项（数组或字典 code）                |
| customClass | string | 表单项自定义类名                        |
| headerClassName | string | 标题自定义类名                         |
| children | FormItem[] | 子表单项                            |
| width | string | 表单项宽度                           |
| labelWidth | string | 标签宽度                            |
| rules | any[] | 校验规则                            |
| slots | Record<string, string> | 插槽配置                            |
| value | string | select 中下拉选项的选项值对应的字段           |
| label | string | select 中下拉选项的选项名对应的字段           |
| filterValues | any[] | checkbox 中需要过滤的选项               |
| mode | 'horizontal' \| 'vertical' | checkbox 显示模式                   |
| isLabelHasValue | boolean | 标签是否显示为值+标签的形式                  |
| unit | string | 单位，常用在 input 中                  |
| show | boolean \| ((formData: Record<string, any>) => boolean) | 是否显示                            |
| linkage | LinkageCondition \| LinkageCondition[] | 联动条件                            |

### 4.3 联动条件配置（LinkageCondition）

| 参数 | 类型 | 默认值 | 说明 |
|------|------|------|------|
| prop | string | - | 关联的字段名 |
| value | any | - | 关联字段的值 |
| operator | '==' \| '!=' \| '>' \| '<' \| '>=' \| '<=' \| 'includes' \| 'notIncludes' | '==' | 操作符 |

## 5. 支持的表单组件类型

| 组件类型 | 对应文件 | 说明 |
|---------|---------|------|
| input | input.vue | 输入框 |
| select | select.vue | 选择器 |
| select-group | select-group.vue | 分组选择器 |
| radio | radio.vue | 单选框 |
| radio-button | radio-button.vue | 单选按钮 |
| checkbox | checkbox.vue | 复选框 |
| checkbox-button | checkbox-button.vue | 复选按钮 |
| switch | switch.vue | 开关 |
| date | date.vue | 日期选择器 |
| time | time.vue | 时间选择器 |
| text-date | text-date.vue | 文本日期 |
| cascader | cascader.vue | 级联选择器 |
| upload | upload.vue | 文件上传 |
| color | color.vue | 颜色选择器 |
| slider | slider.vue | 滑块 |
| text | text.vue | 文本显示 |
| text-option | text-option.vue | 文本选项 |
| header | form-header.vue | 表头 |
| line | - | 分割线 |
| slot | - | 插槽 |

## 6. 高级功能

### 6.1 表单项联动

```vue
<template>
  <CustomForm
    v-model="formData"
    :form="formConfig"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomForm } from '@/components/form'
import type { FormConfig } from '@/components/form/types'

const formData = ref({
  type: '',
  email: '',
  phone: ''
})

const formConfig: FormConfig = {
  cols: 1,
  items: [
    {
      prop: 'type',
      type: 'select',
      label: '联系方式',
      options: [
        { label: '邮箱', value: 'email' },
        { label: '电话', value: 'phone' }
      ],
      rules: [{ required: true, message: '请选择联系方式', trigger: 'change' }]
    },
    {
      prop: 'email',
      type: 'input',
      label: '邮箱',
      attrs: { type: 'email' },
      rules: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
      linkage: {
        prop: 'type',
        value: 'email'
      }
    },
    {
      prop: 'phone',
      type: 'input',
      label: '电话',
      attrs: { type: 'tel' },
      rules: [{ required: true, message: '请输入电话', trigger: 'blur' }],
      linkage: {
        prop: 'type',
        value: 'phone'
      }
    }
  ]
}

const handleSubmit = (data: any) => {
  console.log('提交数据:', data)
}
</script>
```

### 6.2 自定义组件

```vue
<template>
  <CustomForm
    v-model="formData"
    :form="formConfig"
    @submit="handleSubmit"
  >
    <template #custom>
      <el-input v-model="formData.custom" placeholder="自定义组件"></el-input>
    </template>
  </CustomForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomForm } from '@/components/form'
import type { FormConfig } from '@/components/form/types'

const formData = ref({
  name: '',
  custom: ''
})

const formConfig: FormConfig = {
  cols: 2,
  items: [
    {
      prop: 'name',
      type: 'input',
      label: '姓名'
    },
    {
      prop: 'custom',
      type: 'slot',
      label: '自定义组件'
    }
  ]
}

const handleSubmit = (data: any) => {
  console.log('提交数据:', data)
}
</script>
```

### 6.3 嵌套表单项

```vue
<template>
  <CustomForm
    v-model="formData"
    :form="formConfig"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomForm } from '@/components/form'
import type { FormConfig } from '@/components/form/types'

const formData = ref({
  name: '',
  address: {
    province: '',
    city: '',
    detail: ''
  }
})

const formConfig: FormConfig = {
  cols: 1,
  items: [
    {
      prop: 'name',
      type: 'input',
      label: '姓名'
    },
    {
      prop: 'address',
      type: 'header',
      label: '地址信息',
      children: [
        {
          prop: 'address.province',
          type: 'input',
          label: '省份'
        },
        {
          prop: 'address.city',
          type: 'input',
          label: '城市'
        },
        {
          prop: 'address.detail',
          type: 'input',
          label: '详细地址'
        }
      ]
    }
  ]
}

const handleSubmit = (data: any) => {
  console.log('提交数据:', data)
}
</script>
```

## 7. 事件处理

### 7.1 表单事件

| 事件名 | 说明 | 回调参数 |
|-------|------|---------|
| update:modelValue | 表单数据变化时触发 | 表单数据对象 |
| submit | 表单提交时触发 | 表单数据对象 |
| reset | 表单重置时触发 | 表单数据对象 |
| validate | 表单验证时触发 | 验证结果 |

### 7.2 组件事件

可以在表单项的 `events` 属性中配置组件的事件处理函数：

```typescript
{
  prop: 'select',
  type: 'select',
  label: '选择器',
  options: [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' }
  ],
  events: {
    change: (value: any, option: any, item: any) => {
      console.log('选择值:', value)
      console.log('选择选项:', option)
      console.log('表单项配置:', item)
    }
  }
}
```

## 8. 表单验证

### 8.1 基本验证

可以在表单项的 `rules` 属性中配置验证规则：

```typescript
{
  prop: 'email',
  type: 'input',
  label: '邮箱',
  attrs: { type: 'email' },
  rules: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}
```

### 8.2 表单级验证

也可以在表单配置的 `rules` 属性中配置验证规则：

```typescript
const formConfig: FormConfig = {
  rules: {
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ]
  },
  items: [
    {
      prop: 'email',
      type: 'input',
      label: '邮箱',
      attrs: { type: 'email' }
    }
  ]
}
```

## 9. 常见问题

### 9.1 表单项不显示

- 检查 `type` 是否正确
- 检查 `show` 属性是否为 `false`
- 检查联动条件是否满足

### 9.2 表单验证不生效

- 确保表单项配置了 `prop` 属性
- 确保验证规则配置正确
- 检查是否触发了验证事件（如 blur、change）

### 9.3 自定义组件不显示

- 确保在 `CustomForm` 组件中定义了对应的插槽
- 确保 `type` 设置为 `'slot'`
- 确保插槽名称与 `prop` 属性值一致

## 10. 完整示例

```vue
<template>
  <div class="form-demo">
    <h2>表单组件示例</h2>
    <CustomForm
      v-model="formData"
      :form="formConfig"
      @submit="handleSubmit"
      @reset="handleReset"
    >
      <template #custom>
        <el-input v-model="formData.custom" placeholder="自定义插槽内容"></el-input>
      </template>
    </CustomForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomForm } from '@/components/form'
import type { FormConfig } from '@/components/form/types'

const formData = ref({
  name: '',
  age: 0,
  gender: '',
  email: '',
  birthday: '',
  hobby: [],
  agree: false,
  custom: ''
})

const formConfig: FormConfig = {
  cols: 2,
  labelWidth: '100px',
  showSubmit: true,
  showReset: true,
  submitButtonText: '提交',
  resetButtonText: '重置',
  items: [
    {
      prop: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名',
      rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
    },
    {
      prop: 'age',
      type: 'input',
      label: '年龄',
      attrs: { type: 'number', min: 0, max: 150 },
      rules: [{ required: true, message: '请输入年龄', trigger: 'blur' }]
    },
    {
      prop: 'gender',
      type: 'radio',
      label: '性别',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ],
      rules: [{ required: true, message: '请选择性别', trigger: 'change' }]
    },
    {
      prop: 'email',
      type: 'input',
      label: '邮箱',
      attrs: { type: 'email' },
      rules: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
      ]
    },
    {
      prop: 'birthday',
      type: 'date',
      label: '出生日期',
      rules: [{ required: true, message: '请选择出生日期', trigger: 'change' }]
    },
    {
      prop: 'hobby',
      type: 'checkbox',
      label: '爱好',
      options: [
        { label: '读书', value: 'reading' },
        { label: '运动', value: 'sports' },
        { label: '音乐', value: 'music' }
      ],
      rules: [{ required: true, message: '请选择至少一个爱好', trigger: 'change' }]
    },
    {
      prop: 'agree',
      type: 'switch',
      label: '同意协议',
      rules: [{ required: true, message: '请同意协议', trigger: 'change' }]
    },
    {
      prop: 'custom',
      type: 'slot',
      label: '自定义内容'
    }
  ]
}

const handleSubmit = (data: any) => {
  console.log('提交数据:', data)
  // 这里可以处理表单提交逻辑
}

const handleReset = () => {
  console.log('表单重置')
  // 这里可以处理表单重置逻辑
}
</script>

<style scoped>
.form-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #303133;
}
</style>
```

## 11. 总结

本表单组件提供了一种灵活、高效的方式来构建复杂的表单界面。通过简单的配置，您可以快速生成包含各种类型表单控件的表单，并支持表单验证、表单项联动等高级功能。

主要优势：
- **配置化开发**：通过 JSON 配置快速生成表单，减少重复代码
- **组件丰富**：支持多种表单控件类型
- **灵活布局**：支持多列布局、表格样式等多种展示方式
- **强大的联动功能**：支持基于其他字段值的条件显示
- **易于扩展**：支持自定义组件和插槽

通过本组件，您可以大大提高表单开发的效率，同时保持代码的可维护性和可扩展性。
