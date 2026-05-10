function scoreDestination(profile, destination) {
  const issues = []
  const highlights = []
  let score = 100

  if (destination.walkMinutes > profile.maxWalkMinutes) {
    const over = destination.walkMinutes - profile.maxWalkMinutes
    score -= over >= 25 ? 22 : 14
    issues.push(`常规游览约 ${destination.walkMinutes} 分钟，会超过妈妈舒适步行上限`)
  } else {
    highlights.push("步行时间在可控范围内")
  }

  if (profile.avoidSteps && destination.steps >= 3) {
    score -= 18
    issues.push("台阶或坡道压力偏高，需要减少步行范围")
  } else if (destination.steps <= 1) {
    highlights.push("台阶压力较低")
  }

  const restroomPerHour = getRestroomPerHour(destination)

  if (profile.needFrequentRestroom && restroomPerHour < 3) {
    score -= 10
    issues.push(`厕所密度偏低，约每小时 ${formatRate(restroomPerHour)} 个，需要提前安排厕所节点`)
  } else if (restroomPerHour >= 5) {
    highlights.push(`厕所密度相对友好，约每小时 ${formatRate(restroomPerHour)} 个`)
  }

  if (profile.needFrequentRest && destination.seating < 4) {
    score -= 10
    issues.push("可坐下休息的地方不够密集")
  } else if (destination.seating >= 4) {
    highlights.push("沿途有较多可休息点")
  }

  if (profile.heatSensitive && destination.outdoorExposure >= 4) {
    score -= 10
    issues.push("户外暴露时间较长，遇到高温或暴晒会明显增加疲劳")
  }

  if (profile.avoidCrowd && destination.crowdRisk >= 4) {
    score -= 10
    issues.push("热门时段人流可能让妈妈紧张或疲劳")
  }

  if (profile.needWheelchair && destination.steps >= 3) {
    score -= 16
    issues.push("轮椅或助行器通行需要额外确认")
  }

  if (profile.needNursingRoom && destination.nursingRoom <= 0) {
    score -= 8
    issues.push("没有明确育婴室，需要提前确认")
  } else if (profile.needNursingRoom && destination.nursingRoom >= 2) {
    score += 6
    highlights.push("育婴室数量更友好")
  } else if (profile.needNursingRoom && destination.nursingRoom >= 1) {
    highlights.push("有基础育婴室，建议提前确认位置")
  }

  const level = score >= 68 ? "推荐" : score >= 48 ? "谨慎推荐" : "不建议"
  const tone = score >= 68 ? "ok" : score >= 48 ? "warn" : "danger"

  return {
    score: Math.max(20, Math.min(100, score)),
    level,
    tone,
    issues,
    highlights,
    plan: buildPlan(profile, destination)
  }
}

function getRestroomPerHour(destination) {
  const durationHours = Math.max((destination.walkMinutes || 0) / 60, 0.5)
  return (destination.restroom || 0) / durationHours
}

function formatRate(value) {
  if (value >= 10) {
    return String(Math.round(value))
  }
  return value.toFixed(1).replace(".0", "")
}

function buildPlan(profile, destination) {
  const walkTarget = Math.min(destination.walkMinutes, profile.maxWalkMinutes + 10)

  return {
    title: `${destination.name}半日安心慢游`,
    duration: "约 2.5-3 小时",
    walkTarget: `建议控制在 ${walkTarget} 分钟以内`,
    bestTime: destination.bestTime,
    dropoff: destination.dropoff,
    restStops: destination.restStops,
    restroomTips: destination.restroomTips,
    backup: destination.backup,
    caveat: destination.caveat
  }
}

module.exports = {
  scoreDestination
}
