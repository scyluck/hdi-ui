import type { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import { HdiUiResolver, type HdiUiResolverOptions } from './index'
import { hdiUiDirectivesPlugin, type HdiUiDirectivesPluginOptions } from './directives-plugin'

export interface CreateHdiUiVitePluginsOptions extends HdiUiResolverOptions {
  /** 生成组件类型声明文件路径，默认 src/components.d.ts，传 false 关闭 */
  dts?: ComponentsOptions['dts']
  /** 传递给 unplugin-vue-components 的额外配置 */
  componentsOptions?: Omit<ComponentsOptions, 'dts'>
  /** 是否自动在入口文件注入指令注册，默认 true */
  registerDirectives?: boolean
  /** 入口文件匹配模式，默认匹配 main.ts / main.js */
  directivesEntryPattern?: RegExp
}

/**
 * 创建 hdi-ui 自动按需引入的 Vite 插件
 *
 * 返回插件数组：
 * 1. `unplugin-vue-components` — 组件 + 图标自动按需引入
 * 2. `hdi-ui:directives` — 自动在入口文件注入 `registerDirectives(app)`，使指令在按需引入模式下也可用
 *
 * @example
 * ```ts
 * import { defineConfig } from 'vite'
 * import vue from '@vitejs/plugin-vue'
 * import { createHdiUiVitePlugins } from 'hdi-ui/vite'
 *
 * export default defineConfig({
 *   plugins: [vue(), ...createHdiUiVitePlugins()],
 * })
 * ```
 *
 * 若不需要自动注册指令（如已手动注册），可关闭：
 * ```ts
 * createHdiUiVitePlugins({ registerDirectives: false })
 * ```
 */
export function createHdiUiVitePlugins(
  options: CreateHdiUiVitePluginsOptions = {},
): PluginOption[] {
  const {
    dts = 'src/components.d.ts',
    componentsOptions,
    registerDirectives: registerDirectivesOption = true,
    directivesEntryPattern,
    ...resolverOptions
  } = options

  const plugins: PluginOption[] = [
    Components({
      dts,
      ...componentsOptions,
      resolvers: [
        HdiUiResolver(resolverOptions),
        ...(componentsOptions?.resolvers ?? []),
      ],
    }),
  ]

  if (registerDirectivesOption) {
    const directiveOptions: HdiUiDirectivesPluginOptions = { enabled: true }
    if (directivesEntryPattern) {
      directiveOptions.entryPattern = directivesEntryPattern
    }
    plugins.push(hdiUiDirectivesPlugin(directiveOptions))
  }

  return plugins
}

export { HdiUiResolver } from './index'
export { hdiUiDirectivesPlugin } from './directives-plugin'
export type { HdiUiResolverOptions } from './index'
export type { HdiUiDirectivesPluginOptions } from './directives-plugin'
