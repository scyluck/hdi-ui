// 过滤类型,用于计算搜索及弹窗中是否渲染
export const filterType = ['index', 'selection', 'expand', 'operate']

// 过滤表格中默认插槽的类型
export const defaultSlotType = ['index', 'selection', 'expand']



// 默认按钮配置
export const defaultButtonMap: Record<string, { btnName: string }> = {
    add: {btnName: '新增'},
    batchDelete: {btnName: '批量删除'},
    import: {btnName: '导入'},
    export: {btnName: '导出'},
    view: {btnName: '查看'},
    edit: {btnName: '编辑'},
    delete: {btnName: '删除'},
    refresh: {btnName: '刷新'},
}
