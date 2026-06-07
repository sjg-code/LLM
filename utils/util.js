// utils/util.js - 工具函数

/**
 * Haversine 公式计算两点之间的距离（米）
 * @param {number} lat1 纬度1
 * @param {number} lng1 经度1
 * @param {number} lat2 纬度2
 * @param {number} lng2 经度2
 * @returns {number} 距离（米）
 */
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000 // 地球半径（米）
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}

/**
 * 角度转弧度
 */
function toRad(deg) {
  return deg * (Math.PI / 180)
}

/**
 * 计算从点A到点B的方向
 * @param {number} lat1 起点纬度
 * @param {number} lng1 起点经度
 * @param {number} lat2 终点纬度
 * @param {number} lng2 终点经度
 * @returns {string} 方向文字（如"东北"）
 */
function calculateDirection(lat1, lng1, lat2, lng2) {
  const dLat = lat2 - lat1
  const dLng = lng2 - lng1
  const directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']
  
  // 计算角度
  let angle = Math.atan2(dLng, dLat) * (180 / Math.PI)
  if (angle < 0) angle += 360
  
  // 将角度映射到8个方向
  const index = Math.round(angle / 45) % 8
  return directions[index]
}

/**
 * 格式化距离显示
 * @param {number} distance 距离（米）
 * @returns {string} 格式化后的距离字符串
 */
function formatDistance(distance) {
  if (distance < 1000) {
    return distance + '米'
  }
  return (distance / 1000).toFixed(1) + '公里'
}

/**
 * 生成模拟厕所数据
 * @param {number} userLat 用户纬度
 * @param {number} userLng 用户经度
 * @returns {Array} 厕所列表
 */
function generateMockToilets(userLat, userLng) {
  // 模拟厕所数据（基于深圳龙华区域的随机偏移）
  const mockToilets = [
    {
      id: 1,
      name: '东环二路公厕',
      address: '东环二路8号',
      latOffset: 0.0012,
      lngOffset: 0.0008,
      openTime: '06:00-22:00',
      hasAccessible: true,
      hasPaper: true,
      hasSoap: false,
      rating: 4.2,
      tags: ['无障碍', '免费']
    },
    {
      id: 2,
      name: '龙华文体中心公厕',
      address: '龙华文体中心1楼',
      latOffset: -0.0005,
      lngOffset: 0.0015,
      openTime: '08:00-22:00',
      hasAccessible: true,
      hasPaper: true,
      hasSoap: true,
      rating: 4.5,
      tags: ['无障碍', '有纸巾', '有洗手液']
    },
    {
      id: 3,
      name: '世纪华庭公厕',
      address: '世纪华庭小区旁',
      latOffset: 0.0020,
      lngOffset: -0.0010,
      openTime: '全天开放',
      hasAccessible: false,
      hasPaper: true,
      hasSoap: false,
      rating: 3.8,
      tags: ['24小时', '免费']
    },
    {
      id: 4,
      name: '新华中学公厕',
      address: '新华中学正门左侧',
      latOffset: -0.0018,
      lngOffset: -0.0005,
      openTime: '06:30-21:30',
      hasAccessible: true,
      hasPaper: false,
      hasSoap: false,
      rating: 3.5,
      tags: ['无障碍', '免费']
    },
    {
      id: 5,
      name: '龙华公园公厕',
      address: '龙华公园南门入口',
      latOffset: 0.0008,
      lngOffset: -0.0020,
      openTime: '06:00-23:00',
      hasAccessible: true,
      hasPaper: true,
      hasSoap: true,
      rating: 4.7,
      tags: ['无障碍', '有纸巾', '有洗手液', '干净']
    },
    {
      id: 6,
      name: '人民路公厕',
      address: '人民路与建设路交汇处',
      latOffset: -0.0025,
      lngOffset: 0.0003,
      openTime: '全天开放',
      hasAccessible: false,
      hasPaper: true,
      hasSoap: false,
      rating: 3.2,
      tags: ['24小时', '免费']
    },
    {
      id: 7,
      name: '龙华地铁站公厕',
      address: '龙华地铁站B出口',
      latOffset: 0.0003,
      lngOffset: 0.0025,
      openTime: '06:00-23:30',
      hasAccessible: true,
      hasPaper: true,
      hasSoap: true,
      rating: 4.0,
      tags: ['无障碍', '有纸巾', '交通便利']
    },
    {
      id: 8,
      name: '清湖路公厕',
      address: '清湖路156号',
      latOffset: -0.0010,
      lngOffset: -0.0018,
      openTime: '07:00-21:00',
      hasAccessible: false,
      hasPaper: false,
      hasSoap: false,
      rating: 3.0,
      tags: ['免费']
    },
    {
      id: 9,
      name: '油松路公厕',
      address: '油松路与工业路交汇处',
      latOffset: 0.0030,
      lngOffset: 0.0012,
      openTime: '全天开放',
      hasAccessible: true,
      hasPaper: true,
      hasSoap: false,
      rating: 3.6,
      tags: ['24小时', '无障碍']
    },
    {
      id: 10,
      name: '民治大道公厕',
      address: '民治大道与民康路交汇处',
      latOffset: -0.0015,
      lngOffset: 0.0030,
      openTime: '06:00-22:00',
      hasAccessible: true,
      hasPaper: true,
      hasSoap: true,
      rating: 4.3,
      tags: ['无障碍', '有纸巾', '有洗手液']
    },
    {
      id: 11,
      name: '大浪街道公厕',
      address: '大浪街道办旁',
      latOffset: 0.0025,
      lngOffset: -0.0025,
      openTime: '07:00-22:00',
      hasAccessible: false,
      hasPaper: true,
      hasSoap: false,
      rating: 3.4,
      tags: ['免费']
    },
    {
      id: 12,
      name: '观澜湖公厕',
      address: '观澜湖新城内',
      latOffset: -0.0030,
      lngOffset: 0.0018,
      openTime: '08:00-22:00',
      hasAccessible: true,
      hasPaper: true,
      hasSoap: true,
      rating: 4.8,
      tags: ['无障碍', '有纸巾', '有洗手液', '干净', '环境好']
    }
  ]

  // 计算实际坐标、距离和方向
  return mockToilets.map(toilet => {
    const lat = userLat + toilet.latOffset
    const lng = userLng + toilet.lngOffset
    const distance = calculateDistance(userLat, userLng, lat, lng)
    const direction = calculateDirection(userLat, userLng, lat, lng)

    return {
      ...toilet,
      latitude: lat,
      longitude: lng,
      distance: distance,
      direction: direction,
      distanceText: formatDistance(distance)
    }
  })
  // 按距离排序
  .sort((a, b) => a.distance - b.distance)
  // 只取前10个
  .slice(0, 10)
}

/**
 * 保存用户上报的厕所到本地存储
 * @param {Object} toiletData 厕所数据
 */
function saveUserToilet(toiletData) {
  const key = 'user_toilets'
  let toilets = []
  try {
    const stored = wx.getStorageSync(key)
    if (stored) {
      toilets = JSON.parse(stored)
    }
  } catch (e) {
    toilets = []
  }
  toilets.unshift(toiletData)
  wx.setStorageSync(key, JSON.stringify(toilets))
}

/**
 * 获取用户上报的所有厕所
 * @returns {Array} 用户上报的厕所列表
 */
function getUserToilets() {
  try {
    const stored = wx.getStorageSync('user_toilets')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    // ignore
  }
  return []
}

/**
 * 获取已通过审核的用户上报厕所（模拟全部通过）
 * @param {number} userLat 用户纬度
 * @param {number} userLng 用户经度
 * @returns {Array} 带距离信息的厕所列表
 */
function getApprovedUserToilets(userLat, userLng) {
  const toilets = getUserToilets().filter(t => t.status === 'approved' || t.status === 'pending')
  return toilets.map(toilet => {
    const distance = calculateDistance(userLat, userLng, toilet.latitude, toilet.longitude)
    const direction = calculateDirection(userLat, userLng, toilet.latitude, toilet.longitude)
    return {
      ...toilet,
      distance: distance,
      direction: direction,
      distanceText: formatDistance(distance),
      rating: null
    }
  })
}

module.exports = {
  calculateDistance,
  calculateDirection,
  formatDistance,
  generateMockToilets,
  saveUserToilet,
  getUserToilets,
  getApprovedUserToilets
}
