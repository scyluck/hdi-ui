/**
 * 权限工具模块
 * 提供权限检查的基础实现，业务项目可通过 setPermissionUtils 覆盖
 */

export type PermissionChecker = (value: string | string[]) => boolean

const store: {
  utils: Record<string, PermissionChecker>
} = {
  utils: {},
}

/**
 * 默认权限检查实现
 * 未配置时默认通过（返回 true）
 */
const defaultChecker: PermissionChecker = () => true

/**
 * 获取权限工具集合
 */
export const permissionUtils: Record<string, PermissionChecker> = new Proxy({} as Record<string, PermissionChecker>, {
  get(_target, prop: string) {
    return store.utils[prop] || defaultChecker
  },
})

/**
 * 设置权限检查工具
 * 业务项目可在初始化时调用此方法注入权限检查逻辑
 * @param utils 权限工具对象，key 为权限类型（如 hasPermission、hasNoPermission 等），value 为检查函数
 */
export function setPermissionUtils(utils: Record<string, PermissionChecker>) {
  store.utils = { ...store.utils, ...utils }
}

/**
 * 清除所有权限工具
 */
export function clearPermissionUtils() {
  store.utils = {}
}
