// pages/sos/sos.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    postContent: '',
    canPost: false,
    posts: [],
    activeCount: 0,
    resolvedCount: 0
  },

  onShow() {
    this.loadPosts()
  },

  onInput(e) {
    const val = e.detail.value
    this.setData({
      postContent: val,
      canPost: val.trim().length > 0
    })
  },

  submitPost() {
    if (!this.data.canPost) return
    const { latitude, longitude } = app.globalData
    util.saveSosPost(this.data.postContent, latitude, longitude, '我')
    this.setData({ postContent: '', canPost: false })
    wx.showToast({ title: '求助已发布', icon: 'success' })
    this.loadPosts()
  },

  loadPosts() {
    const { latitude, longitude } = app.globalData
    const posts = util.getSosPosts(latitude || 22.657, longitude || 114.0435)

    const formatTime = (iso) => {
      const diff = Date.now() - new Date(iso).getTime()
      if (diff < 60000) return '刚刚'
      if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
      return Math.floor(diff / 3600000) + '小时前'
    }

    const formatExpire = (expireAt) => {
      const remain = expireAt - Date.now()
      if (remain <= 0) return null
      const mins = Math.floor(remain / 60000)
      if (mins < 1) return '不足1分钟'
      return mins + '分钟'
    }

    const formatted = posts.map(p => ({
      ...p,
      timeText: formatTime(p.time),
      expireText: formatExpire(p.expireAt)
    }))

    this.setData({
      posts: formatted,
      activeCount: formatted.filter(p => !p.resolved).length,
      resolvedCount: formatted.filter(p => p.resolved).length
    })
  },

  replySos(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '推荐厕所',
      placeholderText: '输入你推荐的厕所名称',
      editable: true,
      success: (res) => {
        if (res.confirm && res.content) {
          // 模拟添加回复
          try {
            const key = 'sos_posts'
            let list = JSON.parse(wx.getStorageSync(key) || '[]')
            list = list.map(p => {
              if (p.id === id) {
                return {
                  ...p,
                  replies: [...(p.replies || []), {
                    userName: '热心市民',
                    content: res.content,
                    time: new Date().toISOString()
                  }]
                }
              }
              return p
            })
            wx.setStorageSync(key, JSON.stringify(list))
            util.addPoints(5)
            wx.showToast({ title: '感谢帮助！+5积分', icon: 'none' })
            this.loadPosts()
          } catch (err) {}
        }
      }
    })
  },

  resolveSos(e) {
    const id = e.currentTarget.dataset.id
    try {
      const key = 'sos_posts'
      let list = JSON.parse(wx.getStorageSync(key) || '[]')
      list = list.map(p => {
        if (p.id === id) return { ...p, resolved: !p.resolved }
        return p
      })
      wx.setStorageSync(key, JSON.stringify(list))
      this.loadPosts()
    } catch (err) {}
  }
})
