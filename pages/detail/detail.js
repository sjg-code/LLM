// pages/detail/detail.js
Page({
  data: {
    toilet: {},
    markers: []
  },

  onLoad(options) {
    if (options.data) {
      try {
        const toilet = JSON.parse(decodeURIComponent(options.data))
        const markers = [
          {
            id: toilet.id,
            latitude: toilet.latitude,
            longitude: toilet.longitude,
            title: toilet.name,
            width: 36,
            height: 36,
            iconPath: '/images/toilet-marker.png',
            callout: {
              content: toilet.name,
              display: 'ALWAYS',
              bgColor: '#07C160',
              color: '#fff',
              fontSize: 14,
              borderRadius: 12,
              padding: 10,
              borderWidth: 0
            }
          }
        ]

        this.setData({ toilet, markers })
      } catch (e) {
        console.error('解析厕所数据失败:', e)
        wx.showToast({ title: '数据加载失败', icon: 'none' })
      }
    }
  },

  navigateTo() {
    const { latitude, longitude, name, address } = this.data.toilet
    wx.openLocation({
      latitude,
      longitude,
      name,
      address,
      scale: 18,
      fail: () => {
        wx.showToast({ title: '打开导航失败', icon: 'none' })
      }
    })
  },

  onShareAppMessage() {
    const { name } = this.data.toilet
    return {
      title: `推荐一个附近的公厕：${name}`,
      path: `/pages/detail/detail?data=${encodeURIComponent(JSON.stringify(this.data.toilet))}`
    }
  },

  onShareTimeline() {
    const { name } = this.data.toilet
    return {
      title: `发现附近公厕：${name}`,
      query: `data=${encodeURIComponent(JSON.stringify(this.data.toilet))}`
    }
  }
})
