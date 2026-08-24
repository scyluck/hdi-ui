# v-throttle 开发

`v-throttle` 与 `v-debounce` 是成对设计的，两者共用一套 API 风格（handler / delay / event / leading / trailing），但状态机逻辑不同。代码位置：[throttle.ts](file:///e:/hdi-ui/src/directives/throttle.ts)。

::: tip 配套使用文档
业务侧使用方式见 [v-throttle 节流](/components/directive-throttle)。
:::

## 与 v-debounce 的差异

| 维度 | v-debounce | v-throttle |
|------|-----------|-----------|
| **新周期判定** | 每次调用都重置 timer；`isFresh = _debounceTimer === null` | 只在 timer 为 null 时开新周期；周期内调用只更新 `_lastArgs` 与 `_hasNewCall`，**不重置 timer** |
| **Timer 重置** | 每次调用 `clearTimeout` 再重排 → 结果是「连续触发永远不执行，直到停下来」 | 周期内从不重置 timer → 保证每 `delay` 毫秒必然有一次 leading 或 trailing |
| **默认 leading** | `false`（防抖默认只在尾部触发） | `true`（lodash throttle 默认语义，首尾都触发） |

## 状态机

核心状态挂在 `ThrottleElement` 上：

```ts
type ThrottleElement = HTMLElement & {
  _throttleConfig?: Required<ThrottleOptions>
  _throttleHandler?: EventListener
  _throttleTimer?: ReturnType<typeof setTimeout> | null  // null 表示不在周期内
  _throttleLastArgs?: unknown[]                          // 最后一次调用的参数，供 trailing 使用
  _throttleHasNewCall?: boolean                          // 本周期内是否有新调用（非 leading 的那次）
}
```

执行流程：

1. **新周期入口**（`_throttleTimer === null`）：
   - 若 `leading=true` → 立即用当前参数调用 `handler`，并将 `_hasNewCall` 置为 `false`
   - 若 `leading=false` → 标记 `_hasNewCall=true`（等 trailing 触发）
   - 启动 `setTimeout(delay)`

2. **周期内调用**（`_throttleTimer !== null`）：
   - 仅更新 `_throttleLastArgs = args` 并把 `_hasNewCall = true`，**不重置 timer、不调用 handler**

3. **Timer 结束**：
   - `_throttleTimer = null`（标识下一调用可开新周期）
   - 若 `trailing=true` 且 `_hasNewCall=true` → 用保存的 `_lastArgs` 触发尾部回调

## leading + trailing 行为验证

默认配置 `leading=true, trailing=true` 时，一个 300ms 窗口内连续点击 5 次的行为：

| 时序 | 行为 |
|------|------|
| 第 1 次点击（0ms） | 进入新周期 → `leading` 立即触发 handler（第 1 次执行）→ 启动 timer → 300ms 后到 |
| 第 2~5 次点击（50/100/150/200ms） | 周期内 → 只更新 `_lastArgs` + 置 `_hasNewCall=true`，不重置 timer |
| 300ms 到达 | timer 结束 → 有新调用 → `trailing` 用第 5 次点击的参数触发 handler（第 2 次执行） |
| 下一周期（比如 400ms 又点一次） | 重新走第 1 步 → leading 再触发 → 保证每 300ms 至少有一次响应 |

保证的语义是：**两次 handler 执行的间隔不会短于 delay，且不会因为用户一直点而永远不执行**，这是 throttle 和 debounce 最本质的区别。

## 配置合并优先级

`resolveConfig` 里的合并顺序是「默认值 < 对象绑定值 < 修饰符/arg」，优先级从低到高：

1. `DEFAULTS`（delay 300 / event click / leading true / trailing true）
2. 绑定值对象形式的字段：`{ delay, event, leading, trailing }`
3. `arg`（如 `:500`）覆盖 delay，修饰符（如 `.scroll`）覆盖 event，`.leading` / `.trailing` 覆盖开关

这样设计让简洁写法（`v-throttle:500.scroll`）和完整配置写法可以混用，arg/修饰符永远优先。

## 卸载清理

`unmounted` 必须按顺序执行：
1. `removeEventListener(config.event, _throttleHandler)` — 移除事件监听
2. `clearTimeout(_throttleTimer)` + 置 null — 防止组件销毁后 timer 仍触发，引用了已不存在的元素导致内存泄漏或报错
3. 所有 `_xxx` 扩展属性置 `undefined`
