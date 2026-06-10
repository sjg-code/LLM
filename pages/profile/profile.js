// pages/profile/profile.js
const util = require('../../utils/util.js')
Page({
  data: {
    userAvatar: '',
    userName: '微信用户',
    showSheet: false, // 控制授权面板显示
    tempAvatarUrl: '', // 临时头像URL
    myPoints: 0,
    stats: {
      totalVisits: 28,
      totalNav: 15,
      totalShare: 3
    },
    quickMenus: [
      { key: 'history', label: '查找记录', icon: '📋', color: 'green' },
      { key: 'favorite', label: '收藏厕所', icon: '⭐', color: 'orange' },
      { key: 'mall', label: '积分商城', icon: '🛒', color: 'purple' },
      { key: 'leaderboard', label: '好友排行', icon: '🏆', color: 'blue' },
      { key: 'report', label: '上报厕所', icon: '📥', color: 'green' },
      { key: 'feedback', label: '意见反馈', icon: '💬', color: 'orange' }
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

  onLoad() {
    // 页面加载时尝试从缓存获取用户信息
    this.loadUserInfoFromCache()
  },

  onShow() {
    this.setData({ myPoints: util.getPoints() })
    // 如果没有头像，自动弹出授权面板
    if (!this.data.userAvatar) {
      // 使用 setTimeout 确保页面渲染完成后再弹出
      setTimeout(() => {
        this.showAuthSheet()
      }, 300)
    }
  },

  // 从缓存加载用户信息
  loadUserInfoFromCache() {
    try {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.setData({
          userAvatar: userInfo.avatarUrl,
          userName: userInfo.nickName || '微信用户'
        })
      }
    } catch (e) {
      // 忽略错误
    }
  },

  // 显示授权面板
  showAuthSheet() {
    this.setData({ showSheet: true })
  },

  // 隐藏授权面板
  hideAuthSheet() {
    this.setData({ showSheet: false })
  },

  // 防止触摸移动（阻止背景滚动）
  preventTouchMove() {
    return false
  },

  // 获取微信用户信息（新版：使用组件回调）
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { userName } = this.data
    
    this.setData({
      userAvatar: avatarUrl,
      tempAvatarUrl: avatarUrl
    })
    
    // 保存到本地存储
    try {
      const userInfo = {
        avatarUrl: avatarUrl,
        nickName: userName
      }
      wx.setStorageSync('userInfo', userInfo)
      wx.showToast({ title: '头像设置成功', icon: 'success' })
    } catch (e) {
      // 忽略错误
    }
  },

  // 昵称输入框变化
  onNicknameInput(e) {
    const nickName = e.detail.value
    this.setData({ userName: nickName })
  },

  // 提交用户信息
  onSubmitUserInfo() {
    const { userAvatar, userName } = this.data
    
    if (!userAvatar) {
      wx.showToast({ title: '请先选择头像', icon: 'none' })
      return
    }

    // 保存用户信息
    try {
      const userInfo = {
        avatarUrl: userAvatar,
        nickName: userName || '微信用户'
      }
      wx.setStorageSync('userInfo', userInfo)
      this.hideAuthSheet()
      wx.showToast({ title: '设置成功', icon: 'success' })
    } catch (e) {
      wx.showToast({ title: '保存失败', icon: 'none' })
    }
  },

  // 使用默认头像
  useDefaultAvatar() {
    this.hideAuthSheet()
    wx.showToast({ 
      title: '已使用默认头像', 
      icon: 'success',
      duration: 1500
    })
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
    if (key === 'mall') {
      wx.navigateTo({ url: '/pages/mall/mall' })
      return
    }
    if (key === 'leaderboard') {
      wx.navigateTo({ url: '/pages/leaderboard/leaderboard' })
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
    wx.navigateTo({ url: '/pages/leaderboard/leaderboard' })
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
