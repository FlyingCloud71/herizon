const app = getApp()
const { destinations } = require("../../data/destinations")
const { scoreDestination } = require("../../utils/evaluator")
const { friendlyResult } = require("../../utils/presentation")

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
    destination: {},
    result: {
      highlights: [],
      issues: [],
      plan: {}
    }
  },
  onShow() {
    if (!app.globalData.destination || !app.globalData.result) {
      const destination = destinations[1]
      app.globalData.destination = destination
      app.globalData.result = scoreDestination(defaultProfile, destination)
    }

    this.setData({
      fontLevel: app.globalData.fontLevel || wx.getStorageSync("fontLevel") || "normal",
      destination: app.globalData.destination,
      result: friendlyResult(app.globalData.result)
    })
  },
  makeCard() {
    wx.navigateTo({
      url: "/pages/card/card"
    })
  },
  chooseAgain() {
    wx.navigateBack()
  }
})
