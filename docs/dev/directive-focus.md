# v-focus 开发

`v-focus` 解决的是原生 `autofocus` 属性在 SPA 里几乎不可用的问题：只在页面首次加载生效一次。代码位置：[focus.ts](file:///e:/hdi-ui/src/directives/focus.ts)。

::: tip 配套使用文档
业务侧使用方式见 [v-focus 自动聚焦](/components/directive-focus)。
:::

## 配置解析：`resolveValue`

绑定值支持 5 种形态 + 修饰符 + arg，`resolveValue` 归一化为统一对象：

```ts
type FocusValue =
  | boolean          // true 聚焦 / false 失焦
  | number           // 延迟毫秒数（mounted 时）
  | string           // 选择器 selector
  | { auto?, delay?, selector?, select?, onFocus?, onBlur? }  // 对象完整配置
```

合并优先级（后者覆盖前者）：
1. 默认值 `{ auto: true, delay: 0, selector: undefined, select: false }`
2. 绑定值（按上面 4 种类型解析出的字段）
3. 修饰符 `.select` → `select = true`
4. arg `:input` / `:'.el-input__inner'` → `selector = arg`（优先级比绑定值里的 selector 更高，便于模板速记）

## 聚焦目标查找：`findTarget`

业务侧经常把指令绑在 `el-dialog`、`el-form-item`、外层 `div` 上，而不是真实的 `input` 上。`findTarget` 按以下顺序查找：

1. **显式 selector**（绑定值 string / 对象 selector / arg）→ `el.querySelector(selector)`
2. **绑定元素自身可聚焦**（`isFocusable(el)`：表单元素非 disabled，或有合法 tabindex）→ 用自身
3. **向下查找第一个可聚焦后代** → `el.querySelector('input, textarea, select, button, [tabindex]:not([tabindex="-1"])')`

三步逐级退化，保证 99% 的常见 UI 库封装（Element Plus、Ant Design Vue 等）都能正确命中内部真实 input。

## mounted 聚焦时机

`delay === 0` 时不是 `focus()` 立刻调用，而是包一层 `requestAnimationFrame`：

```ts
if (delay > 0) {
  el._focusTimer = setTimeout(() => doFocus(...), delay)
} else {
  requestAnimationFrame(() => doFocus(el, target))
}
```

原因：`v-if="visible"` 的元素在 `mounted` 钩子触发时，浏览器可能还没完成一帧布局（元素 `offsetWidth` 还是 0、display 还在过渡中），这时候直接 `focus()` 部分浏览器（尤其是 Safari + 弹窗场景）会静默失败。等 `rAF` 基本可以保证第一次 paint 前完成，稳定度显著提升。

`delay > 0` 则直接用 `setTimeout`（业务配合弹窗过渡时长，如 250/300ms）。

## updated 的防打断逻辑

这是 `v-focus` 最容易写错的部分：**不能每次组件 updated 都重新聚焦**，否则用户正在输入的字符会被「每输入一个字就全选一次 / 光标跳到末尾」，体验极差。

正确做法：**只在 auto 的布尔值真正发生变化（prev !== curr）时才触发聚焦/失焦切换。**

```ts
const prevAuto = resolveAuto(binding.oldValue)
const currAuto = resolveAuto(binding.value)
if (prevAuto === undefined || currAuto === undefined) return
if (prevAuto === currAuto) return   // 重点：没变就 return

// 只有 true→false / false→true 的跳变，才执行 doFocus/doBlur
```

`resolveAuto` 的一个细节：`oldValue === undefined`（第一次 mounted 进入 updated）时返回 `undefined`，让上面的 early return 直接跳过——因为 mounted 已经聚焦过一次，updated 的第一次回调不需要重复操作。

配置对象里的 selector/select/回调字段则是每次 updated 都更新，保证响应式变化能生效，但这些字段的更新不会触发聚焦行为，只是让下一次聚焦时用新参数。

## 卸载清理

`unmounted` 必须：
1. `clearTimeout(_focusTimer)` 置 null：防止延迟聚焦的 timer 在组件销毁后触发，`focus()` 一个已经不存在的元素会抛错
2. `_focusConfig = undefined`：清理闭包引用

`doFocus` 内部用 `try { target.focus() } catch {}` 包裹，遇到隐藏元素、disabled 元素等不可聚焦的场景静默忽略，不抛错误。
