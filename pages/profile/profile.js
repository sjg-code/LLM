// pages/profile/profile.js
Page({
  data: {
    userAvatar: '',
    stats: {
      totalVisits: 28,
      totalNav: 15,
      totalShare: 3
    },
    quickMenus: [
      { key: 'history', label: '查找记录', icon: '📋', color: 'green' },
      { key: 'favorite', label: '收藏厕所', icon: '⭐', color: 'orange' },
      { key: 'feedback', label: '意见反馈', icon: '💬', color: 'blue' },
      { key: 'report', label: '上报厕所', icon: '📥', color: 'purple' }
    ],
    achievements: [
      {
        id: 1,
        name: '初来乍到',
        desc: '首次使用拉了么',
        icon: '🌟',
        unlocked: true
      },
      {
        id: 2,
        name: '厕所达人',
        desc: '累计查找10次',
        icon: '🏆',
        unlocked: true
      },
      {
        id: 3,
        name: '分享达人',
        desc: '累计分享5次',
        icon: '📣',
        unlocked: false
      }
    ],
    settings: [
      { key: 'location', label: '定位设置', icon: '📍', value: '自动' },
      { key: 'notification', label: '消息通知', icon: '🔔', value: '已开启' },
      { key: 'cache', label: '清除缓存', icon: '🗑' },
      { key: 'about', label: '关于我们', icon: 'ℹ' },
      { key: 'privacy', label: '隐私政策', icon: '🔒' }
    ]
  },

  editProfile() {
    wx.showToast({ title: '编辑资料', icon: 'none' })
  },

  // 更换头像
  changeAvatar() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({ userAvatar: tempFilePath })
        wx.showToast({ title: '头像已更换', icon: 'success' })
      }
    })
  },

  onQuickTap(e) {
    const key = e.currentTarget.dataset.key
    if (key === 'report') {
      wx.navigateTo({ url: '/pages/upload/upload' })
      return
    }
    const tips = {
      history: '查找记录功能开发中...',
      favorite: '收藏厕所功能开发中...',
      feedback: '意见反馈功能开发中...'
    }
    wx.showToast({ title: tips[key] || '开发中...', icon: 'none' })
  },

  viewAchievements() {
    wx.showToast({ title: '成就系统开发中...', icon: 'none' })
  },

  onSettingTap(e) {
    const key = e.currentTarget.dataset.key
    if (key === 'cache') {
      wx.showModal({
        title: '清除缓存',
        content: '确定要清除本地缓存数据吗？',
        success: (res) => {
          if (res.confirm) {
            wx.clearStorage({
              success: () => {
                wx.showToast({ title: '缓存已清除', icon: 'success' })
              }
            })
          }
        }
      })
    } else if (key === 'about') {
      wx.showModal({
        title: '关于拉了么',
        content: '拉了么 - 找厕所神器 v1.0.0\n\n快速找到身边的公共厕所，再也不怕内急！',
        showCancel: false
      })
    } else {
      wx.showToast({ title: '设置功能开发中...', icon: 'none' })
    }
  }
})
