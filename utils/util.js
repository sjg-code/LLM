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

/* ========== 点评系统 ========== */

function saveReview(toiletId, rating, content, userName) {
  const key = 'reviews'
  let list = []
  try { list = JSON.parse(wx.getStorageSync(key) || '[]') } catch (e) {}
  list.unshift({
    id: 'r_' + Date.now(),
    toiletId,
    rating: Number(rating),
    content,
    userName: userName || '匿名用户',
    likes: 0,
    time: new Date().toISOString()
  })
  wx.setStorageSync(key, JSON.stringify(list))
  addPoints(5)
}

function getReviews(toiletId) {
  try {
    const list = JSON.parse(wx.getStorageSync('reviews') || '[]')
    if (toiletId) return list.filter(r => r.toiletId === toiletId)
    return list
  } catch (e) { return [] }
}

function getTopToilets() {
  const reviews = getReviews()
  const map = {}
  reviews.forEach(r => {
    if (!map[r.toiletId]) map[r.toiletId] = { toiletId: r.toiletId, totalRating: 0, count: 0 }
    map[r.toiletId].totalRating += r.rating
    map[r.toiletId].count += 1
  })
  return Object.values(map)
    .map(t => ({ ...t, avgRating: (t.totalRating / t.count).toFixed(1) }))
    .sort((a, b) => b.avgRating - a.avgRating)
    .slice(0, 10)
}

/* ========== SOS 急友互助 ========== */

function saveSosPost(content, lat, lng, userName) {
  const key = 'sos_posts'
  let list = []
  try { list = JSON.parse(wx.getStorageSync(key) || '[]') } catch (e) {}
  list.unshift({
    id: 'sos_' + Date.now(),
    content: content || '急！附近有厕所吗？',
    latitude: lat,
    longitude: lng,
    userName: userName || '急友',
    replies: [],
    resolved: false,
    time: new Date().toISOString(),
    expireAt: Date.now() + 30 * 60 * 1000
  })
  wx.setStorageSync(key, JSON.stringify(list))
  addPoints(3)
}

function getSosPosts(userLat, userLng) {
  try {
    const now = Date.now()
    const list = JSON.parse(wx.getStorageSync('sos_posts') || '[]')
      .filter(p => p.expireAt > now)
      .map(p => {
        const dist = calculateDistance(userLat, userLng, p.latitude, p.longitude)
        return { ...p, distance: dist, distanceText: formatDistance(dist) }
      })
      .sort((a, b) => a.distance - b.distance)
    return list
  } catch (e) { return [] }
}

function deleteSosPost(postId) {
  try {
    const key = 'sos_posts'
    let list = JSON.parse(wx.getStorageSync(key) || '[]')
    list = list.filter(p => p.id !== postId)
    wx.setStorageSync(key, JSON.stringify(list))
  } catch (e) {}
}

/* ========== 社区动态 ========== */

function savePost(content, photos, userName) {
  const key = 'community_posts'
  let list = []
  try { list = JSON.parse(wx.getStorageSync(key) || '[]') } catch (e) {}
  list.unshift({
    id: 'post_' + Date.now(),
    content,
    photos: photos || [],
    userName: userName || '厕友',
    likes: 0,
    liked: false,
    comments: [],
    time: new Date().toISOString()
  })
  wx.setStorageSync(key, JSON.stringify(list))
  addPoints(2)
}

function getPosts() {
  try { return JSON.parse(wx.getStorageSync('community_posts') || '[]') } catch (e) { return [] }
}

function likePost(postId) {
  try {
    const key = 'community_posts'
    let list = JSON.parse(wx.getStorageSync(key) || '[]')
    list = list.map(p => {
      if (p.id === postId) {
        const liked = !p.liked
        return { ...p, liked, likes: p.likes + (liked ? 1 : -1) }
      }
      return p
    })
    wx.setStorageSync(key, JSON.stringify(list))
  } catch (e) {}
}

/* ========== 积分系统 ========== */

function getPoints() {
  try { return Number(wx.getStorageSync('user_points') || 0) } catch (e) { return 0 }
}

function addPoints(amount) {
  const current = getPoints()
  wx.setStorageSync('user_points', String(current + amount))
}

function spendPoints(amount) {
  const current = getPoints()
  if (current < amount) return false
  wx.setStorageSync('user_points', String(current - amount))
  return true
}

/* ========== 成就系统 ========== */

const ALL_ACHIEVEMENTS = [
  { id: 'first_review', name: '初出茅庐', desc: '发布第一条点评', icon: '📝', condition: { type: 'review', count: 1 } },
  { id: 'review_10', name: '点评达人', desc: '累计发布10条点评', icon: '⭐', condition: { type: 'review', count: 10 } },
  { id: 'first_sos', name: '急先锋', desc: '首次发布急友求助', icon: '🆘', condition: { type: 'sos', count: 1 } },
  { id: 'sos_helper', name: '活雷锋', desc: '帮助5位急友', icon: '🤝', condition: { type: 'sos_help', count: 5 } },
  { id: 'first_post', name: '社区新人', desc: '发布第一条社区动态', icon: '💬', condition: { type: 'post', count: 1 } },
  { id: 'post_20', name: '社交达人', desc: '累计发布20条动态', icon: '🎉', condition: { type: 'post', count: 20 } },
  { id: 'upload_5', name: '探索先锋', desc: '上报5个新厕所', icon: '🗺', condition: { type: 'upload', count: 5 } },
  { id: 'points_100', name: '积分富翁', desc: '累计获得100积分', icon: '💰', condition: { type: 'points', count: 100 } },
  { id: 'checkin_7', name: '如厕打卡王', desc: '连续打卡7天', icon: '🔥', condition: { type: 'checkin', count: 7 } },
  { id: 'liked_50', name: '人气之星', desc: '动态累计获50个赞', icon: '❤', condition: { type: 'likes', count: 50 } }
]

function getAchievements() {
  try {
    const unlocked = JSON.parse(wx.getStorageSync('unlocked_achievements') || '[]')
    return ALL_ACHIEVEMENTS.map(a => ({ ...a, unlocked: unlocked.includes(a.id) }))
  } catch (e) {
    return ALL_ACHIEVEMENTS.map(a => ({ ...a, unlocked: false }))
  }
}

function unlockAchievement(achievementId) {
  const key = 'unlocked_achievements'
  let list = []
  try { list = JSON.parse(wx.getStorageSync(key) || '[]') } catch (e) {}
  if (!list.includes(achievementId)) {
    list.push(achievementId)
    wx.setStorageSync(key, JSON.stringify(list))
    addPoints(10)
    return true
  }
  return false
}

/* ========== 好友排行榜 ========== */

function getLeaderboard() {
  // 模拟好友数据 + 当前用户
  const myPoints = getPoints()
  const mockFriends = [
    { name: '厕所猎人', points: 156, avatar: '🧑' },
    { name: '找路小王', points: 132, avatar: '👩' },
    { name: '内急先锋', points: 98, avatar: '🧔' },
    { name: '公厕达人', points: 87, avatar: '👨' },
    { name: '寻厕少女', points: 73, avatar: '👧' },
    { name: '拉了么新手', points: 45, avatar: '🧒' },
    { name: '迷路宝宝', points: 31, avatar: '👶' },
    { name: '急友一号', points: 22, avatar: '🤷' }
  ]
  const me = { name: '我', points: myPoints, avatar: '😎', isMe: true }
  return [me, ...mockFriends].sort((a, b) => b.points - a.points)
}

/* ========== 商城系统 ========== */

/**
 * 获取商城商品列表（模拟数据）
 * @returns {Array} 商品列表
 */
function getMallItems() {
  return [
    { id: 'item_1', name: '纸巾补给券', desc: '下次如厕免费领取纸巾一包', icon: '🧻', price: 20, category: 'coupon', stock: 50, exchanged: 12 },
    { id: 'item_2', name: '洗手液体验券', desc: '指定公厕免费使用高级洗手液', icon: '🧴', price: 30, category: 'coupon', stock: 30, exchanged: 8 },
    { id: 'item_3', name: '黄金如厕框', desc: '限量金色头像框，彰显尊贵身份', icon: '🖼', price: 100, category: 'avatar', stock: 10, exchanged: 3 },
    { id: 'item_4', name: '彩虹光环', desc: '七彩光环头像框，闪瞎双眼', icon: '🌈', price: 80, category: 'avatar', stock: 20, exchanged: 5 },
    { id: 'item_5', name: '急速冲刺卡', desc: 'SOS求助置顶30分钟，优先获得响应', icon: '⚡', price: 15, category: 'virtual', stock: 99, exchanged: 22 },
    { id: 'item_6', name: '隐形斗篷', desc: '匿名发布社区动态，隐匿身份', icon: '🥷', price: 25, category: 'virtual', stock: 99, exchanged: 10 },
    { id: 'item_7', name: '厕神降临称号', desc: '限量专属称号，全站展示', icon: '👑', price: 200, category: 'limit', stock: 5, exchanged: 1 },
    { id: 'item_8', name: '寻厕先驱称号', desc: '限量称号，致敬最早一批探索者', icon: '🏅', price: 150, category: 'limit', stock: 8, exchanged: 2 }
  ]
}

/**
 * 兑换商品
 * @param {string} itemId 商品ID
 * @returns {{ success: boolean, message: string }}
 */
function exchangeItem(itemId) {
  const items = getMallItems()
  const item = items.find(i => i.id === itemId)
  if (!item) {
    return { success: false, message: '商品不存在' }
  }
  if (item.stock <= item.exchanged) {
    return { success: false, message: '库存不足，已兑换完毕' }
  }
  const currentPoints = getPoints()
  if (currentPoints < item.price) {
    return { success: false, message: '积分不足，还需要' + (item.price - currentPoints) + '积分' }
  }
  // 扣减积分
  const spent = spendPoints(item.price)
  if (!spent) {
    return { success: false, message: '积分扣减失败' }
  }
  // 记录兑换历史
  const key = 'exchange_history'
  let history = []
  try { history = JSON.parse(wx.getStorageSync(key) || '[]') } catch (e) {}
  const record = {
    id: 'ex_' + Date.now(),
    itemId: item.id,
    itemName: item.name,
    itemIcon: item.icon,
    price: item.price,
    time: new Date().toISOString()
  }
  history.unshift(record)
  wx.setStorageSync(key, JSON.stringify(history))
  return { success: true, message: '兑换成功！' + item.icon + ' ' + item.name }
}

/**
 * 获取兑换记录列表
 * @returns {Array} 兑换记录数组，每项包含 { id, itemId, itemName, itemIcon, price, time }
 */
function getExchangeHistory() {
  try {
    return JSON.parse(wx.getStorageSync('exchange_history') || '[]')
  } catch (e) {
    return []
  }
}

module.exports = {
  calculateDistance,
  calculateDirection,
  formatDistance,
  generateMockToilets,
  saveUserToilet,
  getUserToilets,
  getApprovedUserToilets,
  // 点评
  saveReview,
  getReviews,
  getTopToilets,
  // SOS 急友
  saveSosPost,
  getSosPosts,
  deleteSosPost,
  // 社区
  savePost,
  getPosts,
  likePost,
  // 积分 & 成就
  getPoints,
  addPoints,
  spendPoints,
  getAchievements,
  unlockAchievement,
  // 好友排行榜
  getLeaderboard,
  // 商城
  getMallItems,
  exchangeItem,
  getExchangeHistory
}
