<template>
  <el-upload
    v-model:file-list="uploadFiles"
    ref="uploadRef"
    action="#"
    :disabled="disabled"
    :auto-upload="false"
    :on-exceed="handleExceed"
    :on-change="uploadChange"
  >
    <template v-for="(value, key) in slots" #[key]>
      <slot :name="value" :config="config" />
    </template>

    <template v-if="!slots?.['trigger']" #trigger>
      <template v-if="config?.attrs?.drag">
        <el-icon><UploadFilled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div
          v-if="config?.attrs?.fileType"
          style="color: #a2aaba; font-size: 0.75rem; margin-top: 0.5rem"
        >
          仅限{{ config?.attrs?.fileType }}文件
        </div>
      </template>
      <el-button
        v-else-if="!config?.attrs?.['list-type'] || config?.attrs?.['list-type'] === 'text'"
        :disabled="disabled"
        type="primary"
      >
        <template #icon>
          <el-icon><UploadFilled /></el-icon>
        </template>
        上传
      </el-button>
      <el-icon v-else><Plus /></el-icon>
    </template>

    <template v-if="!slots?.['file']" #file="{ file }">
      <div
        v-if="!config?.attrs?.['list-type'] || config?.attrs?.['list-type'] === 'text'"
        class="upload-list__item-box"
      >
        <el-icon><Tickets /></el-icon>
        <span class="upload-list__item-name">{{ file.name || (file as any).fileName }}</span>
        <el-icon :color="'var(--color-text-5)'" @click="fileDownload(file)" title="下载">
          <Download />
        </el-icon>
        <el-icon
          v-if="!disabled"
          :color="'var(--color-danger)'"
          @click="fileDelete(file)"
          title="删除"
        >
          <Delete />
        </el-icon>
      </div>
      <div v-else>
        <template>
          <!-- 视频 -->
          <video
            v-if="file.raw?.type.startsWith('video')"
            :src="file.url"
            style="width: 100%; height: 100%; object-fit: cover"
          ></video>
          <!-- 音频 -->
          <!--          <img v-else-if="file.raw.type.startsWith('audio')" class="el-upload-list__item-thumbnail" :src="AudioBg" />-->
          <img v-else class="el-upload-list__item-thumbnail" :src="file.url" :alt="file.name" />
        </template>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="filePreview(file)">
            <el-icon><ZoomIn /></el-icon>
          </span>
          <span
            v-if="!disabled && (file as any).id"
            class="el-upload-list__item-download"
            @click="fileDownload(file)"
          >
            <el-icon>
              <Download />
            </el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="fileDelete(file)">
            <el-icon>
              <Delete />
            </el-icon>
          </span>
        </span>
      </div>
    </template>

    <el-dialog v-model="dialogVisible" title="预览" append-to-body top="5vh" width="90%">
      <div class="preview-box">
        <video
          v-if="previewFile?.type?.startsWith('video')"
          ref="videoRef"
          class="previewedFile"
          :src="previewFileUrl"
          controls
          preload="auto"
        ></video>
        <audio
          v-else-if="previewFile?.type?.startsWith('audio')"
          ref="audioRef"
          class="previewedFile"
          :src="previewFileUrl"
          controls
          preload="auto"
        ></audio>
        <img
          v-else-if="previewFile?.type?.startsWith('image')"
          w-full
          class="previewedFile"
          :src="previewFileUrl"
          alt="预览图片"
        />
      </div>
      <slot v-if="slots?.['preview']" :name="slots?.['preview']"></slot>
    </el-dialog>
  </el-upload>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElMessage, ElUpload, ElButton, ElIcon, ElDialog, genFileId } from 'element-plus'
import { UploadFilled, Plus, Tickets, Download, Delete, ZoomIn } from '@element-plus/icons-vue'

interface Props {
  modelValue?: Record<string, any> | any[]
  config?: Record<string, any>
  disabled?: boolean
  fileSize?: number
  slots?: Record<string, any>  // 自定义插槽配置
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  fileSize: 5120,
})
const emit = defineEmits(['update:modelValue'])

const uploadFiles = computed({
  get: () => props.modelValue as any[],
  set: (value) => emit('update:modelValue', value),
})

const uploadRef = ref()

const limit = computed(() => props.config?.attrs?.limit || 99)
const fileType = computed(
  () => props.config?.attrs?.fileType || 'PNG,JPEG,JPG,PDF,DOC,DOCX,XLS,XLSX,MP4,AVI,ZIP,XML',
)

// 文件上传
const uploadChange = (file: any, files: any[]) => {
  const checkFileRes = checkFile(file.raw)
  if (!checkFileRes) {
    const index = files.findIndex((a: any) => a.uid === file.uid)
    if (index > -1) {
      files.splice(index, 1)
    }
  }
}

// 限制文件数量
const handleExceed = (files: any[], fileList: any[]) => {
  if (Number(limit.value) < 2) {
    uploadRef.value?.clearFiles()
    const file = files[0]
    file.uid = genFileId()
    uploadRef.value?.handleStart(file)
  } else {
    ElMessage.warning(
      `当前限制选择 ${limit.value} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
    )
  }
}

// 文件类型及大小校验  50MB
const checkFile = (file: any) => {
  const sizeCheck = file.size / (1024 * 1024) < props.fileSize
  const fileArr = file.name.split('.')
  const suffixLowerCase = fileArr[fileArr.length - 1]?.toLowerCase()
  const typeCheck = fileType.value?.toLowerCase().indexOf(suffixLowerCase) >= 0
  if (!typeCheck) {
    ElMessage.error('文件类型必须为' + fileType.value?.toUpperCase() + '!')
    return false
  }
  if (!sizeCheck) {
    ElMessage.error(`上传文件大小不能超过 ${props.fileSize}MB!`)
    return false
  }

  // 判断文件是否已上传
  const flag = uploadFiles.value?.find((a: any) => a.name === file.name && a.size === file.size)
  if (flag) {
    return false
  }

  return suffixLowerCase
}

// 下载文件
const fileDownload = (file: any) => {
  if (file.raw) {
    file = file.raw
  }

  const blobUrl = file.url || URL.createObjectURL(file)

  // 创建一个临时的<a>标签
  const downloadLink = document.createElement('a')
  if ('download' in document.createElement('a')) {
    // 检查浏览器是否支持下载属性
    // 设置下载属性值为文件名
    downloadLink.download = file.name + file.fileType || '' || file.filename
  }
  downloadLink.style.display = 'none'
  // 设置<a>标签的href属性为Blob URL
  downloadLink.href = blobUrl
  document.body.appendChild(downloadLink)
  // 触发<a>标签的点击事件
  downloadLink.click()

  // 移除元素并释放URL对象
  document.body.removeChild(downloadLink)
  URL.revokeObjectURL(blobUrl)
}

// 删除文件
const fileDelete = (file: any) => {
  const files = uploadFiles.value
  if (files && Array.isArray(files)) {
    files.splice(files.indexOf(file), 1)
  }
}

// 预览文件
const dialogVisible = ref(false)
const previewFile = ref<any>({})
const previewFileUrl = ref('')
const filePreview = (file: any) => {
  if (file.raw) {
    file = file.raw
  }

  previewFileUrl.value = file.url || URL.createObjectURL(file)

  previewFile.value = file
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.upload-list__item-box {
  height: 24px;
  /* 自动布局 */
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 8px;
  border-radius: 2px;
  /* color-bg-2 */
  /* 样式描述：浅蓝色装饰背景 */
  background: #eff6ff;

  font-size: 14px;
  color: var(color-text-1);

  .upload-list__item-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .el-icon {
    cursor: pointer;
  }
}

.preview-box {
  height: 80vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
}
</style>
