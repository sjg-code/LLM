// app.js
App({
  onLaunch() {
    // 获取用户位置
    this.getLocation()
  },

  globalData: {
    latitude: null,
    longitude: null,
    locationReady: false
  },

  // 获取用户位置
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          this.globalData.latitude = res.latitude
          this.globalData.longitude = res.longitude
          this.globalData.locationReady = true
          resolve(res)
        },
        fail: (err) => {
          console.error('获取位置失败:', err)
          // 如果获取失败，使用默认位置（深圳龙华）
          this.globalData.latitude = 22.6570
          this.globalData.longitude = 114.0435
          this.globalData.locationReady = true
          reject(err)
        }
      })
    })
  },

  // 检查定位权限
  checkLocationAuth() {
    return new Promise((resolve) => {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userLocation'] === false) {
            // 用户拒绝过，引导打开设置
            wx.showModal({
              title: '需要定位权限',
              content: '请在设置中开启位置权限，以便为您推荐附近的厕所',
              confirmText: '去设置',
              success: (modalRes) => {
                if (modalRes.confirm) {
                  wx.openSetting({
                    success: (settingRes) => {
                      resolve(settingRes.authSetting['scope.userLocation'])
                    },
                    fail: () => resolve(false)
                  })
                } else {
                  resolve(false)
                }
              }
            })
          } else {
            resolve(true)
          }
        }
      })
    })
  }
})
