// pages/community/community.js
const util = require('../../utils/util.js')

Page({
  data: {
    newContent: '',
    newPhotos: [],
    posts: []
  },

  onShow() {
    this.loadPosts()
  },

  onComposerInput(e) {
    this.setData({ newContent: e.detail.value })
  },

  addPhoto() {
    const remain = 3 - this.data.newPhotos.length
    if (remain <= 0) return
    wx.chooseMedia({
      count: remain,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const paths = res.tempFiles.map(f => f.tempFilePath)
        this.setData({ newPhotos: [...this.data.newPhotos, ...paths] })
      }
    })
  },

  delPhoto(e) {
    const i = e.currentTarget.dataset.i
    const photos = [...this.data.newPhotos]
    photos.splice(i, 1)
    this.setData({ newPhotos: photos })
  },

  publish() {
    const content = this.data.newContent.trim()
    if (!content) {
      wx.showToast({ title: '请输入内容', icon: 'none' })
      return
    }
    util.savePost(content, this.data.newPhotos, '我')
    this.setData({ newContent: '', newPhotos: [] })
    wx.showToast({ title: '发布成功 +2积分', icon: 'success' })
    this.loadPosts()
  },

  loadPosts() {
    const posts = util.getPosts()
    const formatTime = (iso) => {
      const diff = Date.now() - new Date(iso).getTime()
      if (diff < 60000) return '刚刚'
      if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
      if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
      const d = new Date(iso)
      return `${d.getMonth() + 1}月${d.getDate()}日`
    }
    this.setData({
      posts: posts.map(p => ({ ...p, timeText: formatTime(p.time) }))
    })
  },

  toggleLike(e) {
    const id = e.currentTarget.dataset.id
    util.likePost(id)
    this.loadPosts()
  },

  commentPost(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '发表评论',
      placeholderText: '说点什么...',
      editable: true,
      success: (res) => {
        if (res.confirm && res.content) {
          try {
            const key = 'community_posts'
            let list = JSON.parse(wx.getStorageSync(key) || '[]')
            list = list.map(p => {
              if (p.id === id) {
                return {
                  ...p,
                  comments: [...(p.comments || []), {
                    userName: '我',
                    content: res.content,
                    time: new Date().toISOString()
                  }]
                }
              }
              return p
            })
            wx.setStorageSync(key, JSON.stringify(list))
            this.loadPosts()
          } catch (err) {}
        }
      }
    })
  }
})
