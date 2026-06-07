// pages/upload/upload.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    // 表单数据
    form: {
      name: '',
      address: '',
      openTime: '',
      remark: '',
      facilities: {
        accessible: false,
        paper: false,
        soap: false,
        free: false,
        clean: false,
        babyCare: false
      }
    },
    // 位置
    latitude: 22.6570,
    longitude: 114.0435,
    locationMethod: 'auto',
    locationReady: false,
    mapSelected: false,
    mapMarkers: [],
    // 图片
    photos: [],
    // 时间选择
    timeOptions: [],
    openTimeIndex: -1,
    closeTimeIndex: -1,
    isAllDay: false,
    // 设施选项
    facilityOptions: [
      { key: 'accessible', label: '无障碍设施', icon: '♿' },
      { key: 'paper', label: '有纸巾', icon: '🧻' },
      { key: 'soap', label: '有洗手液', icon: '🧴' },
      { key: 'free', label: '免费', icon: '💰' },
      { key: 'clean', label: '干净卫生', icon: '✨' },
      { key: 'babyCare', label: '母婴设施', icon: '👶' }
    ],
    // 提交状态
    canSubmit: false,
    submitting: false
  },

  onLoad() {
    this.generateTimeOptions()
    this.getCurrentLocation()
  },

  // 生成时间选项 (00:00 - 23:30)
  generateTimeOptions() {
    const options = []
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        options.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
      }
    }
    this.setData({ timeOptions: options })
  },

  // 获取当前位置
  getCurrentLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          locationReady: true
        })
        this.checkCanSubmit()
      },
      fail: () => {
        // 使用默认位置
        this.setData({
          latitude: app.globalData.latitude || 22.6570,
          longitude: app.globalData.longitude || 114.0435,
          locationReady: true
        })
        this.checkCanSubmit()
      }
    })
  },

  // 重新定位
  retryLocation() {
    this.setData({ locationReady: false })
    this.getCurrentLocation()
  },

  // 切换定位方式
  setLocationMethod(e) {
    const method = e.currentTarget.dataset.method
    this.setData({ locationMethod: method })
    if (method === 'map' && !this.data.mapSelected) {
      this.setData({ mapSelected: false })
    }
    this.checkCanSubmit()
  },

  // 地图点击选点
  onMapTap(e) {
    // 使用 chooseLocation 让用户在地图上选点
    wx.chooseLocation({
      success: (res) => {
        if (res.name || res.latitude) {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            mapSelected: true,
            mapMarkers: [{
              id: 1,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 36,
              height: 36,
              iconPath: '/images/toilet-marker.png',
              callout: {
                content: res.name || '选择的位置',
                display: 'ALWAYS',
                bgColor: '#07C160',
                color: '#fff',
                fontSize: 13,
                borderRadius: 12,
                padding: 10
              }
            }]
          })
          // 如果选了地址名，自动填入地址字段
          if (res.name && !this.data.form.address) {
            this.setData({ 'form.address': res.name })
          }
          this.checkCanSubmit()
        }
      },
      fail: () => {
        // 用户取消选点，不处理
      }
    })
  },

  // 清除地图选点
  clearMapPoint() {
    this.setData({
      mapSelected: false,
      mapMarkers: []
    })
    this.checkCanSubmit()
  },

  // 名称输入
  onNameInput(e) {
    this.setData({ 'form.name': e.detail.value })
    this.checkCanSubmit()
  },

  // 地址输入
  onAddressInput(e) {
    this.setData({ 'form.address': e.detail.value })
  },

  // 备注输入
  onRemarkInput(e) {
    this.setData({ 'form.remark': e.detail.value })
  },

  // 开放时间选择
  onOpenTimeChange(e) {
    this.setData({ openTimeIndex: Number(e.detail.value) })
    this.updateOpenTime()
  },

  onCloseTimeChange(e) {
    this.setData({ closeTimeIndex: Number(e.detail.value) })
    this.updateOpenTime()
  },

  updateOpenTime() {
    const { timeOptions, openTimeIndex, closeTimeIndex, isAllDay } = this.data
    if (isAllDay) {
      this.setData({ 'form.openTime': '全天开放' })
    } else if (openTimeIndex >= 0 && closeTimeIndex >= 0) {
      this.setData({
        'form.openTime': `${timeOptions[openTimeIndex]} - ${timeOptions[closeTimeIndex]}`
      })
    }
  },

  // 切换全天
  toggleAllDay() {
    const isAllDay = !this.data.isAllDay
    this.setData({
      isAllDay,
      'form.openTime': isAllDay ? '全天开放' : '',
      openTimeIndex: -1,
      closeTimeIndex: -1
    })
  },

  // 切换设施标签
  toggleFacility(e) {
    const key = e.currentTarget.dataset.key
    const current = this.data.form.facilities[key]
    this.setData({ [`form.facilities.${key}`]: !current })
  },

  // 选择照片
  choosePhoto() {
    const remain = 5 - this.data.photos.length
    if (remain <= 0) {
      wx.showToast({ title: '最多上传5张照片', icon: 'none' })
      return
    }

    wx.chooseMedia({
      count: remain,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: (res) => {
        const newPhotos = res.tempFiles.map(f => f.tempFilePath)
        this.setData({
          photos: [...this.data.photos, ...newPhotos]
        })
      }
    })
  },

  // 删除照片
  deletePhoto(e) {
    const index = e.currentTarget.dataset.index
    const photos = [...this.data.photos]
    photos.splice(index, 1)
    this.setData({ photos })
  },

  // 检查是否可以提交
  checkCanSubmit() {
    const { form, locationMethod, locationReady, mapSelected } = this.data
    const hasName = form.name.trim().length > 0
    const hasLocation = locationMethod === 'auto' ? locationReady : mapSelected

    this.setData({ canSubmit: hasName && hasLocation })
  },

  // 提交表单
  submitForm() {
    if (!this.data.canSubmit || this.data.submitting) return

    const { form, latitude, longitude, photos, locationMethod, locationReady, mapSelected } = this.data

    // 验证
    if (!form.name.trim()) {
      wx.showToast({ title: '请填写厕所名称', icon: 'none' })
      return
    }

    if (locationMethod === 'auto' && !locationReady) {
      wx.showToast({ title: '请等待定位完成', icon: 'none' })
      return
    }

    if (locationMethod === 'map' && !mapSelected) {
      wx.showToast({ title: '请在地图上选择位置', icon: 'none' })
      return
    }

    this.setData({ submitting: true })

    // 构建设施标签
    const tags = []
    const facilityMap = {
      accessible: '无障碍',
      paper: '有纸巾',
      soap: '有洗手液',
      free: '免费',
      clean: '干净卫生',
      babyCare: '母婴设施'
    }
    Object.keys(form.facilities).forEach(key => {
      if (form.facilities[key]) {
        tags.push(facilityMap[key])
      }
    })

    // 构建数据
    const toiletData = {
      id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      name: form.name.trim(),
      address: form.address.trim() || '暂无详细地址',
      latitude: latitude,
      longitude: longitude,
      openTime: form.openTime || '暂无信息',
      tags: tags,
      photos: photos,
      remark: form.remark.trim(),
      facilities: {
        hasAccessible: form.facilities.accessible,
        hasPaper: form.facilities.paper,
        hasSoap: form.facilities.soap
      },
      uploadTime: new Date().toISOString(),
      status: 'pending', // pending / approved / rejected
      source: 'user_report'
    }

    // 模拟提交（保存到本地存储）
    setTimeout(() => {
      try {
        util.saveUserToilet(toiletData)

        this.setData({ submitting: false })

        wx.showModal({
          title: '提交成功！',
          content: `感谢您上报「${form.name}」，我们将尽快审核后展示在地图上。`,
          confirmText: '查看厕所',
          cancelText: '继续上报',
          success: (res) => {
            if (res.confirm) {
              wx.switchTab({ url: '/pages/index/index' })
            } else {
              this.resetForm()
            }
          }
        })
      } catch (err) {
        this.setData({ submitting: false })
        wx.showToast({ title: '提交失败，请重试', icon: 'none' })
        console.error('提交失败:', err)
      }
    }, 1000)
  },

  // 重置表单
  resetForm() {
    this.setData({
      form: {
        name: '',
        address: '',
        openTime: '',
        remark: '',
        facilities: {
          accessible: false,
          paper: false,
          soap: false,
          free: false,
          clean: false,
          babyCare: false
        }
      },
      photos: [],
      openTimeIndex: -1,
      closeTimeIndex: -1,
      isAllDay: false,
      mapSelected: false,
      mapMarkers: [],
      canSubmit: false,
      submitting: false
    })
    this.getCurrentLocation()
  }
})
