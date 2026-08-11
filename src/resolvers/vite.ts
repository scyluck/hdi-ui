import Components from 'unplugin-vue-components/vite'
import type { Options as ComponentsOptions } from 'unplugin-vue-components/types'
import { HdiUiResolver, type HdiUiResolverOptions } from './index'

export interface CreateHdiUiVitePluginsOptions extends HdiUiResolverOptions {
  /** 生成组件类型声明文件路径，默认 src/components.d.ts，传 false 关闭 */
  dts?: ComponentsOptions['dts']
  /** 传递给 unplugin-vue-components 的额外配置 */
  componentsOptions?: Omit<ComponentsOptions, 'dts'>
}

/**
 * 创建 hdi-ui 自动按需引入的 Vite 插件
 *
 * @example
 * ```ts
 * import { defineConfig } from 'vite'
 * import vue from '@vitejs/plugin-vue'
 * import { createHdiUiVitePlugins } from 'hdi-ui/vite'
 *
 * export default defineConfig({
 *   plugins: [vue(), createHdiUiVitePlugins()],
 * })
 * ```
 */
export function createHdiUiVitePlugins(options: CreateHdiUiVitePluginsOptions = {}) {
  const {
    dts = 'src/components.d.ts',
    componentsOptions,
    ...resolverOptions
  } = options

  return Components({
    dts,
    ...componentsOptions,
    resolvers: [
      HdiUiResolver(resolverOptions),
      ...(componentsOptions?.resolvers ?? []),
    ],
  })
}

export { HdiUiResolver } from './index'
export type { HdiUiResolverOptions } from './index'
