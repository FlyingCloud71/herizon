const app = getApp()
const { destinations } = require("../../data/destinations")
const { scoreDestination } = require("../../utils/evaluator")

const defaultProfile = {
  maxWalkMinutes: 25,
  avoidSteps: true,
  needFrequentRestroom: true,
  needFrequentRest: true,
  heatSensitive: false,
  avoidCrowd: true,
  needWheelchair: false,
  needNursingRoom: false
}

Page({
  data: {
    fontLevel: "normal",
    query: "",
    isReady: false,
    scoredDestinations: [],
    filteredDestinations: []
  },
  onShow() {
    const scoredDestinations = this.buildScoredDestinations()
    this.setData({
      isReady: true,
      fontLevel: app.globalData.fontLevel || wx.getStorageSync("fontLevel") || "normal",
      scoredDestinations,
      filteredDestinations: this.filterDestinations(this.data.query, scoredDestinations)
    })
  },
  onLoad() {
    if (!app.globalData.profile) {
      app.globalData.profile = defaultProfile
    }
    const scoredDestinations = this.buildScoredDestinations()
    this.setData({
      isReady: true,
      scoredDestinations,
      filteredDestinations: this.filterDestinations(this.data.query, scoredDestinations)
    })
  },
  buildScoredDestinations() {
    const profile = app.globalData.profile || defaultProfile
    return destinations.map((destination) => {
      const result = scoreDestination(profile, destination)
      return {
        ...destination,
        previewScore: result.score,
        previewLevel: result.level,
        previewTone: result.tone,
        restroomRateText: this.formatRestroomRate(destination)
      }
    })
  },
  formatRestroomRate(destination) {
    const durationHours = Math.max((destination.walkMinutes || 0) / 60, 0.5)
    const rate = (destination.restroom || 0) / durationHours
    if (rate >= 10) {
      return String(Math.round(rate))
    }
    return rate.toFixed(1).replace(".0", "")
  },
  filterDestinations(query, list) {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return list
    }

    return list.filter((item) => {
      return [item.name, item.area, item.cover]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    })
  },
  onSearchInput(event) {
    const query = event.detail.value.trim()

    this.setData({
      query,
      filteredDestinations: this.filterDestinations(query, this.data.scoredDestinations)
    })
  },
  selectDestination(event) {
    const destination = destinations.find((item) => item.id === event.currentTarget.dataset.id)
    const result = scoreDestination(app.globalData.profile, destination)
    app.globalData.destination = destination
    app.globalData.result = result
    wx.navigateTo({
      url: "/pages/result/result"
    })
  }
})
