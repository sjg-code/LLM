// pages/review/review.js
const util = require('../../utils/util.js')

// 根据评分生成星星文字
function makeStars(rating, max) {
  var r = Math.round(Number(rating) || 0)
  if (r > max) r = max
  if (r < 0) r = 0
  return '\u2605'.repeat(r)
}

Page({
  data: {
    activeTab: 'rank',
    totalReviews: 0,
    totalToilets: 0,
    avgRating: '0.0',
    rankList: [],
    latestReviews: [],
    myReviews: []
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const allReviews = util.getReviews()
    const rankData = util.getTopToilets()

    // 给排名数据补充厕所名称
    const mockToilets = util.generateMockToilets(22.657, 114.0435)
    const nameMap = {}
    mockToilets.forEach(t => { nameMap[t.id] = t.name })

    const rankList = rankData.map(r => ({
      ...r,
      toiletName: nameMap[r.toiletId] || ('厕所 #' + r.toiletId),
      starsText: makeStars(r.avgRating, 5)
    }))

    // 计算统计
    const totalReviews = allReviews.length
    const toiletIds = [...new Set(allReviews.map(r => r.toiletId))]
    const totalToilets = toiletIds.length
    const avgRating = totalReviews > 0
      ? (allReviews.reduce((s, r) => s + r.rating, 0) / totalReviews).toFixed(1)
      : '0.0'

    // 格式化时间
    const formatTime = (iso) => {
      const d = new Date(iso)
      const now = new Date()
      const diff = now - d
      if (diff < 60000) return '刚刚'
      if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
      if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
      return `${d.getMonth() + 1}/${d.getDate()}`
    }

    const latestReviews = allReviews.slice(0, 20).map(r => ({
      ...r,
      timeText: formatTime(r.time),
      toiletName: nameMap[r.toiletId] || ('厕所 #' + r.toiletId),
      starsText: makeStars(r.rating, 5)
    }))

    const myReviews = allReviews.filter(r => r.isMine).slice(0, 20).map(r => ({
      ...r,
      timeText: formatTime(r.time),
      toiletName: nameMap[r.toiletId] || ('厕所 #' + r.toiletId),
      starsText: makeStars(r.rating, 5)
    }))

    this.setData({
      totalReviews,
      totalToilets,
      avgRating,
      rankList,
      latestReviews,
      myReviews
    })
  },

  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  goRankDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.switchTab({ url: '/pages/index/index' })
  }
})
