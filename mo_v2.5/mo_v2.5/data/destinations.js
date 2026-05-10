const destinations = [
  {
    id: "forbidden-city",
    name: "故宫",
    area: "东城",
    cover: "正式入园前步行较长，人流和暴晒压力高",
    halfDay: true,
    walkMinutes: 150,
    steps: 3,
    restroom: 14,
    seating: 3,
    transfer: 3,
    outdoorExposure: 5,
    crowdRisk: 4,
    nursingRoom: 1,
    bestTime: "预约工作日上午场",
    dropoff: "建议提前规划落客点，预留正式进入景区前约 1km 步行",
    restStops: ["入口外等候区", "院内可停留区域", "出口附近休息点"],
    restroomTips: ["正式进入前先确认厕所", "进入后不要等到很急再找厕所"],
    backup: "如果入园前步行已经明显疲劳，缩短为入口附近短暂停留，及时返程。",
    caveat: "正式进入景区前就要走约 1km，体力压力需要提前考虑。",
    dataQuality: {
      status: "partiallyVerified",
      confidence: 3,
      lastChecked: "2026-05-10",
      notes: "步行时间、台阶压力、厕所数量、休息便利度、户外暴露、人流风险和育婴室数量来自当前整理的真实指标；具体厕所位置、座椅位置和落客点仍需现场或地图核验。",
      sources: []
    }
  },
  {
    id: "summer-palace",
    name: "颐和园",
    area: "海淀",
    cover: "湖边长廊、开阔水面、适合慢慢逛",
    halfDay: true,
    walkMinutes: 200,
    steps: 4,
    restroom: 150,
    seating: 4,
    transfer: 3,
    outdoorExposure: 5,
    crowdRisk: 4,
    nursingRoom: 1,
    bestTime: "工作日上午 9:00-11:30",
    dropoff: "建议从北宫门附近落客，减少入口外步行",
    restStops: ["北宫门游客服务点", "长廊沿线座椅", "昆明湖边阴凉处"],
    restroomTips: ["入园前先上厕所", "长廊前确认最近厕所位置"],
    backup: "如果当天人多或妈妈累了，只走北宫门到长廊一小段，拍照后直接返程。",
    caveat: "不建议上万寿山，台阶和坡道压力都偏高。",
    dataQuality: {
      status: "partiallyVerified",
      confidence: 3,
      lastChecked: "2026-05-09",
      notes: "北宫门、石舫、长廊方向可在颐和园官方信息中找到依据；本 Demo 加入休息、厕所和返程提醒，休息点密度与厕所距离仍需现场核验。",
      sources: [
        "https://www.summerpalace-china.com/xnyh/index_mobile.htm",
        "https://www.summerpalace.net.cn/visit.html",
        "https://www.summerpalace.net.cn/single/detail/506.html"
      ]
    }
  },
  {
    id: "beihai-park",
    name: "北海公园",
    area: "西城",
    cover: "湖边慢游较舒展，上白塔台阶压力高",
    halfDay: true,
    walkMinutes: 100,
    steps: 3,
    restroom: 9,
    seating: 5,
    transfer: 3,
    outdoorExposure: 4,
    crowdRisk: 3,
    nursingRoom: 1,
    bestTime: "天气凉爽的工作日上午",
    dropoff: "建议选择离目标区域近的入口，避免横穿园区",
    restStops: ["湖边座椅", "入口附近休息点", "沿线树荫处"],
    restroomTips: ["入园后先确认最近厕所", "上白塔前先安排一次厕所"],
    backup: "如果体力不够，只走湖边平缓区域，不上白塔。",
    caveat: "只有上白塔有特别多台阶，建议默认避开。",
    dataQuality: {
      status: "partiallyVerified",
      confidence: 3,
      lastChecked: "2026-05-10",
      notes: "步行时间、台阶压力、厕所数量、休息便利度、户外暴露、人流风险和育婴室数量来自当前整理的真实指标；具体入口、厕所和座椅点位仍需现场或地图核验。",
      sources: []
    }
  },
  {
    id: "national-museum",
    name: "国家博物馆",
    area: "东城",
    cover: "室内、可控、厕所和休息点相对明确",
    halfDay: true,
    walkMinutes: 120,
    steps: 2,
    restroom: 6,
    seating: 2,
    transfer: 4,
    outdoorExposure: 1,
    crowdRisk: 4,
    nursingRoom: 1,
    bestTime: "预约工作日上午场",
    dropoff: "打车到东长安街附近，下车后预留安检排队时间",
    restStops: ["中庭休息区", "展厅外长椅", "文创店附近"],
    restroomTips: ["进馆后先确认同层厕所", "离开展厅前再安排一次厕所"],
    backup: "如果排队太久，改为附近商场短坐和午饭，不硬等。",
    caveat: "需要提前预约，热门时段排队会增加疲劳。",
    dataQuality: {
      status: "partiallyVerified",
      confidence: 3,
      lastChecked: "2026-05-09",
      notes: "预约、北门入馆、开放时间、交通和便民服务来自国博官方服务页；具体展厅选择和休息点顺序需结合当日展览和馆内导览复核。",
      sources: [
        "https://m.chnmuseum.cn/cg/"
      ]
    }
  },
  {
    id: "shichahai",
    name: "什刹海",
    area: "西城",
    cover: "湖边胡同慢游，休息点多但周末很拥挤",
    halfDay: true,
    walkMinutes: 100,
    steps: 2,
    restroom: 6,
    seating: 5,
    transfer: 4,
    outdoorExposure: 4,
    crowdRisk: 5,
    nursingRoom: 0,
    bestTime: "工作日上午或傍晚前错峰",
    dropoff: "优先地铁 8 号线什刹海站 A1/A2 口，周边道路窄且停车紧张",
    restStops: ["西海湿地公园长椅", "前海/后海沿湖座椅", "海畔友好驿站"],
    restroomTips: ["地铁站内或出口附近先上厕所", "烟袋斜街南口和火德真君庙附近可留意公厕"],
    backup: "如果前海和银锭桥人太多，转去西海湿地公园或就近茶馆休息。",
    caveat: "周末、节假日和冰场季人流很密，湖边步道有些地方会比较窄。",
    dataQuality: {
      status: "partiallyVerified",
      confidence: 3,
      lastChecked: "2026-05-10",
      notes: "交通、休息点、厕所点位、育婴室缺失和人流高峰来自 五.md；厕所数量按文档列出的可用点位保守记录，仍需地图或现场核验。",
      sources: []
    }
  },
  {
    id: "beijing-fang",
    name: "北京坊/前门",
    area: "西城",
    cover: "书店商街好休息，节假日人流压力高",
    halfDay: true,
    walkMinutes: 90,
    steps: 1,
    restroom: 6,
    seating: 5,
    transfer: 4,
    outdoorExposure: 3,
    crowdRisk: 5,
    nursingRoom: 2,
    bestTime: "工作日上午 9:00-11:00",
    dropoff: "优先地铁前门站或珠市口站，打车和自驾容易遇到拥堵",
    restStops: ["PAGEONE 书店", "星巴克臻选北京坊店", "北京市城市规划展览馆"],
    restroomTips: ["进入书店、展览馆或地铁站时先确认厕所", "离开室内休息点前再安排一次厕所"],
    backup: "如果前门主街限流或太挤，直接转入北京坊书店、咖啡店或城市规划展览馆休息。",
    caveat: "周末和节假日前门主街人流很高，可能遇到限流或长时间排队。",
    dataQuality: {
      status: "partiallyVerified",
      confidence: 3,
      lastChecked: "2026-05-10",
      notes: "人流、游览时长、休息点、厕所和育婴室信息来自 五.md；厕所数量按文档列出的可用点位和室内点位保守记录，仍需地图或现场核验。",
      sources: [
        "https://www.beijing.gov.cn/renwen/rwzyd/wljd/bjftyjd/202311/t20231116_3303281.html",
        "https://www.chinaservicesinfo.com/s/202103/31/WS606446ee498e7a02c6f6a56d/pageone-beijing-fun-beijing.html"
      ]
    }
  },
  {
    id: "lama-temple",
    name: "雍和宫",
    area: "东城",
    cover: "地铁近但人流集中，寺内没有育婴室",
    halfDay: true,
    walkMinutes: 60,
    steps: 4,
    restroom: 2,
    seating: 3,
    transfer: 4,
    outdoorExposure: 3,
    crowdRisk: 5,
    nursingRoom: 0,
    bestTime: "工作日 9:00 开门后",
    dropoff: "地铁 2/5 号线雍和宫站 F 口，步行约 3 分钟到南门",
    restStops: ["雍和门殿院东侧游客服务中心", "售票处对面树荫下", "五道营胡同咖啡店"],
    restroomTips: ["地铁 5 号线雍和宫站下行站台尾端有厕所", "入园前先解决临时需求，景区内厕所需购票入内"],
    backup: "如果排队或上香人流太密，缩短为南门附近短暂停留，再转去五道营胡同坐下休息。",
    caveat: "雍和宫内没有育婴室，初一、十五和节假日人流压力很高。",
    dataQuality: {
      status: "partiallyVerified",
      confidence: 3,
      lastChecked: "2026-05-10",
      notes: "开放时间、预约、交通、厕所、休息点、育婴室缺失和人流高峰来自 五.md；具体院内厕所和休息位置仍需现场或地图核验。",
      sources: [
        "https://www.visitbeijing.com.cn/article/4N0bRSw3TLW?device=amp"
      ]
    }
  },
  {
    id: "chaoyang-park",
    name: "朝阳公园",
    area: "朝阳",
    cover: "草坪湖边适合慢坐，户外暴露和活动人流需注意",
    halfDay: true,
    walkMinutes: 80,
    steps: 1,
    restroom: 3,
    seating: 5,
    transfer: 4,
    outdoorExposure: 5,
    crowdRisk: 4,
    nursingRoom: 1,
    bestTime: "工作日天气凉爽的上午或下午 4 点后",
    dropoff: "南门靠近游客服务中心和育婴室；去北湖区域需提前选近入口",
    restStops: ["中心大草坪", "北湖大草坪", "南门游客服务中心"],
    restroomTips: ["进园先确认最近厕所和游客服务中心位置", "不要走到北湖或中心岛后再临时找厕所"],
    backup: "如果天气热或活动人多，只在南门游客服务中心和附近树荫区短坐。",
    caveat: "园区很大且户外暴露高，大型活动和周末人流会明显增加。",
    dataQuality: {
      status: "partiallyVerified",
      confidence: 3,
      lastChecked: "2026-05-10",
      notes: "交通、游览时长、休息点、南门育婴室和人流高峰来自 五.md；厕所数量仍沿用保守占位，需地图或现场核验。",
      sources: [
        "https://s.visitbeijing.com.cn/index.php/attraction/101910",
        "https://yllhj.beijing.gov.cn/ggfw/bjsggml/zhgy/cyq/202206/t20220614_2740316.shtml"
      ]
    }
  },
  {
    id: "798",
    name: "798 艺术区",
    area: "朝阳",
    cover: "展馆咖啡多，厕所点位清楚但园区很大",
    halfDay: true,
    walkMinutes: 90,
    steps: 2,
    restroom: 8,
    seating: 5,
    transfer: 3,
    outdoorExposure: 3,
    crowdRisk: 4,
    nursingRoom: 1,
    bestTime: "工作日下午",
    dropoff: "打车可到核心区入口；地铁望京南站 B1 口到南门还需步行或骑行约 10-15 分钟",
    restStops: ["佳能798艺术中心休息区", "现代汽车文化中心", "园区咖啡店"],
    restroomTips: ["优先记住虫洞、麻将和一百分厕所", "到 751 区域前先确认双塔或第一车间厕所位置"],
    backup: "如果走累了，只看一个展馆，转入咖啡店或现代汽车文化中心坐下休息。",
    caveat: "园区分散，节假日和大型活动客流高，临时乱逛会让步行超标。",
    dataQuality: {
      status: "partiallyVerified",
      confidence: 3,
      lastChecked: "2026-05-10",
      notes: "游览时长、交通、休息点、8 个厕所点位、遇见博物馆育婴室和人流信息来自 五.md；厕所和育婴室是否开放仍需当日地图或现场核验。",
      sources: [
        "https://www.798artdistrict.com.cn/guide?shop_id=34",
        "https://english.beijing.gov.cn/travellinginbeijing/attractions/202603/t20260323_4563864.html"
      ]
    }
  }
]

module.exports = {
  destinations
}
