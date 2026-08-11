/**
 * 表单组件注册
 * 自动导入并注册 components 目录下的所有表单组件
 */
import { defineAsyncComponent, shallowRef, type Component } from 'vue'

/**
 * 导入所有表单组件
 * 使用 import.meta.glob 动态导入 components 目录下的所有 .vue 文件
 */
const list = import.meta.glob('./components/*.vue', { import: 'default' })

/**
 * 组件映射表
 * 存储所有表单组件的引用
 */
const components = shallowRef<Record<string, Component>>({})

/**
 * 遍历注册组件
 * 将每个组件以文件名作为键注册到组件映射表中
 */
for (const key in list) {
  // 提取组件名称（去掉路径和文件扩展名）
  const name = key.replace('./components/', '').replace('.vue', '')
  // 注册为异步组件
  components.value[name] = defineAsyncComponent(list[key] as any)
}

/**
 * 导出组件映射表
 */
export default components
