const app = getApp()
const { friendlyResult } = require("../../utils/presentation")
const { getTripPlans } = require("../../utils/tripStore")

function todayText() {
  const date = new Date()
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}-${month}-${day}`
}

function decoratePlan(plan) {
  const isPast = plan.tripDate && plan.tripDate < todayText()
  const needsFeedback = isPast && plan.feedbackStatus !== "done"
  const result = friendlyResult(plan.result || {})

  return {
    ...plan,
    destinationName: (plan.destination || {}).name || "未命名目的地",
    area: (plan.destination || {}).area || "",
    level: result.displayLevel || "",
    tone: result.tone || "ok",
    feedbackLabel: plan.feedbackStatus === "done" ? "已反馈" : needsFeedback ? "待反馈" : "出行后可反馈",
    needsFeedback
  }
}

Page({
  data: {
    fontLevel: "normal",
    plans: []
  },
  onShow() {
    this.setData({
      fontLevel: app.globalData.fontLevel || wx.getStorageSync("fontLevel") || "normal",
      plans: getTripPlans().map(decoratePlan)
    })
  },
  openCard(event) {
    wx.navigateTo({
      url: `/pages/card/card?tripId=${event.currentTarget.dataset.id}`
    })
  },
  openFeedback(event) {
    wx.navigateTo({
      url: `/pages/feedback/feedback?tripId=${event.currentTarget.dataset.id}`
    })
  },
  startNew() {
    wx.navigateTo({
      url: "/pages/profile/profile"
    })
  }
})
