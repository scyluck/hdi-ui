// 过滤类型,用于计算搜索及弹窗中是否渲染
export const filterType = ['index', 'selection', 'expand', 'operate']

// 过滤表格中默认插槽的类型
export const defaultSlotType = ['index', 'selection', 'expand']

// 列类型为以下值时，默认固定不可隐藏、不可移除（自定义列功能使用）
export const fixedColumnTypes = ['index', 'selection', 'expand', 'operate']

// 默认按钮配置（仅补充 btnName，icon 由用户按需配置，未配置则不显示）
export const defaultButtonMap: Record<string, { btnName: string }> = {
    add: {btnName: '新增'},
    batchDelete: {btnName: '批量删除'},
    import: {btnName: '导入'},
    export: {btnName: '导出'},
    view: {btnName: '查看'},
    edit: {btnName: '编辑'},
    delete: {btnName: '删除'},
    refresh: {btnName: '刷新'},
    customColumns: {btnName: '列设置'},
    customSearch: {btnName: '自定义搜索'},
}

// 自定义列默认配置
export const defaultCustomColumnsConfig = {
    storageKey: undefined as string | false | undefined,
    enableReorder: true,
    fixedProps: [] as string[],
    defaultHidden: [] as string[],
    buttonText: '列设置',
    icon: undefined as any,
    btnBind: {} as Record<string, any>,
}

// 自定义搜索默认配置
export const defaultCustomSearchConfig = {
    storageKey: undefined as string | false | undefined,
    enableAdvanced: true,
    advancedLabel: '高级搜索',
    advancedCollapseLabel: '收起',
    fixedProps: [] as string[],
    defaultHidden: [] as string[],
    buttonText: '自定义搜索',
    icon: undefined as any,
    btnBind: {} as Record<string, any>,
}
