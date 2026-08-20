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

## 各指令开发说明

| 指令 | 开发文档 |
|------|----------|
| `v-permission` | [v-permission 开发](/dev/directive-permission) — 解耦设计、两层判断机制、API 一览、Table 集成 |
| `v-debounce` | [v-debounce 开发](/dev/directive-debounce) — leading/trailing 状态机 |
| `v-copy` | [v-copy 开发](/dev/directive-copy) — 剪贴板兼容方案 |

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

在 [components/directives.md](file:///e:/hdi-ui/docs/components/directives.md) 的「指令总览」追加一行，并在 `docs/components/` 下新建 `directive-loading.md`，包含用法示例与参数说明。

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
