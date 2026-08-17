import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    if (typeof window === 'undefined') return

    const injectedStyles = new Set<string>()
    const injectedScripts = new Set<string>()
    let mounted = false

    const injectStyle = (url: string) => {
      if (injectedStyles.has(url)) return
      injectedStyles.add(url)
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      document.head.appendChild(link)
    }

    const injectScript = (url: string) => {
      if (injectedScripts.has(url)) return
      injectedScripts.add(url)
      const script = document.createElement('script')
      script.type = 'module'
      script.src = url
      script.defer = true
      document.head.appendChild(script)
    }

    const mountGallery = () => {
      const anchor = document.getElementById('icon-gallery-mount')
      if (!anchor || mounted) return
      mounted = true
      injectStyle(`${import.meta.env.BASE_URL}icon-gallery.css`)
      injectScript(`${import.meta.env.BASE_URL}icon-gallery.js`)
    }

    // 首屏渲染后尝试挂载
    if (document.readyState === 'complete') {
      setTimeout(mountGallery, 100)
    } else {
      window.addEventListener('load', () => setTimeout(mountGallery, 100), { once: true })
    }

    // SPA 路由切换后重新尝试挂载
    router.onAfterRouteChanged = () => {
      mounted = false
      setTimeout(mountGallery, 100)
    }
  },
}
