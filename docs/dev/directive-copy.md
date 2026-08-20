# v-copy 开发

`v-copy` 中的 [writeText](file:///e:/hdi-ui/src/directives/copy.ts) 实现兼容两种环境。

::: tip 配套使用文档
业务侧使用方式见 [v-copy 一键复制](/components/directive-copy)。
:::

## 剪贴板兼容方案

- **安全上下文（HTTPS / localhost）**：使用 `navigator.clipboard.writeText`，原生异步、无需 DOM 操作。
- **非安全上下文**：回退到创建临时 `textarea` + `document.execCommand('copy')`，兼容旧浏览器与 HTTP 内网环境。

回退方案必须把 `textarea` 移出可视区域（`position: fixed; top: -9999px`），避免页面跳动；无论成功失败都要 `removeChild` 清理临时节点。
