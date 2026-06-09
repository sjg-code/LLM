// pages/mall/mall.js
const util = require('../../utils/util.js')

Page({
  data: {
    myPoints: 0,
    activeTab: 'shop', // 'shop' | 'history'
    activeCategory: 'all',
    categories: [
      { key: 'all', name: '全部' },
      { key: 'coupon', name: '优惠券' },
      { key: 'avatar', name: '头像框' },
      { key: 'virtual', name: '虚拟道具' },
      { key: 'limit', name: '限量称号' }
    ],
    items: [],
    filteredItems: [],
    history: [],
    showConfirm: false,
    confirmItem: null
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const myPoints = util.getPoints()
    const items = util.getMallItems()
    const history = util.getExchangeHistory()
    
    // 格式化兑换时间
    const formatTime = (iso) => {
      const d = new Date(iso)
      return `${d.getMonth()+1}月${d.getDate()}日 ${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`
    }
    
    this.setData({
      myPoints,
      items,
      filteredItems: items,
      history: history.map(h => ({ ...h, timeText: formatTime(h.time) }))
    })
  },

  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  filterCategory(e) {
    const cat = e.currentTarget.dataset.cat
    const items = this.data.items
    this.setData({
      activeCategory: cat,
      filteredItems: cat === 'all' ? items : items.filter(i => i.category === cat)
    })
  },

  showExchange(e) {
    const id = e.currentTarget.dataset.id
    const item = this.data.items.find(i => i.id === id)
    if (!item) return
    this.setData({ showConfirm: true, confirmItem: item })
  },

  cancelExchange() {
    this.setData({ showConfirm: false, confirmItem: null })
  },

  confirmExchange() {
    const item = this.data.confirmItem
    if (!item) return
    const result = util.exchangeItem(item.id)
    this.setData({ showConfirm: false, confirmItem: null })
    if (result.success) {
      wx.showToast({ title: '兑换成功！', icon: 'success' })
    } else {
      wx.showToast({ title: result.message, icon: 'none' })
    }
    this.loadData()
  }
})
