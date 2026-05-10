const app = getApp()
const { getTripPlan, saveTripFeedback } = require("../../utils/tripStore")

const options = {
  walkFeeling: [
    { value: "easy", label: "比预想轻松" },
    { value: "same", label: "差不多" },
    { value: "tired", label: "比预想累" }
  ],
  restroom: [
    { value: "easy", label: "好找" },
    { value: "ok", label: "一般" },
    { value: "hard", label: "不好找" }
  ],
  seating: [
    { value: "often", label: "经常能坐" },
    { value: "some", label: "偶尔能坐" },
    { value: "rare", label: "很难坐" }
  ],
  crowd: [
    { value: "ok", label: "可以接受" },
    { value: "busy", label: "有点拥挤" },
    { value: "tooMuch", label: "太挤了" }
  ]
}

Page({
  data: {
    fontLevel: "normal",
    tripId: "",
    trip: null,
    options,
    feedback: {
      walkFeeling: "same",
      restroom: "ok",
      seating: "some",
      crowd: "ok",
      note: ""
    },
    saved: false
  },
  onLoad(query) {
    const tripId = (query && query.tripId) || ""
    const trip = getTripPlan(tripId)

    this.setData({
      fontLevel: app.globalData.fontLevel || wx.getStorageSync("fontLevel") || "normal",
      tripId,
      trip,
      feedback: (trip && trip.feedback) || this.data.feedback,
      saved: Boolean(trip && trip.feedbackStatus === "done")
    })
  },
  chooseOption(event) {
    const field = event.currentTarget.dataset.field
    const value = event.currentTarget.dataset.value

    this.setData({
      [`feedback.${field}`]: value,
      saved: false
    })
  },
  onNoteInput(event) {
    this.setData({
      "feedback.note": event.detail.value,
      saved: false
    })
  },
  saveFeedback() {
    if (!this.data.tripId || !this.data.trip) {
      wx.showToast({
        title: "没有找到慢游计划",
        icon: "none"
      })
      return
    }

    saveTripFeedback(this.data.tripId, this.data.feedback)
    this.setData({
      saved: true
    })
    wx.showToast({
      title: "已提交反馈",
      icon: "success"
    })
  },
  backToCard() {
    if (!this.data.tripId) {
      wx.navigateBack()
      return
    }
    wx.navigateTo({
      url: `/pages/card/card?tripId=${this.data.tripId}`
    })
  }
})
