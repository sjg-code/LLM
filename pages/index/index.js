// pages/index/index.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    latitude: 22.6570,
    longitude: 114.0435,
    scale: 15,
    markers: [],
    toiletList: [],
    filteredList: [],
    loading: true,
    locationReady: false,
    mapExpanded: false,
    activeFilter: 'all',
    filters: [
      { key: 'all', label: '全部', icon: '🏠' },
      { key: 'public', label: '公厕', icon: '🚻' },
      { key: 'mall', label: '商场', icon: '🏬' },
      { key: 'metro', label: '地铁站', icon: '🚇' },
      { key: 'park', label: '公园', icon: '🌳' },
      { key: 'hospital', label: '医院', icon: '🏥' }
    ]
  },

  onLoad() {
    this.initLocation()
  },

  onPullDownRefresh() {
    this.initLocation().then(() => {
      wx.stopPullDownRefresh()
    }).catch(() => {
      wx.stopPullDownRefresh()
    })
  },

  // 初始化定位
  async initLocation() {
    this.setData({ loading: true })

    try {
      const hasAuth = await app.checkLocationAuth()
      if (!hasAuth) {
        console.log('使用默认位置（深圳龙华）')
      }

      const location = await app.getLocation()
      const { latitude, longitude } = location

      this.setData({ latitude, longitude, locationReady: true })
      this.loadNearbyToilets(latitude, longitude)
    } catch (err) {
      console.error('定位失败，使用默认位置:', err)
      const { latitude, longitude } = app.globalData
      this.setData({ latitude, longitude, locationReady: true })
      this.loadNearbyToilets(latitude, longitude)
    }
  },

  // 加载附近厕所
  loadNearbyToilets(lat, lng) {
    // 获取模拟数据
    const mockToilets = util.generateMockToilets(lat, lng)
    // 获取用户上报数据
    const userToilets = util.getApprovedUserToilets(lat, lng)
    // 合并并按距离排序，取前10个
    const toiletList = [...mockToilets, ...userToilets]
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10)

    const markers = toiletList.map((toilet, index) => ({
      id: toilet.id,
      latitude: toilet.latitude,
      longitude: toilet.longitude,
      title: toilet.name,
      width: 32,
      height: 32,
      iconPath: '/images/toilet-marker.png',
      callout: {
        content: `${index + 1}. ${toilet.name}`,
        display: 'BYCLICK',
        bgColor: '#fff',
        color: '#1A1A1A',
        fontSize: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        padding: 10
      },
      label: {
        content: `${index + 1}`,
        color: '#fff',
        fontSize: 11,
        x: -4,
        y: -4,
        borderWidth: 0,
        bgColor: '#07C160',
        borderRadius: 12,
        padding: 3
      }
    }))

    this.setData({
      toiletList,
      markers,
      loading: false
    })

    // 应用当前筛选
    this.applyFilter()
  },

  // 筛选标签点击
  onFilterTap(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ activeFilter: key })
    this.applyFilter()
  },

  // 应用筛选
  applyFilter() {
    const { toiletList, activeFilter } = this.data
    let filteredList = [...toiletList]

    // 根据筛选条件过滤（模拟数据不区分类型，实际项目中按type过滤）
    if (activeFilter !== 'all') {
      // 模拟：按标签包含关系筛选
      const filterMap = {
        'public': ['公厕', '24小时'],
        'mall': ['有纸巾', '有洗手液'],
        'metro': ['交通便利'],
        'park': ['干净', '环境好'],
        'hospital': ['无障碍']
      }
      const keywords = filterMap[activeFilter] || []
      if (keywords.length) {
        filteredList = filteredList.filter(t =>
          t.tags && t.tags.some(tag => keywords.some(k => tag.includes(k)))
        )
      }
    }

    // 更新地图标记
    const markers = filteredList.map((toilet, index) => ({
      id: toilet.id,
      latitude: toilet.latitude,
      longitude: toilet.longitude,
      title: toilet.name,
      width: 32,
      height: 32,
      iconPath: '/images/toilet-marker.png',
      callout: {
        content: `${index + 1}. ${toilet.name}`,
        display: 'BYCLICK',
        bgColor: '#fff',
        color: '#1A1A1A',
        fontSize: 13,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        padding: 10
      },
      label: {
        content: `${index + 1}`,
        color: '#fff',
        fontSize: 11,
        x: -4,
        y: -4,
        borderWidth: 0,
        bgColor: '#07C160',
        borderRadius: 12,
        padding: 3
      }
    }))

    this.setData({ filteredList, markers })
  },

  // 地图展开/收起
  toggleMapExpand() {
    this.setData({ mapExpanded: !this.data.mapExpanded })
  },

  // 点击地图标记
  onMarkerTap(e) {
    const markerId = e.markerId
    const index = this.data.filteredList.findIndex(t => t.id === markerId)
    if (index !== -1) {
      this.goDetail({ currentTarget: { dataset: { index } } })
    }
  },

  // 进入详情页
  goDetail(e) {
    const index = e.currentTarget.dataset.index
    const toilet = this.data.filteredList[index]
    if (!toilet) return

    wx.navigateTo({
      url: `/pages/detail/detail?id=${toilet.id}&data=${encodeURIComponent(JSON.stringify(toilet))}`
    })
  },

  // 重新定位
  relocate() {
    wx.showLoading({ title: '定位中...' })
    this.initLocation().then(() => {
      wx.hideLoading()
      wx.showToast({ title: '定位成功', icon: 'success' })
    }).catch(() => {
      wx.hideLoading()
      wx.showToast({ title: '定位失败', icon: 'none' })
    })
  },

  // 列表滚动到底部
  onScrollBottom() {
    // 可扩展加载更多
  },

  // 跳转上报页面
  goUpload() {
    wx.navigateTo({
      url: '/pages/upload/upload'
    })
  }
})
