/** 自动生成，请勿手动修改。运行 npm run generate:icons 更新 */
export const HDI_ICON_NAMES = [
  'Icon80Add',
  'Icon80Delete',
  'Icon80FolderAdd',
] as const

export type HdiIconName = (typeof HDI_ICON_NAMES)[number]

export const HDI_ICON_NAME_SET = new Set<string>(HDI_ICON_NAMES)
