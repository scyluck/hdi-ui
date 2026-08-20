# Directives 指令开发

本文档面向 **hdi-ui 框架的开发维护者**，介绍如何扩展与维护内置指令。

::: tip 配套使用文档
业务侧使用方式见 [Directives 指令](/components/directives)。
:::

## 目录结构

```
src/directives/
├── index.ts          # 聚合导出 + registerDirectives 全局注册
├── click-outside.ts  # v-click-outside 指令
├── permission.ts     # v-permission 指令 + 权限工具（setPermissions/getPermissions/setPermissionUtils/clearPermissionUtils/hasPermission）
├── copy.ts           # v-copy 指令
└── debounce.ts       # v-debounce 指令
```

## 设计约定

1. **每个指令独立成文件**，文件名与指令名一一对应（`v-permission` → `permission.ts`）。
2. **指令对象命名**采用 Vue 3 推荐的 `vXxx` 形式（如 `vPermission`、`vCopy`、`vDebounce`），便于 `<script setup>` 直接 import 使用。
3. **元素扩展属性**统一挂在指令对应的 `_xxx` 私有字段上（如 `_permissionPlaceholder`、`_copyHandler`、`_debounceTimer`），并在 `unmounted` 中清理，避免内存泄漏。
4. **聚合导出**：所有指令在 [index.ts](file:///e:/hdi-ui/src/directives/index.ts) 中 `export`，并由 `registerDirectives(app)` 集中注册到全局。主入口 [src/index.ts](file:///e:/hdi-ui/src/index.ts) 通过 `export * from './directives'` 自动暴露，UMD 入口 [src/index.umd.ts](file:///e:/hdi-ui/src/index.umd.ts) 通过 `install` 调用 `registerDirectives` 完成注册。

## 权限指令的解耦设计

`v-permission` 与 `HdiPermission` 包装组件的核心思路是「指令/组件只负责判断 + 反应，权限 code 集合由业务注入」，二者通过 [permission.ts](file:///e:/hdi-ui/src/directives/permission.ts) 中的工具函数解耦。

### 两层判断机制

```
业务侧                          框架侧
setPermissions(['user:add', ...])
       │                                ① 内置逻辑
       ▼                                ② 自定义 checker 覆盖
  store.codes (Set)  ──► builtinHas ──┐
                                       ├──► hasPermission(value, mode)
  store.utils (自定义)  ──► utils[mode]─┘         │
                                                 ▼
                                          根据 mode 选择 all/any/none 分支
```

判断优先级（[`checkPermission`](file:///e:/hdi-ui/src/directives/permission.ts#L105-L126)）：

1. 业务通过 `setPermissionUtils({ hasAll, hasAny, ... })` 自定义的 checker（若存在则优先使用）
2. 基于 `store.codes` 的 **`builtinHas`** — 内部使用 `Set` 做 O(1) 查找，`values.every(c => codes.has(c))`
3. **默认放行**：当 `store.codes` 为空（未调用 `setPermissions`）且无自定义 checker 时返回 `true`，保证未启用权限系统的项目不受影响

### 对外 API 一览

| API | 作用 | 调用时机 |
|-----|------|----------|
| `setPermissions(codes)` | 存入权限 code（支持 `string[]` / `Set` / 逗号分隔字符串） | 登录成功后立即调用 |
| `getPermissions()` | 获取当前 code 列表（`string[]`） | 调试、条件分支 |
| `clearPermissionUtils()` | 清空 codes 和自定义 checker | 登出时调用 |
| `setPermissionUtils({ has, hasAll, ... })` | 覆盖内置 checker（**高级用法**，如需要实时调接口或判断角色层级） | 初始化阶段（可选） |
| `hasPermission(value, mode)` | 程序化判断权限（mode: `all` / `any` / `none`） | 路由守卫、`v-if` 条件等 |

### 代码结构

`store` 对象分两块，职责明确：

```ts
const store = {
  codes: new Set<string>(),         // 推荐：只存数据，内置判断
  utils: Record<string, Function>,  // 高级：可覆盖同名的内置判断
}
```

- `setPermissions` 只操作 `store.codes`
- `setPermissionUtils` 只操作 `store.utils`（合并而非替换）
- `clearPermissionUtils` 同时清空两者

### 页面刷新对权限的影响

权限仅存在内存（`store.codes`）里，**刷新会丢失**，业务侧必须配合持久化恢复，推荐：

1. **登录时**：拿到权限后，同时写入 `setPermissions(codes)` 和 Pinia store（或直接 `localStorage.setItem`）
2. **刷新后**：App.vue / main.ts 初始化阶段，从 Pinia / localStorage 恢复后调用 `setPermissions`
3. **登出时**：`clearPermissionUtils()` + 清理业务持久化

不内置 storage 持久化的原因：
- 权限 code 属于登录态信息，通常已在业务的 user store 中处理（Pinia/Vuex + 持久化插件），框架层重复写容易与业务状态不同步
- SSR 环境和隐私模式下 storage 行为不一致，交给业务统一处理更可控

### 与 Table 按钮权限的集成

[Table/utils.ts](file:///e:/hdi-ui/src/components/Table/utils.ts#L277-L296) 的 `shouldShowButton` 在 `btn.directive` 存在时会调用权限判断。配置项与 mode 的映射：

| directiveConfig 键 | mode | 说明 |
|--------------------|------|------|
| `hasPermission` | `all` | 必须全部拥有 |
| `hasAnyPermission` | `any` | 任一即可 |
| `hasNoPermission` | `none` | 必须都不拥有 |

实现上不再使用旧 `permissionUtils[v]` 动态调用，而是走 `hasPermission(value, mode)` 统一入口，确保与 `v-permission` / `HdiPermission` 的判断逻辑完全一致。

### 元素状态可恢复

默认模式下无权限元素被替换为 `Comment` 占位并保留引用（`_permissionPlaceholder`），`updated` 时权限恢复可重新插回 DOM，避免反复创建/销毁组件。

## 防抖指令的状态机

`v-debounce` 通过 `_debounceTimer` 与 `_debounceHasNewCall` 两个内部状态实现 leading/trailing 矩阵：

- **新周期判定**：`_debounceTimer === null` 表示进入新周期，此时若 `leading=true` 立即触发一次。
- **新触发标记**：周期内的额外触发会置 `_debounceHasNewCall = true` 并重置 timer。
- **尾部触发判定**：timer 结束时若 `trailing=true` 且（非 leading 或周期内有新触发），则触发尾部回调。

卸载时必须 `clearTimeout(_debounceTimer)` 并移除事件监听，防止组件销毁后回调仍被触发。

## 复制指令的剪贴板兼容

`v-copy` 中的 [writeText](file:///e:/hdi-ui/src/directives/copy.ts) 实现兼容两种环境：

- **安全上下文（HTTPS / localhost）**：使用 `navigator.clipboard.writeText`，原生异步、无需 DOM 操作。
- **非安全上下文**：回退到创建临时 `textarea` + `document.execCommand('copy')`，兼容旧浏览器与 HTTP 内网环境。

回退方案必须把 `textarea` 移出可视区域（`position: fixed; top: -9999px`），避免页面跳动；无论成功失败都要 `removeChild` 清理临时节点。

## HdiPermission 组件与指令的关系

[HdiPermission](file:///e:/hdi-ui/src/components/Permission/Permission.vue) 包装组件复用 `hasPermission` 函数，与 `v-permission` 指令共享同一套权限校验逻辑，区别只在反应方式：

| 维度 | `v-permission` 指令 | `HdiPermission` 组件 |
|------|---------------------|---------------------|
| 反应层 | 直接操作 DOM（移除/禁用） | 走 Vue 渲染树（条件 slot） |
| 兜底内容 | 仅 `.disable` 禁用 | `#fallback` 插槽 |
| 多元素包裹 | ✗ | ✓ |

修改 [permission.ts](file:///e:/hdi-ui/src/directives/permission.ts) 中的 `hasPermission` 实现时，指令与组件会同步生效，无需两边维护。

## 新增指令示例

以新增 `v-loading` 为例：

### 1. 创建指令文件 `src/directives/loading.ts`

```ts
import type { Directive } from 'vue'

export type LoadingElement = HTMLElement & { _loadingMask?: HTMLDivElement }

export const vLoading: Directive<LoadingElement, boolean> = {
  mounted(el, binding) {
    if (binding.value) {
      const mask = document.createElement('div')
      mask.className = 'hdi-loading-mask'
      mask.textContent = '加载中...'
      el.style.position = 'relative'
      el.appendChild(mask)
      el._loadingMask = mask
    }
  },
  updated(el, binding) {
    if (binding.value && !el._loadingMask) {
      // 显示
    } else if (!binding.value && el._loadingMask) {
      el._loadingMask.remove()
      el._loadingMask = undefined
    }
  },
  unmounted(el) {
    el._loadingMask?.remove()
    el._loadingMask = undefined
  },
}
```

### 2. 在 [index.ts](file:///e:/hdi-ui/src/directives/index.ts) 聚合导出并注册

```ts
export { vLoading } from './loading'
export type { LoadingElement } from './loading'

export function registerDirectives(app: App) {
  // ... 已有指令
  app.directive('loading', vLoading)
}
```

### 3. 更新使用文档

在 [components/directives.md](file:///e:/hdi-ui/docs/components/directives.md) 的「指令总览」追加一行，并新增「v-loading」章节，包含用法示例与参数说明。

### 4. 重建发布

```bash
npm run build
```

::: warning 别忘记更新 UMD 入口
[src/index.umd.ts](file:///e:/hdi-ui/src/index.umd.ts) 由 [generate-icons.ts](file:///e:/hdi-ui/scripts/generate-icons.ts) 自动生成，已通过 `registerDirectives(app)` 注册全部指令。新增指令无需手动改 UMD 入口，只需执行 `npm run generate:icons` 或 `npm run build:release` 让脚本重新生成即可。
:::

## 代码规范

- 框架内部使用**相对路径**导入，不用 `@/` 别名
- 元素扩展属性以 `_` 开头并在 `unmounted` 中清理
- TypeScript 类型与指令一并 export，便于业务按需使用
- 指令对象使用 `Directive<HTMLElement & {...}, ValueType>` 显式标注，避免 `any`
