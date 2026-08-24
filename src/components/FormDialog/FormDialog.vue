<template>
  <!-- Dialog 模式 -->
  <el-dialog
      v-if="mode === 'dialog'"
      v-model="visible"
      :title="computedTitle"
      :width="width"
      :height="height"
      :show-close="showClose"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :append-to-body="appendToBody"
      :destroy-on-close="true"
      @closed="handleClosed"
  >
    <HdiForm
        ref="formRef"
        :config="mergedFormConfig"
        v-model="innerFormData"
        :disabled="isView"
        @submit="handleSubmit"
        @reset="handleCancel"
    >
      <template v-for="slot in formSlotNames" #[slot]="scope">
        <slot :name="slot" v-bind="scope"/>
      </template>
    </HdiForm>
  </el-dialog>

  <!-- Drawer 模式 -->
  <el-drawer
      v-else
      v-model="visible"
      :title="computedTitle"
      :size="width"
      :direction="direction"
      :show-close="showClose"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :append-to-body="appendToBody"
      :destroy-on-close="true"
      @closed="handleClosed"
  >
    <HdiForm
        ref="formRef"
        :config="mergedFormConfig"
        v-model="innerFormData"
        :disabled="isView"
        @submit="handleSubmit"
        @reset="handleCancel"
    >
      <template v-for="slot in formSlotNames" #[slot]="scope">
        <slot :name="slot" v-bind="scope"/>
      </template>
    </HdiForm>
  </el-drawer>
</template>

<script setup lang="ts">
import {computed, ref, useSlots} from 'vue'
import {ElDialog, ElDrawer} from 'element-plus'
import HdiForm from '../Form/Form.vue'
import type {FormConfig} from '../Form/types'

defineOptions({name: 'HdiFormDialog'})

interface Props {
  mode?: 'dialog' | 'drawer'
  /** 默认类型，可被 open({type}) 覆盖 */
  type?: 'add' | 'edit' | 'view'
  /** 弹窗标题，传则覆盖按 type 生成的默认标题（新增/编辑/查看） */
  title?: string
  /** 弹窗宽度（Dialog 模式）或尺寸（Drawer 模式） */
  width?: string
  /** Dialog 模式下的高度 */
  height?: string
  /** 是否显示关闭按钮 */
  showClose?: boolean
  /** 点击遮罩是否关闭 */
  closeOnClickModal?: boolean
  /** ESC 是否关闭 */
  closeOnPressEscape?: boolean
  appendToBody?: boolean
  /** Drawer 模式方向 */
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  formConfig?: FormConfig
  formData?: Record<string, any>
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'dialog',
  type: 'add',
  title: '',
  width: '50%',
  height: undefined,
  showClose: true,
  closeOnClickModal: false,
  closeOnPressEscape: true,
  appendToBody: false,
  direction: 'rtl',
  formConfig: () => ({items: []}),
  formData: () => ({}),
  loading: false,
})

const emit = defineEmits<{
  (e: 'submit', data: Record<string, any>, done: (ok?: boolean) => void): void
  (e: 'cancel', data?: Record<string, any>): void
  (e: 'closed'): void
}>()

const slots = useSlots()

const visible = ref(false)
const innerFormData = ref<Record<string, any>>({})
const loadingRef = ref(false)
const typeRef = ref<'add' | 'edit' | 'view'>('add')
const titleRef = ref('')
const recordRef = ref<any>(null)

const formRef = ref()

// 透传给 HdiForm 的插槽：排除 FormDialog 自身使用的 footer/footer-extra
const formSlotNames = computed(() =>
    Object.keys(slots).filter(name => name !== 'footer' && name !== 'footer-extra')
)

const isView = computed(() => typeRef.value === 'view')

/**
 * 按 type 内建默认 title（不新增额外属性）：
 * add → 新增、edit → 编辑、view → 查看
 * 优先级：
 *   1. open({title}) 传入的（本次打开临时覆盖）
 *   2. props.title 配置的（全局默认）
 *   3. 按 type 的内建默认值
 */
const DEFAULT_TITLE_BY_TYPE: Record<'add' | 'edit' | 'view', string> = {
  add: '新增',
  edit: '编辑',
  view: '查看',
}

const computedTitle = computed(() => {
  // 暂存本次 open 传入的 title 或 props.title 或 type 内建默认
  // 这里 titleRef 的值是 open({title}) 传入，为空则 fallback 到 props.title
  const explicit = titleRef.value || props.title
  if (explicit) return explicit
  return DEFAULT_TITLE_BY_TYPE[typeRef.value] || ''
})

/**
 * 合并表单配置。
 * 按钮的文字、对齐、显示等直接用 formConfig 原生属性，不再新增重复 props。
 */
const mergedFormConfig = computed<FormConfig>(() => {
  const cfg = props.formConfig || {}
  return {
    ...cfg,
    // 查看态隐藏提交按钮
    showSubmit: typeof cfg.showSubmit === 'boolean' ? cfg.showSubmit : !isView.value,
    // 始终显示取消（等同于重置按钮）
    showReset: typeof cfg.showReset === 'boolean' ? cfg.showReset : true,
    // 反向：提交在右、取消在左
    isReverseButton: cfg.isReverseButton !== undefined ? cfg.isReverseButton : true,
    // 按钮文字：使用 formConfig.submitButtonText / formConfig.resetButtonText
    // 若未显式配置则用内建默认（'保存' / '取消'）
    submitButtonText: cfg.submitButtonText || '保存',
    resetButtonText: cfg.resetButtonText || '取消',
  }
})

const handleSubmit = (data: Record<string, any>) => {
  // HdiForm 的 submit 已经过校验，这里直接合并 record 后 emit
  emit('submit', {...recordRef.value, ...data}, (ok?: boolean) => {
    if (ok !== false) {
      visible.value = false
    }
    loadingRef.value = false
  })
}

const handleCancel = () => {
  emit('cancel', innerFormData.value)
  visible.value = false
}

const handleClosed = () => {
  typeRef.value = 'add'
  titleRef.value = ''
  recordRef.value = null
  innerFormData.value = {}
  emit('closed')
}

/**
 * 打开弹窗。title 不再必须传：不传则按 props.title + type 内建默认生效。
 */
const open = (options: {
  type?: 'add' | 'edit' | 'view';
  record?: any;
  title?: string;
  formData?: Record<string, any>
}) => {
  const type = options.type || props.type || 'add'
  typeRef.value = type
  // 只记录显式传的 title；计算时会自动 fallback 到 props.title / type 默认
  titleRef.value = options.title || ''
  recordRef.value = options.record || null

  if (type === 'add') {
    innerFormData.value = {...(options.formData || props.formData || {})}
  } else {
    innerFormData.value = {...(options.record || props.formData || {})}
  }

  visible.value = true
}

const close = () => {
  visible.value = false
}

defineExpose({
  open,
  close,
  formRef,
})
</script>
