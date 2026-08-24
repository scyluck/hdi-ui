# v-ellipsis 开发

`v-ellipsis` 不是简单包一层 CSS，还要解决「正确判断溢出 → 自动加 title → 内容/尺寸变化时自动重算」三件事。代码位置：[ellipsis.ts](file:///e:/hdi-ui/src/directives/ellipsis.ts)。

::: tip 配套使用文档
业务侧使用方式见 [v-ellipsis 文本省略](/components/directive-ellipsis)。
:::

## 核心分层

```
业务值 ──► resolveConfig ──► 统一配置
                                    │
                                    ▼
                        应用样式（单行/多行两种方案）
                                    │
                                    ▼
              refreshOverflowState ─┼─► 判断溢出（scrollX/Y vs clientX/Y）
                                    └─► 溢出时 setAttribute('title', 全文)
                                    │
                                    ▼
                启动双 Observer 监听变化，自动触发 refresh
```

## 样式方案

### 单行省略（lines === 1）

直接用浏览器原生三行 CSS：

```ts
el.style.overflow = 'hidden'
el.style.textOverflow = 'ellipsis'
el.style.whiteSpace = 'nowrap'
```

优点：性能最好、原生支持。注意 `white-space: nowrap` 会强制不换行，若业务元素内有 `<br>` 或其他换行节点，换行也会被吞掉——这是原生行为，与指令无关。

### 多行省略（lines ≥ 2）

使用 `-webkit-line-clamp` + `display: -webkit-box` 方案，同时写入无前缀 `line-clamp` 适配 Firefox 新版：

```ts
el.style.overflow = 'hidden'
el.style.display = '-webkit-box'
el.style.webkitLineClamp = String(lines)
(el.style as any).WebkitBoxOrient = 'vertical'
;(el.style as any).lineClamp = String(lines)
```

注意 `WebkitBoxOrient` 需要用字符串键访问（TypeScript 的 `CSSStyleDeclaration` 类型有时不包含带前缀的写法），`as unknown as { WebkitBoxOrient: string }` 强转避免类型报错。

## 溢出判断

```ts
function isOverflowed(el: HTMLElement, lines: number): boolean {
  if (lines === 1) return el.scrollWidth - el.clientWidth > 1
  return el.scrollHeight - el.clientHeight > 1
}
```

要点：
- 单行：`scrollWidth > clientWidth`
- 多行：`scrollHeight > clientHeight`
- 留 1px 容差：Chrome 对字符宽度的像素计算常有 0.x 的浮点误差，不加容差会出现「看起来没溢出但 scroll 却比 client 大 0.3px → 误判溢出加了 title」的尴尬情况。减 1 就安全了。

## 双 Observer 自动更新

内容或容器变化都可能导致「原来溢出→现在不溢出」或相反，`v-ellipsis` 内部用两个 Observer 自动触发 `refreshOverflowState`：

1. **MutationObserver**：`{ childList: true, characterData: true, subtree: true }`
   - 监听内部文本变化、子节点增删、嵌套的子元素内容变化
   - 保证响应式变量赋值、`v-html` 更新后省略状态立即刷新

2. **ResizeObserver**：监听**元素自身**的尺寸变化（不是 window）
   - 容器被 flex/grid 分配宽度变化、侧边栏折叠、切 tab 后元素第一次显示等场景
   - 比 `window.addEventListener('resize')` 更精准，因为很多变化根本不是 window resize 触发的

`startObservers` / `stopObservers` 成对出现，`unmounted` 时 `disconnect()` 两者，防止元素从 DOM 移除后 Observer 仍持有引用导致内存泄漏。

## 样式保存与还原

mounted 时用 `saveOriginalStyles` 把元素原有的 `overflow` / `textOverflow` / `whiteSpace` / `display` / `webkitLineClamp` / `WebkitBoxOrient` / `lineClamp` 保存到 `_ellipsisOrigXxx` 系列字段；`unmounted`（或 lines 配置更新前）调用 `restoreOriginalStyles` 还原。

这样业务组件即使把 `v-ellipsis` 动态绑到了本来就有特殊排版样式的元素上，`unmounted` 之后也不会留下样式污染。

## refreshOverflowState 的调用时机

- **mounted 后**：requestAnimationFrame 里调一次，等布局完成后再判断，不然 `clientWidth` / `scrollWidth` 可能还是 0
- **updated 后**：binding.value 变化（配置变了或响应式文本变了）→ requestAnimationFrame 兜底刷一次
- **MutationObserver / ResizeObserver 触发**：直接调（已经在宏任务里，不需要再 rAF）
