const app = getApp()

Page({
  data: {
    fontLevel: "normal",
    fontOptions: [
      { level: "normal", label: "标准" },
      { level: "large", label: "大字" },
      { level: "xlarge", label: "超大" }
    ],
    gallery: [
      {
        name: "颐和园 · 昆明湖",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Summer_Palace_Kunming_Lake.jpg?width=900"
      },
      {
        name: "故宫 · 红墙",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Beijing_China_Forbidden-City-08.jpg?width=900"
      },
      {
        name: "北海 · 九龙壁",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Wall_of_Nine_Dragons.jpg?width=900"
      }
    ]
  },
  onShow() {
    this.setData({
      fontLevel: app.globalData.fontLevel || wx.getStorageSync("fontLevel") || "normal"
    })
  },
  selectFontLevel(event) {
    const fontLevel = event.currentTarget.dataset.level
    app.setFontLevel(fontLevel)
    this.setData({
      fontLevel
    })
  },
  start() {
    wx.navigateTo({
      url: "/pages/profile/profile"
    })
  },
  goMine() {
    wx.navigateTo({
      url: "/pages/mine/mine"
    })
  }
})
