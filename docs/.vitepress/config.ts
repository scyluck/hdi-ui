import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Hdi UI',
  description: '公司统一前端 UI 框架 - Vue3 + Element Plus + TypeScript',

  // 仓库地址，用于生成编辑链接
  repo: 'https://github.com/scyluck/hdi-ui',
  docsDir: 'docs',

  // 主题配置
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/installation' },
      { text: '组件', link: '/components/table' },
      { text: '开发指南', link: '/dev/guide' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速上手', link: '/guide/quick-start' },
            { text: 'CDN 引入', link: '/guide/cdn' },
          ],
        },
      ],
      '/dev/': [
        {
          text: '开发指南',
          items: [
            { text: '扩展组件', link: '/dev/guide' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Icon 图标', link: '/components/icon' },
            { text: '图标总览', link: '/components/icon-gallery' },
          ],
        },
        {
          text: '表单组件',
          items: [
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Dictionary 字典', link: '/components/dictionary' },
          ],
        },
        {
          text: '数据展示',
          items: [
            { text: 'Table 表格', link: '/components/table' },
          ],
        },
      ],
    },

    // 页面右上角社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/scyluck/hdi-ui' },
    ],

    // 页面底部
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Hdi UI',
    },

    // 搜索
    search: {
      provider: 'local',
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/scyluck/hdi-ui/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    // 大纲
    outline: {
      level: [2, 3],
      label: '本页目录',
    },

    // 文档元信息
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    // 顶部返回
    returnToTopLabel: '回到顶部',

    // 侧边栏标签
    sidebarMenuLabel: '菜单',

    // 暗黑模式
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
