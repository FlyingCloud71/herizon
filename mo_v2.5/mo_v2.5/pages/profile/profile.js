const app = getApp()

Page({
  data: {
    fontLevel: "normal",
    maxWalkMinutes: 25,
    profile: {
      avoidSteps: true,
      needFrequentRestroom: true,
      needFrequentRest: true,
      heatSensitive: false,
      avoidCrowd: true,
      needWheelchair: false,
      needNursingRoom: false
    },
    options: [
      { key: "avoidSteps", title: "尽量少台阶、少爬坡" },
      { key: "needFrequentRestroom", title: "厕所不要太远" },
      { key: "needFrequentRest", title: "累了能坐下" },
      { key: "heatSensitive", title: "不要晒太久" },
      { key: "avoidCrowd", title: "避开排队和人挤人" },
      { key: "needWheelchair", title: "轮椅 / 助行器更好走" },
      { key: "needNursingRoom", title: "育婴室或亲子卫生间更明确" }
    ]
  },
  onShow() {
    this.setData({
      fontLevel: app.globalData.fontLevel || wx.getStorageSync("fontLevel") || "normal"
    })
  },
  onWalkChange(event) {
    this.setData({
      maxWalkMinutes: event.detail.value
    })
  },
  toggle(event) {
    const key = event.currentTarget.dataset.key
    this.setData({
      [`profile.${key}`]: !this.data.profile[key]
    })
  },
  next() {
    app.globalData.profile = {
      ...this.data.profile,
      maxWalkMinutes: this.data.maxWalkMinutes
    }
    wx.navigateTo({
      url: "/pages/destinations/destinations"
    })
  }
})
