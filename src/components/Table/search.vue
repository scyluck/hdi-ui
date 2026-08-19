<template>
  <div class="search-area" v-if="show">
    <HdiForm
        ref="searchFormRef"
        :config="searchConfig"
        v-model="searchData"
        @submit="handleSubmit"
        @reset="handleReset"
    >
      <template v-for="slot in Object.keys($slots)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
      <!-- 搜索按钮右侧区域：高级搜索展开/收起 + 自定义搜索 -->
      <template v-if="customSearchState" #btn-suffix>
        <el-button
            v-if="customSearchState.hasAdvanced.value && advancedEnabled"
            link
            type="primary"
            @click="customSearchState.toggleAdvanced()"
        >
          {{ advancedExpanded ? advancedCollapseLabel : advancedLabel }}
          <el-icon class="el-icon--right">
            <component :is="advancedExpanded ? IconUp : IconDown"/>
          </el-icon>
        </el-button>
        <CustomSearchConfig
            :items="items"
            :state="customSearchState"
            :button-text="buttonText"
            :icon="icon"
            :btn-bind="btnBind"
        />
      </template>
    </HdiForm>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {ElButton, ElIcon} from 'element-plus'
import type { FormConfig } from '../Form/types'
import HdiForm from '../Form/Form.vue'
import type {TableColumn} from './types'
import type {useTableCustomSearch} from './useTableCustomSearch'
import CustomSearchConfig from './custom-search.vue'
import {Icon80Down as IconDown, Icon80Up as IconUp} from '../../icons'

const props = withDefaults(defineProps<{
  show?: boolean
  searchConfig?: FormConfig
  modelValue?: Record<string, any>
  // 原始 items（用于自定义搜索 popover 显示 label）
  items?: TableColumn[]
  // 自定义搜索状态，传入时启用高级搜索与自定义搜索按钮
  customSearchState?: ReturnType<typeof useTableCustomSearch> | null
}>(), {
  show: true,
  searchConfig: () => ({ items: [] }),
  modelValue: () => ({}),
  items: () => [],
  customSearchState: null,
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'submit', data: any): void
  (e: 'reset'): void
}>()

const searchData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const searchFormRef = ref()

const handleSubmit = (data: any) => {
  emit('submit', data)
}

const handleReset = () => {
  emit('reset')
}

// 解构自定义搜索相关派生值
const advancedEnabled = computed(() => {
  return props.customSearchState?.resolvedConfig.value.enableAdvanced !== false
})
const advancedExpanded = computed(() => !!props.customSearchState?.advancedExpanded.value)
const advancedLabel = computed(() => props.customSearchState?.resolvedConfig.value.advancedLabel || '高级搜索')
const advancedCollapseLabel = computed(() => props.customSearchState?.resolvedConfig.value.advancedCollapseLabel || '收起')
const buttonText = computed(() => props.customSearchState?.resolvedConfig.value.buttonText)
const icon = computed(() => props.customSearchState?.resolvedConfig.value.icon)
const btnBind = computed(() => props.customSearchState?.resolvedConfig.value.btnBind)

defineExpose({
  searchFormRef
})
</script>

<style scoped lang="scss">
</style>
