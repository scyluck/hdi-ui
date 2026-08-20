# Directives 指令

Hdi UI 内置的全局指令，覆盖权限、复制、防抖、点击外部等高频业务场景。所有指令都通过 `app.use(HdiUi)` 注册，模板中可直接使用，无需 import。

## 指令总览

| 指令 | 作用 |
|------|------|
| `v-permission` | 权限控制：根据权限标识控制元素显示/禁用 |
| `v-copy` | 点击元素一键复制内容到剪贴板 |
| `v-debounce` | 防抖：合并连续触发，只在周期末（或开头）执行一次 |
| `v-click-outside` | 点击元素外部时触发回调 |

::: tip 全局注册开关
`app.use(HdiUi, { registerDirectives: false })` 可禁用全局指令注册，改由业务自行按需 import 单个指令对象（见文末「按需使用」）。
:::

---

## v-permission 权限控制

根据权限标识控制元素的渲染或禁用状态。

### 前置配置：设置权限 code 列表（推荐）

业务项目在登录拿到权限 code 列表后，直接调用 `setPermissions` 即可，`has`/`hasAll`/`hasAny`/`hasNone` 逻辑全部内置：

```ts
// 登录成功后
import { setPermissions, clearPermissionUtils } from 'hdi-ui'

// 1. 数组形式（最常用）
setPermissions(['user:list', 'user:add', 'user:edit'])

// 2. 也支持 Set / 拼接字符串
// setPermissions(new Set(['user:list', 'user:add']))
// setPermissions('user:list,user:add;user:edit')  // 默认按 ,;空格 等切分

// 登出时清空
clearPermissionUtils()
```

### 高级：自定义校验逻辑

如果权限判断不是简单的"code 是否存在于集合"（如需要调后端接口、判断角色层级等），可通过 `setPermissionUtils` 覆盖内置 checker：

```ts
import { setPermissionUtils } from 'hdi-ui'

// 覆盖单个或多个 checker，未覆盖的继续使用内置逻辑
setPermissionUtils({
  has: (value) => {
    // 例如：判断角色是否包含权限
    return currentUser.value?.roles?.some((r) => r.permissions.includes(value))
  },
})
```

::: warning 注意
未调用 `setPermissions` 且未自定义 checker 时，权限检查默认返回 `true`（全部放行）。这是为了让未启用权限系统的项目不受影响。请确保在登录态初始化后注入校验逻辑，否则权限指令不生效。
:::

### 用法：四种校验场景

```vue
<template>
  <!-- 1. 单权限：必须拥有 'user:add' -->
  <el-button v-permission="'user:add'" type="primary" @click="handleAdd">新增</el-button>

  <!-- 2. 多权限：必须同时拥有全部（默认 all 模式） -->
  <el-button v-permission="['user:add', 'user:edit']" @click="handleBatch">新增并编辑</el-button>

  <!-- 3. 任意权限：拥有其中任一即可（.any 修饰符） -->
  <el-button v-permission.any="['user:add', 'user:edit']" @click="handleAction">操作</el-button>

  <!-- 4. 排除权限：必须都不包含其中任一（.not 修饰符） -->
  <el-button v-permission.not="['user:admin']" @click="handleNormal">非管理员按钮</el-button>

  <!-- 显式声明 all 模式（与默认行为等价） -->
  <el-button v-permission.all="['user:add', 'user:edit']">显式 all</el-button>
</template>
```

### 用法：禁用而非移除

默认情况下无权限时元素会被移除（替换为注释占位，可恢复）。配合 `.disable` 修饰符可改为「禁用元素」：

```vue
<template>
  <!-- 无权限时元素被移除，DOM 中只剩注释占位 -->
  <el-button v-permission="'user:add'">新增（无权限则消失）</el-button>

  <!-- 无权限时元素保留但被禁用 -->
  <el-button v-permission.disable="'user:add'">新增（无权限则禁用）</el-button>

  <!-- 任意权限 + 禁用模式组合 -->
  <el-button v-permission.any.disable="['user:add', 'user:edit']">操作</el-button>
</template>
```

`disable` 模式下，指令会：
- 对原生表单元素（`button`/`input`/`select`/`textarea` 等）设置 `disabled` 属性
- 设置 `aria-disabled="true"`
- 添加 `hdi-permission-disabled` 类，并将 `pointer-events` 置为 `none`

::: tip 自定义禁用样式
`.hdi-permission-disabled` 类可被业务样式覆盖，例如调整禁用时的透明度或光标。
:::

### 响应式更新

`v-permission` 同时绑定 `mounted` 和 `updated`，权限标识变化后会重新评估：

```ts
// 切换账号、权限变化时直接重新设置
setPermissions(newPermissions)
```

::: warning 重新评估的触发条件
指令在 `binding.value` 变化或 Vue 触发 `updated` 时重新执行。`setPermissions` 调用本身不会自动触发已渲染元素的重新评估，需要业务侧通过响应式权限数据驱动（例如把权限挂在响应式 store 上，或调用后强制刷新路由）。
:::

---

## v-copy 一键复制

点击元素时把指定文本复制到剪贴板，自动适配安全上下文（`navigator.clipboard`）与非安全上下文（`execCommand` 回退）。

### 用法

```vue
<template>
  <!-- 1. 字符串：复制固定文本 -->
  <el-button v-copy="'Hello World'">复制固定文本</el-button>

  <!-- 2. 函数：动态返回要复制的文本 -->
  <el-button v-copy="() => formRef.value?.name">复制表单值</el-button>

  <!-- 3. 对象：配置成功/失败回调 -->
  <el-button
    v-copy="{
      text: () => currentRow.url,
      success: (text) => ElMessage.success(`已复制：${text}`),
      error: (err) => ElMessage.error(`复制失败：${err.message}`),
    }"
  >
    复制并提示
  </el-button>

  <!-- 4. 无值：复制元素自身的 textContent -->
  <span class="copyable" v-copy>这段文字可点击复制</span>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const currentRow = ref({ url: 'https://example.com' })
</script>
```

### 值类型

| 类型 | 说明 |
|------|------|
| `string` | 复制固定文本 |
| `() => string` | 点击时动态计算要复制的文本 |
| `{ text?, success?, error? }` | 对象形式，可配置文本与回调 |
| 不传 | 复制元素的 `textContent` |

回调签名：
- `success?: (text: string) => void`
- `error?: (err: Error) => void`

---

## v-debounce 防抖

将连续多次触发合并为一次执行。常用于搜索框按钮、表单提交、长按等场景。

### 用法

```vue
<template>
  <!-- 1. 默认：300ms 防抖，监听 click，尾部触发 -->
  <el-button v-debounce="handleSubmit">提交</el-button>

  <!-- 2. 通过 arg 指定延迟（ms） -->
  <el-button v-debounce:500="handleSubmit">500ms 提交</el-button>

  <!-- 3. 通过 modifier 指定事件名 -->
  <el-button v-debounce.mousedown="handlePress">长按</el-button>

  <!-- 4. 同时指定延迟与事件 -->
  <el-button v-debounce:500.mousedown="handlePress">500ms 长按</el-button>

  <!-- 5. 立即触发（leading）：进入周期立即执行一次 -->
  <el-button v-debounce.leading="handleSubmit">立即触发</el-button>

  <!-- 6. leading + trailing 组合：首尾各触发一次 -->
  <el-button v-debounce:500.leading.trailing="handleSubmit">首尾触发</el-button>

  <!-- 7. 对象形式：完整配置 -->
  <el-button
    v-debounce="{
      handler: handleSubmit,
      delay: 500,
      event: 'click',
      leading: true,
      trailing: false,
    }"
  >
    对象配置
  </el-button>
</template>

<script setup lang="ts">
const handleSubmit = () => {
  console.log('提交')
}
const handlePress = () => {
  console.log('长按')
}
</script>
```

### 参数说明

| 参数 | 来源 | 默认值 | 说明 |
|------|------|--------|------|
| `handler` | 绑定值（必填） | - | 防抖触发的回调 |
| `delay` | `arg` / 对象 | `300` | 延迟毫秒数 |
| `event` | 修饰符 / 对象 | `'click'` | 监听的事件名 |
| `leading` | `.leading` 修饰符 / 对象 | `false` | 进入周期是否立即触发一次 |
| `trailing` | `.trailing` 修饰符 / 对象 | `true` | 周期结束时是否触发尾部回调 |

### 触发矩阵

| `leading` | `trailing` | 行为 |
|-----------|------------|------|
| `false` | `true` | **默认**：连续触发只在最后一次后延迟执行一次 |
| `true` | `false` | 进入周期立即执行一次，期间被触发都忽略，周期结束后再次响应 |
| `true` | `true` | 进入周期立即执行一次，期间若有新触发，周期结束时再触发一次 |
| `false` | `false` | 不触发（不推荐） |

::: warning leading + trailing 行为细节
`leading=true, trailing=true` 时，进入周期立即触发（leading），若周期内又有新触发，周期结束时再触发一次（trailing）；若周期内无新触发，则不会重复触发。即「首尾触发」并非每次都执行两次，而是首部必触发、尾部按需触发。
:::

---

## v-click-outside 点击外部

点击元素外部时触发回调。

```vue
<template>
  <div ref="panelRef" v-click-outside="handleClickOutside">
    点击我外面会触发回调
  </div>
</template>

<script setup lang="ts">
const handleClickOutside = (event: MouseEvent) => {
  console.log('点击了元素外部', event.target)
}
</script>
```

---

## HdiPermission 权限包装组件

权限包装组件，与 `v-permission` 指令基于同一套权限校验逻辑，但以组件方式包裹内容，更适合多元素包裹、需要兜底内容、希望以声明式控制渲染的场景。

### 与指令的差异

| 场景 | `v-permission` 指令 | `HdiPermission` 组件 |
|------|---------------------|---------------------|
| 单元素 | ✓ | ✓ |
| 包裹多元素 | ✗（指令作用于单元素） | ✓ |
| 兜底内容 | 仅 `.disable` 模式禁用 | ✓ 支持 `#fallback` 插槽 |
| 禁用元素 | ✓ `.disable` 修饰符 | ✗（仅控制渲染） |
| 实现层 | 直接操作 DOM | 走 Vue 渲染树 |

### 用法

```vue
<template>
  <!-- 1. 单权限：必须拥有 -->
  <HdiPermission value="user:add">
    <el-button type="primary" @click="handleAdd">新增</el-button>
  </HdiPermission>

  <!-- 2. 多权限：必须全部拥有（默认 all） -->
  <HdiPermission :value="['user:add', 'user:edit']">
    <el-button @click="handleBatch">新增并编辑</el-button>
  </HdiPermission>

  <!-- 3. 任意权限：拥有其中任一即可 -->
  <HdiPermission :value="['user:add', 'user:edit']" mode="any">
    <el-button @click="handleAction">操作</el-button>
  </HdiPermission>

  <!-- 4. 排除权限：必须都不包含其中任一 -->
  <HdiPermission :value="['user:admin']" mode="none">
    <el-button @click="handleNormal">非管理员可见</el-button>
  </HdiPermission>

  <!-- 5. 无权限时显示兜底内容 -->
  <HdiPermission value="user:add">
    <el-button type="primary">新增</el-button>
    <template #fallback>
      <el-tag type="info">无新增权限</el-tag>
    </template>
  </HdiPermission>
</template>
```

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `string \| string[]` | — | 必填，权限标识 |
| `mode` | `'all' \| 'any' \| 'none'` | `'all'` | 校验模式 |

### Slots

| 名称 | 说明 |
|------|------|
| `default` | 有权限时渲染 |
| `fallback` | 无权限时渲染（可选，未传则不输出任何内容） |

### 程序化调用 hasPermission

如需在脚本中直接判断权限（路由守卫、条件分支等），可调用框架导出的 `hasPermission` 函数：

```ts
import { hasPermission } from 'hdi-ui'

if (hasPermission('user:add')) {
  // 拥有 user:add 权限
}

// 任意权限
if (hasPermission(['user:add', 'user:edit'], 'any')) {
  // ...
}

// 排除权限
if (hasPermission(['user:admin'], 'none')) {
  // 不包含 user:admin
}
```

参数签名：`hasPermission(value: string | string[], mode: 'all' | 'any' | 'none' = 'all'): boolean`，与组件 Props 一致。

---

## 按需使用

若不希望全局注册，可在 `app.use(HdiUi, { registerDirectives: false })` 后，于单个组件内直接 import 指令对象使用：

```vue
<template>
  <el-button v-permission="'user:add'" v-copy="copyText" v-debounce:500="submit">操作</el-button>
</template>

<script setup lang="ts">
import { vPermission, vCopy, vDebounce } from 'hdi-ui'

const copyText = 'some text'
const submit = () => {}
</script>
```

::: tip
Vue 3 中 `<script setup>` 内 import 的指令对象（以 `v` 开头）会自动作为指令可用，无需 `directives` 注册。
:::

---

## 开发说明

指令的设计约定、扩展方式、新增指令示例、与 `HdiPermission` 组件的关系等内容，面向框架维护者，详见 [Directives 指令开发](/dev/directives)。

