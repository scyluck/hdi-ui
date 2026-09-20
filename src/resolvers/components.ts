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
    from: 'hdi-ui/components/Icon',
  },
  IconBase: {
    from: 'hdi-ui/components/Icon',
  },
  HdiDictionary: {
    from: 'hdi-ui/components/Dictionary',
  },
  HdiForm: {
    from: 'hdi-ui/components/Form',
  },
  HdiFormDialog: {
    from: 'hdi-ui/components/FormDialog',
  },
  HdiTable: {
    from: 'hdi-ui/components/Table',
  },
  HdiCardList: {
    from: 'hdi-ui/components/CardList',
  },
  HdiPermission: {
    from: 'hdi-ui/components/Permission',
  },
  HdiInfiniteScroll: {
    from: 'hdi-ui/components/InfiniteScroll',
  },
}

export const HDI_UI_COMPONENT_NAMES = Object.keys(HDI_UI_COMPONENTS)
export const HDI_UI_COMPONENT_NAME_SET = new Set<string>(HDI_UI_COMPONENT_NAMES)

export type HdiUiComponentName = (typeof HDI_UI_COMPONENT_NAMES)[number]
