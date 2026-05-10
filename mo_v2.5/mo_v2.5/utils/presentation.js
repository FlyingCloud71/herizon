const levelLabels = {
  推荐: "比较适合",
  谨慎推荐: "需要准备",
  不建议: "这次不太适合"
}

function friendlyText(text) {
  return (text || "")
    .replace(/妈妈舒适步行上限/g, "你这次舒服走路的时间")
    .replace(/妈妈/g, "你")
    .replace(/不建议/g, "这次不太适合")
    .replace(/谨慎推荐/g, "需要准备")
    .replace(/推荐/g, "比较适合")
}

function friendlyResult(result) {
  if (!result) {
    return result
  }

  return {
    ...result,
    displayLevel: levelLabels[result.level] || result.level,
    highlights: (result.highlights || []).map(friendlyText),
    issues: (result.issues || []).map(friendlyText),
    plan: {
      ...(result.plan || {}),
      title: friendlyText((result.plan || {}).title)
    }
  }
}

module.exports = {
  friendlyResult,
  friendlyText
}
