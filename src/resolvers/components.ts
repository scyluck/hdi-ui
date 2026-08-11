export interface ComponentMeta {
  from: string
  sideEffects?: string[]
}

/**
 * 框架内组件映射表
 * key 为组件名（PascalCase），value 为按需引入时的模块信息
 */
export const HDI_UI_COMPONENTS: Record<string, ComponentMeta> = {
  HdiIcon: {
    from: 'hdi-ui',
  },
  IconBase: {
    from: 'hdi-ui',
  },
  HdiDictionary: {
    from: 'hdi-ui',
  },
  HdiForm: {
    from: 'hdi-ui',
  },
  HdiTable: {
    from: 'hdi-ui',
  },
}

export const HDI_UI_COMPONENT_NAMES = Object.keys(HDI_UI_COMPONENTS)
export const HDI_UI_COMPONENT_NAME_SET = new Set<string>(HDI_UI_COMPONENT_NAMES)

export type HdiUiComponentName = (typeof HDI_UI_COMPONENT_NAMES)[number]
