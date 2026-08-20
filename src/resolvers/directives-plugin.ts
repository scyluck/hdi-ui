import type { Plugin } from 'vite'

export interface HdiUiDirectivesPluginOptions {
  /** 是否自动注册指令，默认 true */
  enabled?: boolean
  /** 入口文件匹配模式，默认匹配 main.ts / main.js */
  entryPattern?: RegExp
}

/**
 * Vite 插件：自动在入口文件中注入 hdi-ui 指令注册代码
 *
 * 检测 main.ts / main.js 中的 `createApp(...)` 调用，
 * 自动注入 `import { registerDirectives } from 'hdi-ui'` 和 `registerDirectives(app)`，
 * 使按需引入模式下的指令（v-permission、v-copy、v-debounce、v-click-outside）也能正常使用。
 *
 * 支持两种常见写法：
 * - `const app = createApp(App)` → 在调用后注入 `registerDirectives(app)`
 * - `createApp(App).mount('#app')` → 拆分为变量赋值后注入
 *
 * 若入口文件已包含 `registerDirectives` 则跳过，可手动禁用。
 */
export function hdiUiDirectivesPlugin(options: HdiUiDirectivesPluginOptions = {}): Plugin {
  const { enabled = true, entryPattern = /main\.[tj]s$/ } = options

  if (!enabled) {
    return { name: 'hdi-ui:directives' }
  }

  return {
    name: 'hdi-ui:directives',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!entryPattern.test(id)) return
      // 已有 registerDirectives 调用则跳过
      if (code.includes('registerDirectives')) return

      // 查找 createApp( 调用
      const match = code.match(/\bcreateApp\s*\(/)
      if (!match) return

      const openParen = match.index! + match[0].length - 1
      const closeParen = findMatchingParen(code, openParen)
      if (closeParen === -1) return

      const before = code.slice(0, match.index!)
      const args = code.slice(openParen + 1, closeParen)
      const after = code.slice(closeParen + 1)

      // 判断是否已有 const/let app = 赋值
      const isAssigned = /(const|let)\s+app\s*=\s*$/.test(before)

      let newCode: string

      if (isAssigned) {
        // 模式1：const app = createApp(App)
        // 在 createApp(...) 调用之后注入 registerDirectives(app)
        newCode =
          injectImport(code.slice(0, closeParen + 1)) + '\nregisterDirectives(app)\n' + after
      } else {
        // 模式2：createApp(App).use(router).mount('#app')
        // 转换为 const app = createApp(App); registerDirectives(app); app.use(router).mount('#app')
        newCode =
          injectImport(before) +
          `const app = createApp(${args})\nregisterDirectives(app)\napp` +
          after
      }

      return { code: newCode, map: null }
    },
  }
}

/** 找到与 openPos 位置的 ( 匹配的 ) */
function findMatchingParen(code: string, openPos: number): number {
  let depth = 0
  for (let i = openPos; i < code.length; i++) {
    if (code[i] === '(') depth++
    else if (code[i] === ')') {
      depth--
      if (depth === 0) return i
    }
  }
  return -1
}

/**
 * 注入 registerDirectives 导入
 * 若已有 hdi-ui 导入则合并到现有 import 中，否则在文件顶部新增
 */
function injectImport(code: string): string {
  const importMatch = code.match(/import\s+\{([\s\S]*?)\}\s+from\s+['"]hdi-ui['"]/)
  if (importMatch) {
    const existing = importMatch[1].trim()
    if (existing.includes('registerDirectives')) return code
    return code.replace(importMatch[0], `import { ${existing}, registerDirectives } from 'hdi-ui'`)
  }
  return `import { registerDirectives } from 'hdi-ui'\n${code}`
}
