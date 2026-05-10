App({
  onLaunch() {
    this.globalData.fontLevel = wx.getStorageSync("fontLevel") || "normal"
  },
  setFontLevel(fontLevel) {
    this.globalData.fontLevel = fontLevel
    wx.setStorageSync("fontLevel", fontLevel)
  },
  globalData: {
    profile: null,
    destination: null,
    result: null,
    fontLevel: "normal"
  }
})
