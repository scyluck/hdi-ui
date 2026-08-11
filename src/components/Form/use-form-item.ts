/**
 * 表单工具函数
 * 提供表单项相关的工具方法
 */
import { ref } from 'vue'
import type { FormItem, FormConfig, EventHandler, LinkageCondition } from './types'

/**
 * 表单工具函数
 * @returns 表单工具方法集合
 */
export function useFormItem() {
  /**
   * 组件引用集合
   * 用于存储各个表单项的组件引用
   */
  const componentRefs = ref<Record<string, any>>({})

  /**
   * 设置组件引用
   * @param el 组件元素
   * @param prop 字段名
   */
  const setComponentRef = (el: any, prop: string) => {
    if (el) {
      componentRefs.value[prop] = el
    }
  }

  /**
   * 获取组件引用
   * @param prop 字段名
   * @returns 组件引用
   */
  function getComponentRef(prop: string) {
    return componentRefs.value[prop]
  }

  /**
   * 生成占位符
   * @param config 表单配置
   * @param item 表单项配置
   * @returns 占位符字符串
   */
  function mutedPlaceholder(config: FormConfig, item: FormItem): string {
    // 禁用状态下返回空占位符
    if (config.disabled || item.disabled) {
      return ''
    }
    // 上传组件返回空占位符
    if (item.type === 'upload') {
      return ''
    }
    // 自定义占位符
    if (item.placeholder) {
      return item.placeholder
    }
    // 根据字段类型生成默认占位符
    const str = ['input', 'input-number', 'textarea', 'password'].includes(item.type)
      ? '请输入'
      : '请选择'
    return str + (item.label || '')
  }

  /**
   * 增强事件处理
   * @param events 事件处理函数集合
   * @param item 表单项配置
   * @returns 增强后的事件处理函数集合
   */
  function extraEvents(events: Record<string, EventHandler> = {}, item: FormItem) {
    const enhancedEvents: Record<string, EventHandler> = {}

    for (const [eventName, handler] of Object.entries(events)) {
      enhancedEvents[eventName] = function (...args: any[]) {
        const fieldName = item.prop as string

        // 特殊处理cascader的change事件
        if (eventName === 'change' && item.type === 'cascader') {
          try {
            const cascaderRef = componentRefs.value[fieldName]?.cascaderRef
            if (cascaderRef?.getCheckedNodes) {
              const checkedNodes = cascaderRef.getCheckedNodes()
              return handler.call(this, ...args, checkedNodes, item)
            }
          } catch (error) {
            console.warn('获取级联选择器节点失败:', error)
          }
        } 
        // 特殊处理带选项的组件的change事件
        else if (eventName === 'change' && item.options) {
          try {
            const option = componentRefs.value[fieldName]?.getSelectedOption(args[0])
            if (option) {
              return handler.call(this, ...args, option, item)
            }
          } catch (error) {
            console.warn('获取选择内容失败:', error)
          }
        }
        // 其他事件正常处理
        return handler.call(this, ...args, item)
      }
    }

    return enhancedEvents
  }

  /**
   * 计算表单项宽度
   * @param item 表单项配置
   * @param config 表单配置
   * @returns 宽度样式对象
   */
  function calcFormItemWidth(item: FormItem, config: FormConfig) {
    // 行内表单不需要计算宽度
    if (config.inline) {
      return {}
    }
    const xGap = (config?.xGap || 12) / 16 + 'rem'
    const cols = config.cols || 1

    // 自定义宽度
    if (item?.width) {
      return {
        width: item.width,
      }
    } 
    // 表格模式
    else if (config?.isTable) {
      return {
        width: 100 / cols + '%',
      }
    } 
    // 普通模式
    else {
      return {
        width: `calc((100% - ${xGap} * ${cols - 1}) / ${cols})`,
      }
    }
  }

  /**
   * 检查联动条件
   * @param condition 联动条件
   * @param formData 表单数据
   * @returns 是否满足联动条件
   */
  function checkLinkageCondition(condition: LinkageCondition, formData: Record<string, any>): boolean {
    const { prop, value, operator = '==' } = condition
    const fieldValue = formData[prop]

    switch (operator) {
      case '==':
        return fieldValue === value
      case '!=':
        return fieldValue !== value
      case '>':
        return Number(fieldValue) > Number(value)
      case '<':
        return Number(fieldValue) < Number(value)
      case '>=':
        return Number(fieldValue) >= Number(value)
      case '<=':
        return Number(fieldValue) <= Number(value)
      case 'includes':
        return Array.isArray(fieldValue) ? fieldValue.includes(value) : String(fieldValue).includes(String(value))
      case 'notIncludes':
        return Array.isArray(fieldValue) ? !fieldValue.includes(value) : !String(fieldValue).includes(String(value))
      default:
        return true
    }
  }

  /**
   * 返回工具方法集合
   */
  return {
    componentRefs,        // 组件引用集合
    setComponentRef,      // 设置组件引用
    getComponentRef,      // 获取组件引用
    mutedPlaceholder,     // 生成占位符
    extraEvents,          // 增强事件处理
    calcFormItemWidth,    // 计算表单项宽度
    checkLinkageCondition, // 检查联动条件
  }
}
