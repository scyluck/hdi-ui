# v-permission 权限控制

根据权限标识控制元素的渲染或禁用状态。

## 前置配置：设置权限 code 列表（推荐）

业务项目在登录拿到权限 code 列表后，直接调用 `setPermissions` 即可，`has`/`hasAll`/`hasAny`/`hasNone` 逻辑全部内置：

```ts
// 登录成功后
import {setPermissions, clearPermissionUtils} from 'hdi-ui'

// 1. 数组形式（最常用）
setPermissions(['user:list', 'user:add', 'user:edit'])

// 2. 也支持 Set / 拼接字符串
// setPermissions(new Set(['user:list', 'user:add']))
// setPermissions('user:list,user:add;user:edit')  // 默认按 ,;空格 等切分

// 登出时清空
clearPermissionUtils()
```

## 高级：自定义校验逻辑

如果权限判断不是简单的"code 是否存在于集合"（如需要调后端接口、判断角色层级等），可通过 `setPermissionUtils` 覆盖内置
checker：

```ts
import {setPermissionUtils} from 'hdi-ui'

// 覆盖单个或多个 checker，未覆盖的继续使用内置逻辑
setPermissionUtils({
  has: (value) => {
    // 例如：判断角色是否包含权限
    return currentUser.value?.roles?.some((r) => r.permissions.includes(value))
  },
})
```

::: warning 注意
未调用 `setPermissions` 且未自定义 checker 时，权限检查默认返回 `true`
（全部放行）。这是为了让未启用权限系统的项目不受影响。请确保在登录态初始化后注入校验逻辑，否则权限指令不生效。
:::

## 用法：四种校验场景

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

## 用法：禁用而非移除

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
- 添加 `hdi-permission-disabled` 类

element-plus的表单元素想通过权限控制禁用状态，可使用 hasPermission 函数：

```vue

import { hasPermission } from 'hdi-ui'

<template>
  <el-button :disabled="!hasPermission(['user:add', 'user:edit'], 'all')">新增</el-button>
</template>
```

::: tip 自定义禁用样式
`.hdi-permission-disabled` 类可被业务样式覆盖，例如调整禁用时的透明度或光标。
:::

## 响应式更新

`v-permission` 同时绑定 `mounted` 和 `updated`，权限标识变化后会重新评估：

```ts
// 切换账号、权限变化时直接重新设置
setPermissions(newPermissions)
```

::: warning 重新评估的触发条件
指令在 `binding.value` 变化或 Vue 触发 `updated` 时重新执行。`setPermissions`
调用本身不会自动触发已渲染元素的重新评估，需要业务侧通过响应式权限数据驱动（例如把权限挂在响应式 store 上，或调用后强制刷新路由）。
:::

## 页面刷新与权限持久化

权限 code 仅存储在内存中，**页面刷新后会丢失**。框架不内置 storage 持久化，业务侧需要自行处理。以下是推荐的完整方案。

### 方案一：Pinia + 持久化插件（推荐）

如果项目已使用 Pinia 管理用户状态，配合 `pinia-plugin-persistedstate` 即可自动持久化/恢复。

```ts
// stores/user.ts
import {defineStore} from 'pinia'
import {setPermissions, clearPermissionUtils} from 'hdi-ui'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '' as string,
    permissions: [] as string[],
  }),
  actions: {
    async login(credentials) {
      const {token, permissions} = await loginApi(credentials)
      this.token = token
      this.permissions = permissions
      // 同步到权限指令
      setPermissions(permissions)
    },
    logout() {
      this.token = ''
      this.permissions = []
      clearPermissionUtils()
    },
  },
  persist: {
    // 使用 pinia-plugin-persistedstate
    // 默认持久化到 localStorage
  },
})
```

```ts
// main.ts — 应用启动时恢复权限
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {setPermissions} from 'hdi-ui'
import {useUserStore} from './stores/user'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// pinia 插件会在 app.use(pinia) 后自动恢复持久化状态
// 从 store 中读取恢复后的 permissions，同步到权限指令
const userStore = useUserStore()
if (userStore.permissions.length) {
  setPermissions(userStore.permissions)
}
```

### 方案二：直接使用 localStorage

项目未使用 Pinia 或需要更轻量的方案时，可直接操作 `localStorage`。

```ts
// auth.ts
import {setPermissions, clearPermissionUtils} from 'hdi-ui'

const PERMISSIONS_KEY = 'app_permissions'

// 登录成功后
export async function login(credentials) {
  const {token, permissions} = await loginApi(credentials)
  localStorage.setItem('token', token)
  localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions))
  setPermissions(permissions)
}

// 应用启动 / 页面刷新后恢复
export function restorePermissions() {
  const raw = localStorage.getItem(PERMISSIONS_KEY)
  if (raw) {
    try {
      const permissions = JSON.parse(raw)
      setPermissions(permissions)
    } catch {
      localStorage.removeItem(PERMISSIONS_KEY)
    }
  }
}

// 登出
export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem(PERMISSIONS_KEY)
  clearPermissionUtils()
}
```

```ts
// main.ts — 应用启动时调用恢复
import {restorePermissions} from './auth'

restorePermissions()
```

### 完整流程对比

| 阶段   | 内存（`setPermissions`）          | 持久化（Pinia / localStorage）                  |
|------|-------------------------------|--------------------------------------------|
| 登录成功 | ✅ 调用 `setPermissions(codes)`  | ✅ 写入 store / storage                       |
| 页面刷新 | ❌ 内存丢失                        | ✅ 从 store / storage 恢复后调用 `setPermissions` |
| 权限变化 | ✅ 重新调用 `setPermissions`       | ✅ 同步更新 store / storage                     |
| 登出   | ✅ 调用 `clearPermissionUtils()` | ✅ 清理 store / storage                       |

::: tip 为什么框架不内置持久化
权限 code 属于登录态信息，通常已在业务的 user store 中处理（Pinia + 持久化插件），框架层重复写容易与业务状态不同步。此外，SSR
环境和隐私模式下 storage 行为不一致，交给业务统一管理更可控。
:::

---

## HdiPermission 权限包装组件

权限包装组件，与 `v-permission` 指令基于同一套权限校验逻辑，但以组件方式包裹内容，更适合多元素包裹、需要兜底内容、希望以声明式控制渲染的场景。

### 与指令的差异

| 场景    | `v-permission` 指令 | `HdiPermission` 组件  |
|-------|-------------------|---------------------|
| 单元素   | ✓                 | ✓                   |
| 包裹多元素 | ✗（指令作用于单元素）       | ✓                   |
| 兜底内容  | 仅 `.disable` 模式禁用 | ✓ 支持 `#fallback` 插槽 |
| 禁用元素  | ✓ `.disable` 修饰符  | ✗（仅控制渲染）            |
| 实现层   | 直接操作 DOM          | 走 Vue 渲染树           |

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
  <HdiPermission :value="['user:admin']" mode="not">
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

| 参数      | 类型                        | 默认值     | 说明      |
|---------|---------------------------|---------|---------|
| `value` | `string \| string[]`      | —       | 必填，权限标识 |
| `mode`  | `'all' \| 'any' \| 'not'` | `'all'` | 校验模式    |

### Slots

| 名称         | 说明                    |
|------------|-----------------------|
| `default`  | 有权限时渲染                |
| `fallback` | 无权限时渲染（可选，未传则不输出任何内容） |

---

## 程序化调用 hasPermission

如需在脚本中直接判断权限（路由守卫、条件分支等），可调用框架导出的 `hasPermission` 函数：

```ts
import {hasPermission} from 'hdi-ui'

if (hasPermission('user:add')) {
  // 拥有 user:add 权限
}

// 任意权限
if (hasPermission(['user:add', 'user:edit'], 'any')) {
  // ...
}

// 排除权限
if (hasPermission(['user:admin'], 'not')) {
  // 不包含 user:admin
}
```

参数签名：`hasPermission(value: string | string[], mode: 'all' | 'any' | 'not' = 'all'): boolean`，与组件 Props 一致。
