import type { ComponentResolver } from 'unplugin-vue-components'
import { HDI_UI_COMPONENTS } from './components'
import { HDI_ICON_NAME_SET } from './icons.generated'

export interface HdiUiResolverOptions {
  /** 自动导入图标组件（IconHome、IconSearch 等），默认 true */
  importIcons?: boolean
  /** 自动导入框架组件（HdiIcon、IconBase 等），默认 true */
  importComponents?: boolean
  /** 排除的组件名 */
  exclude?: string[]
}

/**
 * unplugin-vue-components 解析器
 *
 * @example
 * ```ts
 * import Components from 'unplugin-vue-components/vite'
 * import { HdiUiResolver } from 'hdi-ui/resolvers'
 *
 * Components({
 *   dts: 'src/components.d.ts',
 *   resolvers: [HdiUiResolver()],
 * })
 * ```
 */
export function HdiUiResolver(options: HdiUiResolverOptions = {}): ComponentResolver {
  const {
    importIcons = true,
    importComponents = true,
    exclude = [],
  } = options

  const excludeSet = new Set(exclude)

  return {
    type: 'component',
    resolve: (name: string) => {
      if (excludeSet.has(name)) return

      if (importComponents && name in HDI_UI_COMPONENTS) {
        const meta = HDI_UI_COMPONENTS[name]
        return {
          name,
          from: meta.from,
          sideEffects: meta.sideEffects,
        }
      }

      if (importIcons && HDI_ICON_NAME_SET.has(name)) {
        return {
          from: `hdi-ui/icons/${name}`,
        }
      }
    },
  }
}

export { HDI_UI_COMPONENTS } from './components'
export { HDI_ICON_NAMES, HDI_ICON_NAME_SET } from './icons.generated'
export type { HdiIconName } from './icons.generated'
