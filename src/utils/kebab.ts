/** 将 PascalCase 组件名转为 kebab-case（正确处理数字边界，如 Icon80Add → icon-80-add） */
export function toKebabName(name: string): string {
  return name
    .replace(/([a-zA-Z])(\d)/g, '$1-$2')
    .replace(/(\d)([a-zA-Z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}
