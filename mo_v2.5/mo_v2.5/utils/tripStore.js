const STORAGE_KEY = "slowTravelPlans"

function getTripPlans() {
  return wx.getStorageSync(STORAGE_KEY) || []
}

function getTripPlan(tripId) {
  return getTripPlans().find((item) => item.id === tripId) || null
}

function upsertTripPlan(plan) {
  const plans = getTripPlans()
  const index = plans.findIndex((item) => item.id === plan.id)
  const nextPlan = {
    ...plan,
    updatedAt: new Date().toISOString()
  }

  if (index >= 0) {
    plans[index] = {
      ...plans[index],
      ...nextPlan
    }
  } else {
    plans.unshift({
      createdAt: new Date().toISOString(),
      feedbackStatus: "pending",
      ...nextPlan
    })
  }

  wx.setStorageSync(STORAGE_KEY, plans)
  return nextPlan
}

function saveTripFeedback(tripId, feedback) {
  const plans = getTripPlans()
  const index = plans.findIndex((item) => item.id === tripId)

  if (index < 0) {
    return null
  }

  plans[index] = {
    ...plans[index],
    feedback,
    feedbackStatus: "done",
    feedbackUpdatedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  wx.setStorageSync(STORAGE_KEY, plans)
  return plans[index]
}

function createTripId(destinationId) {
  return `${destinationId || "trip"}-${Date.now()}`
}

module.exports = {
  createTripId,
  getTripPlan,
  getTripPlans,
  saveTripFeedback,
  upsertTripPlan
}
