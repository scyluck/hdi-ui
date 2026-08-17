(function () {
  const PAGE_SIZE = 60
  const GROUP_LABELS = {
    '60': '60 系列',
    '80': '80 系列',
    '90': '90 系列',
    'custom': 'Custom 自定义',
    'other': '其他'
  }
  const GROUP_ORDER = ['60', '80', '90', 'custom', 'other']

  let allEntries = []
  let keyword = ''
  let activeTab = null       // 当前激活的 tab key, null 表示全部
  let visibleCount = PAGE_SIZE
  let toastTimer = null
  let inputTimer = null

  const base = document.querySelector('#icon-gallery-mount')
  if (!base) return

  const mountHTML = `
    <div class="icon-gallery">
      <div class="ig-header">
        <input class="ig-input" type="text" placeholder="搜索图标名称（不区分大小写）" />
        <span class="ig-count">共 0 个图标</span>
      </div>
      <div class="ig-empty">加载中...</div>
      <div class="ig-tabs"></div>
      <div class="ig-tab-content"></div>
      <div class="ig-toast" aria-live="polite"></div>
    </div>
  `
  base.insertAdjacentHTML('beforebegin', mountHTML)
  base.remove()

  const gallery = document.querySelector('.icon-gallery')
  const input = gallery.querySelector('.ig-input')
  const countEl = gallery.querySelector('.ig-count')
  const emptyEl = gallery.querySelector('.ig-empty')
  const tabsEl = gallery.querySelector('.ig-tabs')
  const contentEl = gallery.querySelector('.ig-tab-content')
  const toastEl = gallery.querySelector('.ig-toast')

  const copyName = async (name) => {
    try {
      await navigator.clipboard.writeText(name)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = name
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    toastEl.textContent = `已复制：${name}`
    toastEl.classList.add('is-show')
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-show')
      gallery.querySelectorAll('.is-copied').forEach((el) => el.classList.remove('is-copied'))
    }, 2000)
  }

  /** 按分组组织数据 */
  const getGrouped = () => {
    const filtered = keyword.trim()
      ? allEntries.filter((e) => e.name.toLowerCase().includes(keyword.toLowerCase()))
      : allEntries

    const grouped = {}
    for (const e of filtered) {
      if (!grouped[e.group]) grouped[e.group] = []
      grouped[e.group].push(e)
    }
    return grouped
  }

  /** 获取分组数量统计（不受搜索影响） */
  const getGroupCounts = () => {
    const counts = {}
    for (const e of allEntries) {
      counts[e.group] = (counts[e.group] || 0) + 1
    }
    return counts
  }

  /** 获取过滤后的条目 */
  const getFilteredEntries = () => {
    if (activeTab === null) {
      return keyword.trim()
        ? allEntries.filter((e) => e.name.toLowerCase().includes(keyword.toLowerCase()))
        : allEntries
    }
    return keyword.trim()
      ? allEntries.filter((e) => e.group === activeTab && e.name.toLowerCase().includes(keyword.toLowerCase()))
      : allEntries.filter((e) => e.group === activeTab)
  }

  const createCard = (entry) => {
    const card = document.createElement('div')
    card.className = 'ig-item'
    card.title = `点击复制 ${entry.name}`
    const svgNS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('xmlns', svgNS)
    svg.setAttribute('class', 'ig-svg')
    svg.setAttribute('viewBox', entry.viewBox)
    svg.setAttribute('fill', 'currentColor')
    svg.setAttribute('aria-hidden', 'true')
    svg.setAttribute('focusable', 'false')
    svg.innerHTML = entry.inner
    const span = document.createElement('span')
    span.className = 'ig-name'
    span.textContent = entry.name
    card.appendChild(svg)
    card.appendChild(span)
    card.addEventListener('click', () => {
      gallery.querySelectorAll('.is-copied').forEach((el) => el.classList.remove('is-copied'))
      card.classList.add('is-copied')
      copyName(entry.name)
    })
    return card
  }

  const renderTabs = () => {
    const counts = getGroupCounts()
    const availableGroups = GROUP_ORDER.filter((g) => counts[g])

    tabsEl.innerHTML = ''

    // "全部" tab
    const allTab = document.createElement('button')
    allTab.className = 'ig-tab' + (activeTab === null ? ' is-active' : '')
    allTab.type = 'button'
    allTab.innerHTML = `<span class="ig-tab-label">全部</span><span class="ig-tab-badge">${allEntries.length}</span>`
    allTab.addEventListener('click', () => {
      activeTab = null
      visibleCount = PAGE_SIZE
      renderTabs()
      renderContent()
    })
    tabsEl.appendChild(allTab)

    for (const g of availableGroups) {
      const tab = document.createElement('button')
      tab.className = 'ig-tab' + (activeTab === g ? ' is-active' : '')
      tab.type = 'button'
      tab.dataset.group = g
      tab.innerHTML = `<span class="ig-tab-label">${GROUP_LABELS[g] ?? g}</span><span class="ig-tab-badge">${counts[g]}</span>`
      tab.addEventListener('click', () => {
        activeTab = g
        visibleCount = PAGE_SIZE
        renderTabs()
        renderContent()
      })
      tabsEl.appendChild(tab)
    }
  }

  const renderContent = () => {
    const entries = getFilteredEntries()
    const total = entries.length
    countEl.textContent = `共 ${total} 个图标`

    contentEl.innerHTML = ''

    if (total === 0) {
      emptyEl.style.display = 'block'
      emptyEl.textContent = '未找到匹配的图标'
      return
    }
    emptyEl.style.display = 'none'

    const slice = entries.slice(0, visibleCount)
    const hasMore = visibleCount < total

    const grid = document.createElement('div')
    grid.className = 'ig-grid'
    const frag = document.createDocumentFragment()
    for (const entry of slice) frag.appendChild(createCard(entry))
    grid.appendChild(frag)
    contentEl.appendChild(grid)

    if (hasMore) {
      const moreBtn = document.createElement('button')
      moreBtn.className = 'ig-more'
      moreBtn.type = 'button'
      moreBtn.textContent = `加载更多（已显示 ${visibleCount} / ${total}）`
      moreBtn.addEventListener('click', () => {
        visibleCount = Math.min(visibleCount + PAGE_SIZE, total)
        renderContent()
      })
      contentEl.appendChild(moreBtn)
    }
  }

  const onInput = () => {
    clearTimeout(inputTimer)
    inputTimer = setTimeout(() => {
      keyword = input.value ?? ''
      visibleCount = PAGE_SIZE
      renderContent()
    }, 150)
  }

  input.addEventListener('input', onInput)

  ;(async () => {
    try {
      const resp = await fetch(new URL('/icons-data.json', window.location.href).toString())
      allEntries = await resp.json()
      const counts = getGroupCounts()
      activeTab = GROUP_ORDER.find((g) => counts[g]) ?? null
      renderTabs()
      renderContent()
    } catch (err) {
      emptyEl.style.display = 'block'
      emptyEl.textContent = `图标数据加载失败：${err.message ?? err}`
    }
  })()
})()
