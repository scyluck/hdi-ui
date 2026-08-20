# v-debounce 开发

`v-debounce` 通过 `_debounceTimer` 与 `_debounceHasNewCall` 两个内部状态实现 leading/trailing 矩阵。

::: tip 配套使用文档
业务侧使用方式见 [v-debounce 防抖](/components/directive-debounce)。
:::

## 状态机

- **新周期判定**：`_debounceTimer === null` 表示进入新周期，此时若 `leading=true` 立即触发一次。
- **新触发标记**：周期内的额外触发会置 `_debounceHasNewCall = true` 并重置 timer。
- **尾部触发判定**：timer 结束时若 `trailing=true` 且（非 leading 或周期内有新触发），则触发尾部回调。

卸载时必须 `clearTimeout(_debounceTimer)` 并移除事件监听，防止组件销毁后回调仍被触发。
