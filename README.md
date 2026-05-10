# 妈呀要去吗 微信小程序 Demo

妈呀要去吗是一个面向“女儿带妈妈出门”的适老慢游 Demo。

它不做泛旅游攻略，而是聚焦一个更具体的问题：

> 妈妈腿脚不便、容易疲劳、需要随时休息和上厕所时，一个目的地到底能不能安心去？如果能去，怎么安排少走路、少台阶、能坐下、有厕所提醒、有备用方案的半日慢游？

当前项目是原生微信小程序，可直接导入微信开发者工具预览。

## 当前版本功能

主流程：

```text
首页
  -> 填写妈妈身体限制
  -> 选择北京样本目的地
  -> 生成慢游可行性评估
  -> 生成可分享的安心慢游卡
  -> 填写计划出行日期、订阅天气提醒
  -> 出行后征集用户的数据反馈
```

已经实现：

- 妈妈状态填写：步行上限、避台阶、厕所频率、休息需求、怕热怕晒、避开人流、轮椅/助行器。
- 北京目的地样本：颐和园、国家博物馆、北京坊、雍和宫周边、朝阳公园、798 艺术区。
- 慢游可行性评分：推荐、谨慎推荐、不建议。
- 半日出行要点展示。
- 安心慢游卡：面向妈妈/家人阅读的温和版本。
- 数据质量标注：说明样本数据哪些已部分核验，哪些只是 Demo 假设。

## 如何运行

1. 打开微信开发者工具。
2. 选择“导入项目”。
3. 项目目录选择：

```text
/Users/qc/Desktop/mo
```

4. 当前 `appid` 是测试值：

```json
"appid": "touristappid"
```

如果队伍有正式小程序 AppID，可以在 `project.config.json` 中替换。

## 项目结构

```text
.
├── app.js
├── app.json
├── app.wxss
├── project.config.json
├── sitemap.json
├── data/
│   └── destinations.js
├── utils/
│   └── evaluator.js
├── pages/
│   ├── index/
│   ├── profile/
│   ├── destinations/
│   ├── result/
│   ├── card/
│   └── album/
├── assets/
│   └── mellowway-avatar-*.png
└── docs/
    ├── destination-fields.md
    └── scoring-fields.md
```

## 核心文件说明

### 全局配置

#### `app.json`

定义小程序页面顺序和全局窗口样式。

当前页面顺序：

```text
pages/index/index
pages/profile/profile
pages/destinations/destinations
pages/result/result
pages/card/card
pages/album/album
```

如果新增页面，需要先在这里注册。

#### `app.js`

保存当前流程中的全局临时状态：

```js
globalData: {
  profile: null,
  destination: null,
  result: null
}
```

当前 Demo 没有接数据库，也没有接登录。页面之间依靠 `globalData` 传递用户选择结果。

#### `app.wxss`

全局样式，包括页面背景、通用标题、按钮、面板、标签等。

## 页面说明

### `pages/index`

首页。

作用：
- 讲清楚产品场景。
- 引导进入“妈妈状态填写”。

入口按钮会跳转到：

```text
pages/profile/profile
```

### `pages/profile`

妈妈身体限制填写页。

用户输入包括：

```js
maxWalkMinutes
avoidSteps
needFrequentRestroom
needFrequentRest
heatSensitive
avoidCrowd
needWheelchair
```

这些字段会影响后续评分。

点击“选择目的地”后，页面会把 `profile` 写入：

```js
app.globalData.profile
```

然后跳转到：

```text
pages/destinations/destinations
```

### `pages/destinations`

北京目的地选择页。

数据来源：

```text
data/destinations.js
```

用户点击某个目的地后，页面会：

1. 找到对应目的地数据。
2. 调用 `utils/evaluator.js` 里的 `scoreDestination(profile, destination)`。
3. 把目的地和评分结果写入 `app.globalData`。
4. 跳转到评估页。

### `pages/result`

慢游可行性评估页。

展示内容：
- 推荐等级。
- 慢游安心指数。
- 适合的理由。
- 需要提前处理的风险。
- 出行要点。

如果用户直接打开这个页面，没有走前面的流程，页面会使用一个默认案例，避免空白。

### `pages/card`

安心慢游卡页。

这是 Demo 的核心展示页之一，面向妈妈/家人阅读。

展示内容：
- 目的地和推荐等级。
- 出发时间。
- 步行控制。
- 下车点。
- 可休息地点。
- 厕所提醒。
- 累了之后的备用方案。

页面支持微信分享：

```js
onShareAppMessage()
```

当前分享页仍依赖本地默认数据。真实上线时，需要把生成结果保存到云端，并通过分享链接读取同一张卡。

### `pages/album`

慢游相册静态展示页。

它不是当前主功能，只是作为黑客松 Demo 的加分扩展：

> 旅行结束后，上传照片，生成适合发给家人的慢游相册。

## 数据层

### `data/destinations.js`

目的地样本数据。

每个目的地包含：

- 基础展示字段：`id`、`name`、`area`、`cover`
- 评分字段：`walkMinutes`、`steps`、`restroom`、`seating`、`outdoorExposure`、`crowdRisk`、`nursingRoom`
- 出行提示字段：`bestTime`、`dropoff`、`restStops`、`restroomTips`、`backup`、`caveat`
- 数据质量字段：`dataQuality`

详细字段说明见：

```text
docs/destination-fields.md
```

## 评分逻辑

### `utils/evaluator.js`

核心函数：

```js
scoreDestination(profile, destination)
```

评分从 `100` 分开始，根据妈妈状态和目的地属性扣分。

当前真正参与打分的目的地字段只有：

```js
walkMinutes
steps
restroom
seating
outdoorExposure
crowdRisk
nursingRoom
```

其中 `walkMinutes` 是分钟数，`restroom` 和 `nursingRoom` 是数量；`steps`、`seating`、`outdoorExposure`、`crowdRisk` 是 `1-5` 级。厕所会按 `restroom / (walkMinutes / 60)` 计算每小时厕所数，育婴室按有无为主，`nursingRoom >= 2` 时可加分。

推荐等级：

```text
68-100：推荐
48-67：谨慎推荐
20-47：不建议
```

详细评分字段说明见：

```text
docs/scoring-fields.md
```

注意：

`restStops`、`restroomTips`、`backup`、`caveat` 当前不参与打分，只用于生成慢游方案和慢游卡。

## 数据质量说明

当前目的地数据是黑客松 Demo 样本，不应直接当作真实上线数据。

为避免把 Demo 建议伪装成真实可用信息，每个目的地都加入了：

```js
dataQuality
```

它会说明：

- 数据状态：已核验、部分核验、Demo 假设、需要复查。
- 可信度：`1-5`。
- 最后核验日期。
- 来源链接。
- 仍需核验的问题。

当前原则：

```text
没有现场/地图/官方来源核验的点位和设施，不应写成确定建议。
```

## 修改目的地数据的流程

建议顺序：

1. 打开 `docs/destination-fields.md`。
2. 按字段说明补充或修改 `data/destinations.js`。
3. 对评分字段特别谨慎：

```js
walkMinutes
steps
restroom
seating
outdoorExposure
crowdRisk
nursingRoom
```

4. 如果厕所、座椅、落客点没有核验，在 `dataQuality.status` 中标为：

```js
"demoUnverified"
```

5. 如果只是有官方信息但没有现场核验，标为：

```js
"partiallyVerified"
```

6. 在微信开发者工具里重新预览评分和慢游卡。

## 当前限制

当前版本仍是 Demo：

- 没有接入实时地图。
- 没有接入实时天气。
- 没有云数据库。
- 没有真实微信用户体系。
- 分享卡没有持久化到云端。
- 厕所、座椅、落客点还需要地图或现场核验。

## 后续建议

优先级从高到低：

1. 把 `transfer` 纳入评分，体现接驳和打车落点的重要性。
2. 增加“数据待核验”提示，不把低可信数据展示成确定建议。
3. 接入云开发，把生成的慢游卡保存成可分享链接。
4. 用地图 POI 核验厕所、座椅、入口、落客点。
5. 引入实时天气，让 `outdoorExposure` 和天气共同影响评分。
6. 增加目的地筛选：室内优先、半日优先、少台阶优先。
7. 把相册页做成真实上传和自动排版。

## 品牌资产

小程序头像在：

```text
assets/mellowway-avatar-v4-144.png
```

尺寸：

```text
144px × 144px
```

格式：

```text
PNG
```

如果需要替换头像，建议保留同样尺寸和格式。
