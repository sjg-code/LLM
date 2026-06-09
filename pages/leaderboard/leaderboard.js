// pages/leaderboard/leaderboard.js
const util = require('../../utils/util.js')

Page({
  data: {
    myPoints: 0,
    myRank: 1,
    board: [],
    achievements: []
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const myPoints = util.getPoints()
    const board = util.getLeaderboard()
    const maxPoints = Math.max(...board.map(b => b.points), 1)

    // 计算进度条宽度 + 我的排名
    let myRank = 1
    const formatted = board.map((b, i) => {
      if (b.isMe) myRank = i + 1
      return { ...b, barWidth: Math.max((b.points / maxPoints) * 100, 2) }
    })

    this.setData({
      myPoints,
      myRank,
      board: formatted,
      achievements: util.getAchievements()
    })
  }
})
