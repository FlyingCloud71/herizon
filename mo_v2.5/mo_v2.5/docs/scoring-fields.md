# 慢游可行性评分字段说明

这份文档只说明当前真正参与打分的字段。

评分逻辑位于：

```text
utils/evaluator.js
```

当前总分从 `100` 分开始，根据妈妈的身体限制和目的地字段扣分，最后生成：

```text
68-100：推荐
48-67：谨慎推荐
20-47：不建议
```

最终分数最低限制为 `20` 分。

## 参与打分的目的地字段

当前真正参与评分的目的地字段有 7 个：

```js
walkMinutes
steps
restroom
seating
outdoorExposure
crowdRisk
nursingRoom
```

注意：`transfer`、`halfDay`、`restStops`、`restroomTips`、`backup`、`caveat`、`dataQuality` 当前不参与分数计算，只用于展示或数据质量说明。

## 1. `walkMinutes`

含义：半日慢游预计总步行时间，单位为分钟。

它会和用户填写的：

```js
profile.maxWalkMinutes
```

进行比较。

当前扣分规则：

```text
如果 walkMinutes <= maxWalkMinutes：
  不扣分，并显示“步行时间在可控范围内”

如果 walkMinutes > maxWalkMinutes：
  超出 1-24 分钟，扣 14 分
  超出 25 分钟及以上，扣 22 分
```

例子：

```text
妈妈最多能连续步行 25 分钟
目的地 walkMinutes = 35
超出 10 分钟，扣 14 分

妈妈最多能连续步行 25 分钟
目的地 walkMinutes = 55
超出 30 分钟，扣 22 分
```

填写建议：

```text
10-25：轻松
30-40：可控，但需要休息
45-60：有压力
60+：不适合作为慢游主推目的地
```

## 2. `steps`

含义：台阶、坡道、上下楼、路面连续性的压力，范围 `1-5`。

数值越高，压力越大。

它会和用户填写的两个条件联动：

```js
profile.avoidSteps
profile.needWheelchair
```

当前扣分规则：

```text
如果用户选择“尽量不走台阶”，且 steps >= 3：
  扣 18 分

如果用户选择“需要轮椅/助行器”，且 steps >= 3：
  额外扣 16 分

如果 steps <= 1：
  不扣分，并显示“台阶压力较低”
```

也就是说，同一个目的地如果 `steps >= 3`，并且妈妈既避台阶又需要助行器，最多会因为台阶相关因素扣：

```text
18 + 16 = 34 分
```

评分口径：

```text
1：几乎无台阶，平路或电梯友好
2：少量台阶或轻微坡道，基本可绕开
3：有明显台阶、坡道或院落门槛，需要提醒
4：台阶/坡道较多，对腿脚不便者压力明显
5：大量台阶、爬坡、上下楼，不适合慢游主线
```

## 3. `restroom`

含义：厕所数量，单位为“个”。实际扣分时会结合游玩时长计算厕所密度。

它不是 `1-5` 级评分。

它会和用户填写的：

```js
profile.needFrequentRestroom
```

联动。

当前扣分规则：

```text
restroomPerHour = restroom / (walkMinutes / 60)

如果用户选择“需要频繁上厕所”，且 restroomPerHour < 3：
  扣 10 分

如果 restroomPerHour >= 5：
  不扣分，并显示“厕所密度相对友好”
```

评分口径：

```text
低于 3 个/小时：密度偏低，对频繁如厕用户压力明显
3-4.9 个/小时：基本可用，但仍需要提前确认位置
5 个/小时及以上：密度相对友好
```

注意：

厕所密度不等于真实可达性。即使密度较高，真实上线前仍需要核验入口、动线、楼层和排队情况。

## 4. `seating`

含义：坐下休息便利度，范围 `1-5`。

数值越高，越容易随时坐下。

它会和用户填写的：

```js
profile.needFrequentRest
```

联动。

当前扣分规则：

```text
如果用户选择“需要随时能坐下”，且 seating < 4：
  扣 10 分

如果 seating >= 4：
  不扣分，并显示“沿途有较多可休息点”
```

评分口径：

```text
1：几乎没地方坐，只能站着等
2：座位少，休息不稳定
3：有一些休息点，但间隔较远
4：休息点较多，可边走边停
5：座椅、餐饮、室内空间充足，容易随时停下
```

## 5. `outdoorExposure`

含义：户外暴露度，范围 `1-5`。

数值越高，行程越依赖户外环境。它不表示当天热不热，而是表示这个目的地遇到高温、暴晒、闷热、下雨、大风时是否容易变累。

它会和用户填写的：

```js
profile.heatSensitive
```

联动。

当前扣分规则：

```text
如果用户选择“怕热或怕晒”，且 outdoorExposure >= 4：
  扣 10 分
```

评分口径：

```text
1：主要在室内，温度和休息节奏相对可控
2：室内外结合，户外只是一小段
3：有一定户外步行，但可以靠时间选择和休息点缓冲
4：户外时间明显，热天、晒天或雨天压力会变大
5：长时间暴露在户外，遮阴少或排队久，坏天气不建议
```

## 6. `crowdRisk`

含义：人流、排队、拥挤、噪音带来的压力，范围 `1-5`。

数值越高，人流风险越高。

它会和用户填写的：

```js
profile.avoidCrowd
```

联动。

当前扣分规则：

```text
如果用户选择“不喜欢人挤人”，且 crowdRisk >= 4：
  扣 10 分
```

评分口径：

```text
1：通常不拥挤
2：轻微人流，影响不大
3：普通热门程度，周末需注意
4：热门时段明显拥挤或排队
5：经常排队、人挤人，对老人体验影响很大
```

## 7. `nursingRoom`

含义：育婴室或亲子卫生间数量，单位为“个”。

数值越高，越方便。它不是 `1-5` 级评分。

它会和用户填写的：

```js
profile.needNursingRoom
```

联动。

当前规则：

```text
如果用户选择“需要育婴室”，且 nursingRoom <= 0：
  扣 8 分

如果 nursingRoom >= 2：
  加 6 分，并显示“育婴室数量更友好”

如果 nursingRoom = 1：
  不扣分，并显示“有基础育婴室，建议提前确认位置”
```

评分口径：

```text
0 个：没有明确可用的育婴室
1 个：有基础保障，但位置和排队仍需要提前确认
2 个及以上：数量相对明确
```

## 用户输入字段和目的地字段的对应关系

```text
profile.maxWalkMinutes
  对应 destination.walkMinutes

profile.avoidSteps
  对应 destination.steps

profile.needWheelchair
  对应 destination.steps

profile.needFrequentRestroom
  对应 destination.restroom

profile.needFrequentRest
  对应 destination.seating

profile.heatSensitive
  对应 destination.outdoorExposure

profile.avoidCrowd
  对应 destination.crowdRisk

profile.needNursingRoom
  对应 destination.nursingRoom
```

## 当前不参与打分的字段

这些字段目前不会改变分数：

```js
id
name
area
cover
halfDay
transfer
bestTime
dropoff
restStops
restroomTips
backup
caveat
dataQuality
```

它们的作用分别是：

```text
id/name/area/cover：列表展示和识别
halfDay：保留字段，后续可用于筛选半日/一日慢游
transfer：当前仅记录接驳便利度，后续建议纳入评分
bestTime/dropoff：生成慢游卡
restStops/restroomTips/backup/caveat：生成提醒文案
dataQuality：说明数据可信度，不影响推荐分
```

## 建议后续纳入评分的字段

当前我最建议下一个纳入评分的是：

```js
transfer
```

原因：对老人出游来说，“能不能在近处下车、能不能顺利离开”非常关键。

建议规则可以是：

```text
如果 transfer <= 2：
  扣 10-16 分

如果用户需要轮椅/助行器，且 transfer <= 3：
  额外扣 8-12 分
```

其次可以考虑把 `dataQuality.confidence` 纳入真实上线版本：

```text
如果 confidence <= 1：
  不给真实推荐，只展示“数据待核验”

如果 confidence = 2：
  只能谨慎推荐
```

但黑客松 Demo 阶段可以先不纳入，否则样本点会显得都不可用。
