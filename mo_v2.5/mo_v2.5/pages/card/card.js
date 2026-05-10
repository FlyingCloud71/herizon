const app = getApp()
const { destinations } = require("../../data/destinations")
const { scoreDestination } = require("../../utils/evaluator")
const { friendlyResult } = require("../../utils/presentation")
const { createTripId, getTripPlan, upsertTripPlan } = require("../../utils/tripStore")

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
    tripId: "",
    destination: {},
    result: {},
    plan: {
      restStops: [],
      restroomTips: []
    },
    tripPlan: {
      date: "",
      weatherReminder: true,
      weatherSubscribeStatus: "notSet"
    },
    savedTripPlan: false,
    showTripModal: false
  },
  onLoad(options) {
    if (options && options.tripId) {
      this.loadSavedTrip(options.tripId)
    }
  },
  onShow() {
    if (this.data.tripId) {
      const savedTrip = getTripPlan(this.data.tripId)
      if (savedTrip) {
        this.applyTrip(savedTrip)
        return
      }
    }

    if (!app.globalData.destination || !app.globalData.result) {
      const destination = destinations[1]
      app.globalData.destination = destination
      app.globalData.result = scoreDestination(defaultProfile, destination)
      app.globalData.profile = defaultProfile
    }

    const result = friendlyResult(app.globalData.result || {})
    this.setData({
      fontLevel: app.globalData.fontLevel || wx.getStorageSync("fontLevel") || "normal",
      destination: app.globalData.destination || {},
      result,
      plan: result.plan || this.data.plan
    })
  },
  loadSavedTrip(tripId) {
    const savedTrip = getTripPlan(tripId)
    if (!savedTrip) {
      wx.showToast({
        title: "没有找到这张慢游卡",
        icon: "none"
      })
      return
    }
    this.applyTrip(savedTrip)
  },
  applyTrip(savedTrip) {
    const result = friendlyResult(savedTrip.result || {})
    this.setData({
      fontLevel: app.globalData.fontLevel || wx.getStorageSync("fontLevel") || "normal",
      tripId: savedTrip.id,
      destination: savedTrip.destination || {},
      result,
      plan: result.plan || savedTrip.plan || this.data.plan,
      tripPlan: {
        date: savedTrip.tripDate || "",
        weatherReminder: savedTrip.weatherReminder !== false,
        weatherSubscribeStatus: savedTrip.weatherSubscribeStatus || "saved"
      },
      savedTripPlan: Boolean(savedTrip.tripDate)
    })
  },
  onShareAppMessage() {
    const destination = this.data.destination || {}
    return {
      title: `${destination.name || "北京"}安心慢游卡`,
      path: this.data.tripId ? `/pages/card/card?tripId=${this.data.tripId}` : "/pages/card/card"
    }
  },
  goMine() {
    wx.navigateTo({
      url: "/pages/mine/mine"
    })
  },
  goFeedback() {
    if (!this.data.tripId) {
      wx.showToast({
        title: "先保存出行计划",
        icon: "none"
      })
      return
    }
    wx.navigateTo({
      url: `/pages/feedback/feedback?tripId=${this.data.tripId}`
    })
  },
  noop() {},
  openTripModal() {
    this.setData({
      showTripModal: true
    })
  },
  closeTripModal() {
    this.setData({
      showTripModal: false
    })
  },
  onTripDateChange(event) {
    this.setData({
      "tripPlan.date": event.detail.value,
      savedTripPlan: false
    })
  },
  toggleWeatherReminder(event) {
    this.setData({
      "tripPlan.weatherReminder": event.detail.value,
      savedTripPlan: false
    })
  },
  saveTripPlan() {
    if (!this.data.tripPlan.date) {
      wx.showToast({
        title: "先选择日期",
        icon: "none"
      })
      return
    }

    const destination = this.data.destination || {}
    const tripId = this.data.tripId || createTripId(destination.id)
    const savedTrip = upsertTripPlan({
      id: tripId,
      destinationId: destination.id,
      destination,
      profile: app.globalData.profile || defaultProfile,
      result: this.data.result,
      plan: this.data.plan,
      tripDate: this.data.tripPlan.date,
      weatherReminder: this.data.tripPlan.weatherReminder,
      weatherSubscribeStatus: this.data.tripPlan.weatherReminder ? "demoSaved" : "closed"
    })

    this.setData({
      tripId: savedTrip.id,
      savedTripPlan: true,
      showTripModal: false,
      "tripPlan.weatherSubscribeStatus": savedTrip.weatherSubscribeStatus
    })

    wx.showToast({
      title: this.data.tripPlan.weatherReminder ? "已保存天气提醒" : "已保存计划",
      icon: "success"
    })
  }
})
