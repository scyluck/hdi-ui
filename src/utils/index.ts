/** 格式化文件大小 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${units[i]}`
}

/** 防抖 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

/** 节流 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300,
): (...args: Parameters<T>) => void {
  let last = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn(...args)
    }
  }
}

/** 深拷贝（简单对象） */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T
}

/** 树形数据扁平化 */
export interface TreeNode {
  children?: TreeNode[]
  [key: string]: unknown
}

export function flattenTree<T extends TreeNode>(
  tree: T[],
  childrenKey = 'children',
): Omit<T, 'children'>[] {
  const result: Omit<T, 'children'>[] = []
  const walk = (nodes: T[]) => {
    for (const node of nodes) {
      const { [childrenKey]: children, ...rest } = node
      result.push(rest as Omit<T, 'children'>)
      if (Array.isArray(children) && children.length) {
        walk(children as T[])
      }
    }
  }
  walk(tree)
  return result
}
