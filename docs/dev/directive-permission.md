# v-permission 开发

`v-permission` 与 `HdiPermission` 包装组件的核心思路是「指令/组件只负责判断 + 反应，权限 code 集合由业务注入」，二者通过 [permission.ts](file:///e:/hdi-ui/src/directives/permission.ts) 中的工具函数解耦。

::: tip 配套使用文档
业务侧使用方式见 [v-permission 权限控制](/components/directive-permission)。
:::

## 两层判断机制

```
业务侧                          框架侧
setPermissions(['user:add', ...])
       │                                ① 内置逻辑
       ▼                                ② 自定义 checker 覆盖
  store.codes (Set)  ──► builtinHas ──┐
                                       ├──► hasPermission(value, mode)
  store.utils (自定义)  ──► utils[mode]─┘         │
                                                 ▼
                                          根据 mode 选择 all/any/not 分支
```

判断优先级（[`checkPermission`](file:///e:/hdi-ui/src/directives/permission.ts#L105-L126)）：

1. 业务通过 `setPermissionUtils({ hasAll, hasAny, ... })` 自定义的 checker（若存在则优先使用）
2. 基于 `store.codes` 的 **`builtinHas`** — 内部使用 `Set` 做 O(1) 查找，`values.every(c => codes.has(c))`
3. **默认放行**：当 `store.codes` 为空（未调用 `setPermissions`）且无自定义 checker 时返回 `true`，保证未启用权限系统的项目不受影响

## 对外 API 一览

| API | 作用 | 调用时机 |
|-----|------|----------|
| `setPermissions(codes)` | 存入权限 code（支持 `string[]` / `Set` / 逗号分隔字符串） | 登录成功后立即调用 |
| `getPermissions()` | 获取当前 code 列表（`string[]`） | 调试、条件分支 |
| `clearPermissionUtils()` | 清空 codes 和自定义 checker | 登出时调用 |
| `setPermissionUtils({ has, hasAll, ... })` | 覆盖内置 checker（**高级用法**，如需要实时调接口或判断角色层级） | 初始化阶段（可选） |
| `hasPermission(value, mode)` | 程序化判断权限（mode: `all` / `any` / `not`） | 路由守卫、`v-if` 条件等 |

## 代码结构

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

## 页面刷新对权限的影响

权限仅存在内存（`store.codes`）里，**刷新会丢失**，业务侧必须配合持久化恢复，推荐：

1. **登录时**：拿到权限后，同时写入 `setPermissions(codes)` 和 Pinia store（或直接 `localStorage.setItem`）
2. **刷新后**：App.vue / main.ts 初始化阶段，从 Pinia / localStorage 恢复后调用 `setPermissions`
3. **登出时**：`clearPermissionUtils()` + 清理业务持久化

不内置 storage 持久化的原因：
- 权限 code 属于登录态信息，通常已在业务的 user store 中处理（Pinia/Vuex + 持久化插件），框架层重复写容易与业务状态不同步
- SSR 环境和隐私模式下 storage 行为不一致，交给业务统一处理更可控

## 与 Table 按钮权限的集成

[Table/utils.ts](file:///e:/hdi-ui/src/components/Table/utils.ts#L277-L296) 的 `shouldShowButton` 在 `btn.directive` 存在时会调用权限判断。配置项与 mode 的映射：

| directiveConfig 键 | mode | 说明 |
|--------------------|------|------|
| `hasPermission` | `all` | 必须全部拥有 |
| `hasAnyPermission` | `any` | 任一即可 |
| `hasNoPermission` | `not` | 必须都不拥有 |

实现上不再使用旧 `permissionUtils[v]` 动态调用，而是走 `hasPermission(value, mode)` 统一入口，确保与 `v-permission` / `HdiPermission` 的判断逻辑完全一致。

## 元素状态可恢复

默认模式下无权限元素被替换为 `Comment` 占位并保留引用（`_permissionPlaceholder`），`updated` 时权限恢复可重新插回 DOM，避免反复创建/销毁组件。

## HdiPermission 组件与指令的关系

[HdiPermission](file:///e:/hdi-ui/src/components/Permission/Permission.vue) 包装组件复用 `hasPermission` 函数，与 `v-permission` 指令共享同一套权限校验逻辑，区别只在反应方式：

| 维度 | `v-permission` 指令 | `HdiPermission` 组件 |
|------|---------------------|---------------------|
| 反应层 | 直接操作 DOM（移除/禁用） | 走 Vue 渲染树（条件 slot） |
| 兜底内容 | 仅 `.disable` 禁用 | `#fallback` 插槽 |
| 多元素包裹 | ✗ | ✓ |

修改 [permission.ts](file:///e:/hdi-ui/src/directives/permission.ts) 中的 `hasPermission` 实现时，指令与组件会同步生效，无需两边维护。
