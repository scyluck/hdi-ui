import type { Component } from 'vue'

/**
 * 按钮对齐方式类型
 * 对应 CSS justify-content 属性的合法值
 */
export type BtnsJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'left'
  | 'right'

/**
 * 事件处理函数类型
 * 用于定义表单控件的事件处理函数
 */
export type EventHandler = (...args: any[]) => any

/**
 * 表单验证函数类型
 * @param prop 验证的属性
 * @param isValid 是否验证通过
 * @param message 验证消息
 */
export type ValidateFunction = (prop: any, isValid: boolean, message: string) => void

/**
 * 联动条件类型
 * 用于定义表单项之间的联动关系
 */
export type LinkageCondition = {
  prop: string // 关联的字段名
  value: any // 关联字段的值
  operator?: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'includes' | 'notIncludes' // 操作符
}

/**
 * 表单项基础接口
 * 定义单个表单项的配置信息
 */
export interface FormItem {
  prop?: string // 字段名，相当于el-form中的prop
  type: string | any // 字段类型，如input、select、checkbox等
  label?: string // 字段标签
  desc?: string // 标题中tooltip提示信息
  placeholder?: string // 占位符
  disabled?: boolean // 是否禁用
  component?: Component // 自定义组件
  options?: any[] | Record<string, any> | string // 选项数据，数组或字典code
  customClass?: string // 表单项自定义类名
  headerClassName?: string // 标题自定义类名
  children?: FormItem[] // 子表单项
  width?: string // 表单项宽度，需要加长度单位
  labelWidth?: string // 标签宽度,可使用auto/3rem/60px
  rules?: any[] // 校验规则
  slots?: Record<string, string> // 插槽配置
  attrs?: Record<string, any> // elementPlus中的属性
  events?: Record<string, EventHandler> // elementPlus中的事件
  selectValue?: string // select中下拉选项的选项值对应的字段
  selectLabel?: string // select中下拉选项的选项名对应的字段
  filterValues?: any[] // checkbox中需要过滤的选项
  mode?: 'horizontal' | 'vertical' // checkbox显示模式
  isLabelHasValue?: boolean // 标签是否显示为值+标签的形式
  unit?: string // 单位，常用在input中
  // 联动相关
  show?: boolean | ((formData: Record<string, any>) => boolean) // 是否显示
  linkage?: LinkageCondition | LinkageCondition[] // 联动条件
  [key: string]: any // 其他自定义属性
}

/**
 * 表单配置接口
 * 定义整个表单的配置信息
 */
export interface FormConfig {
  disabled?: boolean // 是否禁用整个表单
  xGap?: number // 两个表单项的间距
  inline?: boolean // 是否为行内表单
  cols?: number // 一行可以展示的表单项个数
  isTable?: boolean // 是否以表格样式展示
  labelWidth?: string | number // 标签宽度
  labelPosition?: 'left' | 'right' | 'top' // 标签位置
  labelSuffix?: string // 标签后缀
  showSubmit?: boolean // 是否展示提交按钮
  showReset?: boolean | any // 是否展示重置按钮
  isReverseButton?: boolean // 是否将提交和重置按钮调换位置
  submitButtonText?: string // 提交按钮的文字
  resetButtonText?: string // 重置按钮的文字
  btnsJustifyContent?: BtnsJustifyContent // 按钮的对齐方式
  validate?: ValidateFunction // 验证回调函数
  customClass?: string // 表单自定义类名
  items?: FormItem[] // 表单项配置数组
  rules?: Record<string, any[]> // 表单验证规则，key为FormItem的prop，value为校验规则
  slots?: Record<string, Record<string, string>> // 插槽配置，key为FormItem的prop，value为插槽配置
  attrs?: Record<string, Record<string, any>> // 自定义属性，key为FormItem的prop，value为属性配置
  events?: Record<string, Record<string, EventHandler>> // 自定义事件，key为FormItem的prop，value为事件配置
  [key: string]: any // 其他自定义属性
}
