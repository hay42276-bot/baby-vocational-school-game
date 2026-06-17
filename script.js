let gameState = {
  growthPoints: 5,
  stats: {
    brain: 0,
    feet: 0,
    speech: 0,
    bite: 0,
    hands: 0
  },
  tools: [],
  progress: 0,
  gameEnded: false,
  deathCount: 0,
  visitedAreas: {
    classroom: 0,
    canteen: 0,
    playground: 0,
    workshop: 0,
    dorm: 0
  }
};

const openingText =
  "【开场】你出生在职业高中女厕所的第三个隔间。\n" +
  "门外是上课铃，门内是命运的第一声啼哭。\n" +
  "你还不会走路，但你已经知道：这所学校，就是你的进化战场。";

const mapNames = {
  classroom: "教室",
  canteen: "食堂",
  playground: "操场",
  workshop: "实训车间",
  dorm: "宿舍"
};

const statNames = {
  brain: "脑",
  feet: "足",
  speech: "文口",
  bite: "武口",
  hands: "手"
};

const toolUnlocks = [
  {
    name: "奶瓶扳手",
    description: "用奶瓶和废旧扳手拼成的第一件职高神器。",
    effectText: "脑判定 +1，手判定 +1，实训车间死亡率降低 6%。",
    conditions: {
      brain: 3
    },
    statBonus: {
      brain: 1,
      hands: 1
    },
    deathReduction: {
      workshop: 0.06
    },
    rewardBonus: 0,
    progressBonus: 0
  },
  {
    name: "口水发电机",
    description: "通过婴儿口水产生微弱电流的荒诞装置。",
    effectText: "脑判定 +1，文口判定 +2，教室死亡率降低 5%，成功时成长点额外 +1。",
    conditions: {
      brain: 6
    },
    statBonus: {
      brain: 1,
      speech: 2
    },
    deathReduction: {
      classroom: 0.05
    },
    rewardBonus: 1,
    progressBonus: 0
  },
  {
    name: "课桌滑板",
    description: "拆下课桌面板改造成的低空爬行载具。",
    effectText: "足判定 +2，操场死亡率降低 6%，成功时通关进度额外 +2。",
    conditions: {
      brain: 6,
      feet: 2
    },
    statBonus: {
      feet: 2
    },
    deathReduction: {
      playground: 0.06
    },
    rewardBonus: 0,
    progressBonus: 2
  },
  {
    name: "钢牙护齿套",
    description: "由实训车间废料打磨而成的婴儿护齿装备。",
    effectText: "武口判定 +2，食堂死亡率降低 7%。",
    conditions: {
      brain: 5,
      bite: 4
    },
    statBonus: {
      bite: 2
    },
    deathReduction: {
      canteen: 0.07
    },
    rewardBonus: 0,
    progressBonus: 0
  },
  {
    name: "摇篮喷射背包",
    description: "把宿舍摇篮改造成短距离喷射装置。",
    effectText: "足判定 +2，手判定 +1，宿舍和操场死亡率降低 8%。",
    conditions: {
      brain: 9,
      hands: 3
    },
    statBonus: {
      feet: 2,
      hands: 1
    },
    deathReduction: {
      dorm: 0.08,
      playground: 0.08
    },
    rewardBonus: 0,
    progressBonus: 1
  },
  {
    name: "旧校徽护身符",
    description: "从宿舍床底摸出的旧校徽，似乎吸收过无数届学生的怨念。",
    effectText: "所有地图死亡率降低 3%，所有事件随机发挥 +1。",
    conditions: {
      progress: 45
    },
    statBonus: {},
    deathReduction: {
      all: 0.03
    },
    rewardBonus: 0,
    progressBonus: 0,
    randomPowerBonus: 1
  }
];

const mapRandomStates = [
  {
    name: "普通时段",
    description: "校园暂时保持正常，至少表面上正常。",
    difficultyChange: 0,
    rewardChange: 0,
    deathChange: 0
  },
  {
    name: "上课铃暴走",
    description: "刺耳的上课铃让全校陷入混乱，危险显著提高。",
    difficultyChange: 1,
    rewardChange: 1,
    deathChange: 0.08
  },
  {
    name: "班主任巡逻",
    description: "班主任的影子在走廊尽头闪过，事件更难，但奖励更高。",
    difficultyChange: 1,
    rewardChange: 2,
    deathChange: 0.04
  },
  {
    name: "女厕所回声",
    description: "你听见出生地传来熟悉回声，命运出现轻微扭曲。",
    difficultyChange: 0,
    rewardChange: 1,
    deathChange: 0.05
  },
  {
    name: "午休幻觉",
    description: "你进入半梦半醒状态，事件略微简单，死亡率略微下降。",
    difficultyChange: -1,
    rewardChange: 0,
    deathChange: -0.05
  },
  {
    name: "职高气运加身",
    description: "奶瓶里充满了不可解释的校园气运，今天似乎稍微安全一点。",
    difficultyChange: -1,
    rewardChange: 2,
    deathChange: -0.07
  },
  {
    name: "保洁阿姨清场",
    description: "保洁阿姨推着拖把从远处出现，整个区域进入高危状态。",
    difficultyChange: 2,
    rewardChange: 3,
    deathChange: 0.1
  }
];

const areaDeathEvents = {
  classroom: {
    baseDeathChance: 0.2,
    title: "死亡结局：粉笔灰沉睡",
    description:
      "教室里的粉笔灰突然像白色风暴一样升起。你试图用婴儿肺活量抵抗，但吸入了过量知识粉尘。",
    ending:
      "你倒在第一排课桌旁，黑板上还写着“今天不讲重点”。\n" +
      "你的传说停止在教室。\n" +
      "结局：粉笔灰沉睡。"
  },
  canteen: {
    baseDeathChance: 0.23,
    title: "死亡结局：食堂钢勺镇压",
    description:
      "食堂阿姨挥舞着巨大的打饭勺，试图维持午餐秩序。你被一勺土豆泥精准封印。",
    ending:
      "你被埋进土豆泥小山之中，只露出半个奶嘴。\n" +
      "从此食堂多了一道传说级隐藏菜。\n" +
      "结局：食堂钢勺镇压。"
  },
  playground: {
    baseDeathChance: 0.22,
    title: "死亡结局：塑胶跑道蒸发",
    description:
      "操场温度突然升高，塑胶跑道散发出诡异热浪。你的爬行速度太快，和地面摩擦出了命运火花。",
    ending:
      "你在百米跑道上划出一道婴儿形状的残影。\n" +
      "体育老师记录下了这个无法解释的瞬间。\n" +
      "结局：塑胶跑道蒸发。"
  },
  workshop: {
    baseDeathChance: 0.25,
    title: "死亡结局：实训零件吞噬",
    description:
      "实训车间的零件箱突然发生共鸣，无数螺丝、扳手和齿轮围着你旋转。",
    ending:
      "你被卷入一场荒诞的机械组装仪式。\n" +
      "最终，你成为了一台会哭的半自动婴儿扳手机。\n" +
      "结局：实训零件吞噬。"
  },
  dorm: {
    baseDeathChance: 0.21,
    title: "死亡结局：宿舍被窝黑洞",
    description:
      "熄灯后，你钻进被窝。被窝深处传来奇怪吸力，仿佛连接着另一个职高平行宇宙。",
    ending:
      "你消失在宿舍被窝黑洞里。\n" +
      "第二天，室友只发现一只还在发热的奶瓶。\n" +
      "结局：宿舍被窝黑洞。"
  }
};

const areaEvents = {
  classroom: [
    {
      title: "课堂突袭提问",
      description: "班主任突然问你：什么是职业规划？",
      stat: "speech",
      difficulty: 3,
      success: "你用含糊但真诚的婴儿语言打动了全班。",
      fail: "你只发出了“咿呀咿呀”的声音，全班陷入沉默。"
    },
    {
      title: "粉笔机械谜题",
      description: "讲台上的粉笔盒突然变成了机关盒。",
      stat: "brain",
      difficulty: 4,
      success: "你看穿机关结构，成功拆开粉笔盒，灵感大增。",
      fail: "你把粉笔当成磨牙棒啃了半节。"
    },
    {
      title: "课桌迷宫",
      description: "教室课桌被排成了复杂迷宫。",
      stat: "feet",
      difficulty: 3,
      success: "你用惊人的爬行路线穿过课桌迷宫。",
      fail: "你在第二排和第三排之间迷路了。"
    },
    {
      title: "同桌橡皮谈判",
      description: "同桌的橡皮滚到了你的奶瓶旁，他怀疑你私藏了学习资源。",
      stat: "speech",
      difficulty: 4,
      success: "你用文口解释清楚，并顺便建立了婴儿外交关系。",
      fail: "你越解释越像在挑衅，同桌收走了你的半张草稿纸。"
    }
  ],

  canteen: [
    {
      title: "食堂抢饭大战",
      description: "午饭时间，窗口前出现了汹涌的人潮。",
      stat: "feet",
      difficulty: 4,
      success: "你凭借灵活移动成功冲到窗口。",
      fail: "你被人潮推回了餐盘回收处。"
    },
    {
      title: "钢牙啃馒头",
      description: "今天的馒头像实训车间的零件一样硬。",
      stat: "bite",
      difficulty: 4,
      success: "你用武口咬开馒头，震惊食堂阿姨。",
      fail: "你的牙齿在馒头面前感受到了职业挫折。"
    },
    {
      title: "菜单谈判",
      description: "你试图说服食堂阿姨多给一勺菜。",
      stat: "speech",
      difficulty: 3,
      success: "你的表达充满感染力，阿姨给你加了一勺土豆。",
      fail: "阿姨没听懂，但给了你一个勺子让你自己想办法。"
    },
    {
      title: "餐盘漂移",
      description: "你坐在餐盘上，被食堂地面的油光推向未知方向。",
      stat: "feet",
      difficulty: 5,
      success: "你掌握了餐盘漂移技巧，成功停在汤桶旁边。",
      fail: "你一路滑到教师用餐区，被迫接受注视。"
    }
  ],

  playground: [
    {
      title: "百米爬行赛",
      description: "操场上正在举办奇怪的百米爬行比赛。",
      stat: "feet",
      difficulty: 5,
      success: "你像风一样冲过终点，体育老师开始怀疑人生。",
      fail: "你爬到一半被自己的鞋带绊住，虽然你根本没穿鞋。"
    },
    {
      title: "牙齿拔河",
      description: "高年级学生发起了牙齿拔河挑战。",
      stat: "bite",
      difficulty: 5,
      success: "你用锋利牙齿咬住绳子，赢得全场欢呼。",
      fail: "你刚咬住绳子，就开始怀疑这是不是太荒诞了。"
    },
    {
      title: "广播站演讲",
      description: "校园广播突然让你发表新生感言。",
      stat: "speech",
      difficulty: 4,
      success: "你发表了震撼全校的婴儿宣言。",
      fail: "广播里只传出了响亮的打嗝声。"
    },
    {
      title: "跳远沙坑沉思",
      description: "你滚进跳远沙坑，发现这里像一个适合思考人生的小型荒漠。",
      stat: "brain",
      difficulty: 4,
      success: "你在沙坑中悟出移动路线优化方案。",
      fail: "你把沙子当成了点心，短暂失去方向感。"
    }
  ],

  workshop: [
    {
      title: "实训车间工具改造",
      description: "你发现了一堆废旧工具，似乎可以组装点什么。",
      stat: "brain",
      difficulty: 5,
      success: "你成功改造出一个小型辅助工具。",
      fail: "你把螺丝刀装在了奶嘴上，暂时没有实际用途。"
    },
    {
      title: "快速拧螺丝",
      description: "老师要求你在一分钟内拧完一排螺丝。",
      stat: "hands",
      difficulty: 4,
      success: "你的双手快得像小型电动马达。",
      fail: "你把螺丝全部拧成了抽象艺术。"
    },
    {
      title: "机械怪柜",
      description: "一个工具柜突然发出怪声，需要你处理。",
      stat: "hands",
      difficulty: 6,
      success: "你灵活操作工具，成功让怪柜恢复正常。",
      fail: "怪柜吐出一堆扳手，你被迫撤退。"
    },
    {
      title: "焊接面罩凝视",
      description: "一只焊接面罩静静看着你，你感觉它在考验你的发明灵魂。",
      stat: "brain",
      difficulty: 5,
      success: "你理解了它的沉默，并获得一阵机械灵感。",
      fail: "你盯得太久，开始怀疑自己是不是也是工具。"
    }
  ],

  dorm: [
    {
      title: "宿舍夜谈",
      description: "室友们正在讨论未来，你也想加入。",
      stat: "speech",
      difficulty: 4,
      success: "你用真诚表达让室友们对人生有了新理解。",
      fail: "你讲到一半睡着了，大家给你盖上了小被子。"
    },
    {
      title: "床底寻宝",
      description: "宿舍床底似乎藏着神秘物品。",
      stat: "hands",
      difficulty: 3,
      success: "你从床底摸出一枚闪亮的旧校徽。",
      fail: "你摸到了一只袜子，并开始重新思考人生。"
    },
    {
      title: "熄灯后逃生",
      description: "熄灯后，你需要悄悄去洗手间。",
      stat: "feet",
      difficulty: 3,
      success: "你安静而迅速地完成了夜间行动。",
      fail: "你撞到了脸盆，宿舍瞬间灯火通明。"
    },
    {
      title: "上铺哲学危机",
      description: "你仰望上铺，突然意识到人生就像双层床，别人总在你头顶。",
      stat: "brain",
      difficulty: 4,
      success: "你从床架结构中悟出校园生存哲学。",
      fail: "你思考过度，短暂忘记自己为什么在这里。"
    }
  ]
};

function addStat(statName) {
  if (gameState.gameEnded) {
    addLog("游戏已经结束，请点击重新开始。");
    return;
  }

  if (gameState.growthPoints <= 0) {
    addLog("成长点数不足。去校园地图触发事件获得更多成长点吧。");
    showCurrentEvent(
      "成长点不足",
      "无法加点",
      "你的成长点数已经用完。",
      "去地图里冒险，成功后可以获得新的成长点。",
      "danger",
      "危险率：不变"
    );
    return;
  }

  gameState.stats[statName]++;
  gameState.growthPoints--;

  addLog(`你给【${statNames[statName]}】增加了 1 点。`);

  showCurrentEvent(
    "属性加点",
    `强化成功：${statNames[statName]}`,
    `你消耗 1 点成长点，提升了【${statNames[statName]}】。`,
    `当前【${statNames[statName]}】已经变成 ${gameState.stats[statName]}。`,
    "success",
    "危险率：不变"
  );

  checkToolUnlocks();
  updateDisplay();
}

function visitArea(areaName) {
  if (gameState.gameEnded) {
    addLog("游戏已经结束。请点击重新开始，开启新的职高婴儿命运。");
    return;
  }

  if (!areaEvents[areaName]) {
    addLog("未知区域。你在校园边界处短暂迷失。");
    return;
  }

  gameState.visitedAreas[areaName]++;

  const randomState = getRandomMapState();
  const deathChance = calculateDeathChance(areaName, randomState);
  const deathRoll = Math.random();

  if (deathRoll < deathChance) {
    triggerDeathEnding(areaName, randomState, deathChance);
    return;
  }

  const events = areaEvents[areaName];
  const randomIndex = Math.floor(Math.random() * events.length);
  const event = events[randomIndex];

  const statValue = gameState.stats[event.stat];
  const toolBonus = calculateToolBonus(event.stat);
  const randomBonus = Math.floor(Math.random() * 3);
  const randomPowerBonus = calculateRandomPowerBonus();

  let finalDifficulty = event.difficulty + randomState.difficultyChange;

  if (finalDifficulty < 1) {
    finalDifficulty = 1;
  }

  const finalPower = statValue + toolBonus + randomBonus + randomPowerBonus;

  let logText = "";
  logText += `【进入区域：${mapNames[areaName]}】\n`;
  logText += `随机校园状态：${randomState.name}\n`;
  logText += `${randomState.description}\n`;
  logText += `本次死亡率：${formatPercent(deathChance)}\n\n`;
  logText += `【${event.title}】\n`;
  logText += `${event.description}\n`;
  logText += `判定属性：${statNames[event.stat]}\n`;
  logText += `基础属性：${statValue}\n`;
  logText += `工具加成：${toolBonus}\n`;
  logText += `随机发挥：${randomBonus}\n`;
  logText += `特殊加成：${randomPowerBonus}\n`;
  logText += `最终判定值：${finalPower}\n`;
  logText += `最终难度：${finalDifficulty}\n`;

  if (finalPower >= finalDifficulty) {
    let gainedPoints =
      Math.floor(Math.random() * 3) +
      2 +
      randomState.rewardChange +
      calculateRewardBonus();

    let gainedProgress =
      Math.floor(Math.random() * 8) +
      8 +
      randomState.rewardChange +
      calculateProgressBonus();

    if (gainedPoints < 1) {
      gainedPoints = 1;
    }

    if (gainedProgress < 3) {
      gainedProgress = 3;
    }

    gameState.growthPoints += gainedPoints;
    gameState.progress += gainedProgress;

    if (gameState.progress > 100) {
      gameState.progress = 100;
    }

    const resultText =
      `成功！${event.success}\n` +
      `获得成长点 +${gainedPoints}，通关进度 +${gainedProgress}。`;

    logText += `\n${resultText}`;

    showCurrentEvent(
      mapNames[areaName],
      event.title,
      event.description,
      resultText,
      "success",
      `危险率：${formatPercent(deathChance)}`
    );
  } else {
    const consolationPoint = Math.random() < 0.35 ? 1 : 0;
    const progressLoss = Math.random() < 0.35 ? 3 : 0;

    if (consolationPoint > 0) {
      gameState.growthPoints += consolationPoint;
    }

    if (progressLoss > 0) {
      gameState.progress -= progressLoss;

      if (gameState.progress < 0) {
        gameState.progress = 0;
      }
    }

    let resultText = `失败。${event.fail}\n`;

    if (consolationPoint > 0) {
      resultText += `虽然失败了，但你从挫折中学习，获得成长点 +1。\n`;
    } else {
      resultText += `没有获得奖励，但你记住了这次经验。\n`;
    }

    if (progressLoss > 0) {
      resultText += `通关进度 -${progressLoss}。`;
    }

    logText += `\n${resultText}`;

    showCurrentEvent(
      mapNames[areaName],
      event.title,
      event.description,
      resultText,
      "danger",
      `危险率：${formatPercent(deathChance)}`
    );
  }

  addLog(logText);

  checkToolUnlocks();
  checkEnding();
  updateDisplay();
}

function getRandomMapState() {
  const randomIndex = Math.floor(Math.random() * mapRandomStates.length);
  return mapRandomStates[randomIndex];
}

function calculateDeathChance(areaName, randomState) {
  const deathEvent = areaDeathEvents[areaName];
  let chance = deathEvent.baseDeathChance + randomState.deathChange;

  chance -= calculateDeathReduction(areaName);

  if (gameState.progress >= 75) {
    chance += 0.04;
  }

  if (gameState.visitedAreas[areaName] >= 4) {
    chance += 0.03;
  }

  if (chance < 0.08) {
    chance = 0.08;
  }

  if (chance > 0.45) {
    chance = 0.45;
  }

  return chance;
}

function triggerDeathEnding(areaName, randomState, deathChance) {
  const deathEvent = areaDeathEvents[areaName];

  gameState.gameEnded = true;
  gameState.deathCount++;

  const endingPanel = document.getElementById("endingPanel");
  const endingText = document.getElementById("endingText");

  endingPanel.classList.add("death-ending");
  endingPanel.style.display = "block";

  endingText.innerHTML =
    `${deathEvent.title}<br><br>` +
    `${deathEvent.description}<br><br>` +
    `${deathEvent.ending.replace(/\n/g, "<br>")}<br><br>` +
    `触发地点：${mapNames[areaName]}<br>` +
    `随机校园状态：${randomState.name}<br>` +
    `本次死亡率：${formatPercent(deathChance)}<br><br>` +
    "本轮游戏已结束。点击“重新开始”可以重新出生。";

  const resultText =
    `${deathEvent.description}\n\n` +
    `${deathEvent.ending}\n\n` +
    "游戏结束。";

  showCurrentEvent(
    mapNames[areaName],
    deathEvent.title,
    `随机校园状态：${randomState.name}。${randomState.description}`,
    resultText,
    "death",
    `危险率：${formatPercent(deathChance)}`
  );

  const logText =
    `【${deathEvent.title}】\n` +
    `你进入了${mapNames[areaName]}。\n` +
    `随机校园状态：${randomState.name}\n` +
    `${randomState.description}\n` +
    `本次死亡率：${formatPercent(deathChance)}\n\n` +
    `${deathEvent.description}\n\n` +
    `${deathEvent.ending}\n\n` +
    "游戏结束。";

  addLog(logText);
  updateDisplay();
}

function calculateToolBonus(statName) {
  let bonus = 0;

  for (let i = 0; i < gameState.tools.length; i++) {
    const toolName = gameState.tools[i];
    const tool = getToolByName(toolName);

    if (tool && tool.statBonus && tool.statBonus[statName]) {
      bonus += tool.statBonus[statName];
    }
  }

  return bonus;
}

function calculateDeathReduction(areaName) {
  let reduction = 0;

  for (let i = 0; i < gameState.tools.length; i++) {
    const toolName = gameState.tools[i];
    const tool = getToolByName(toolName);

    if (tool && tool.deathReduction) {
      if (tool.deathReduction[areaName]) {
        reduction += tool.deathReduction[areaName];
      }

      if (tool.deathReduction.all) {
        reduction += tool.deathReduction.all;
      }
    }
  }

  return reduction;
}

function calculateRewardBonus() {
  let bonus = 0;

  for (let i = 0; i < gameState.tools.length; i++) {
    const tool = getToolByName(gameState.tools[i]);

    if (tool && tool.rewardBonus) {
      bonus += tool.rewardBonus;
    }
  }

  return bonus;
}

function calculateProgressBonus() {
  let bonus = 0;

  for (let i = 0; i < gameState.tools.length; i++) {
    const tool = getToolByName(gameState.tools[i]);

    if (tool && tool.progressBonus) {
      bonus += tool.progressBonus;
    }
  }

  return bonus;
}

function calculateRandomPowerBonus() {
  let bonus = 0;

  for (let i = 0; i < gameState.tools.length; i++) {
    const tool = getToolByName(gameState.tools[i]);

    if (tool && tool.randomPowerBonus) {
      bonus += tool.randomPowerBonus;
    }
  }

  return bonus;
}

function getToolByName(toolName) {
  for (let i = 0; i < toolUnlocks.length; i++) {
    if (toolUnlocks[i].name === toolName) {
      return toolUnlocks[i];
    }
  }

  return null;
}

function checkToolUnlocks() {
  for (let i = 0; i < toolUnlocks.length; i++) {
    const tool = toolUnlocks[i];

    if (!gameState.tools.includes(tool.name) && checkToolCondition(tool)) {
      gameState.tools.push(tool.name);

      const message =
        `工具解锁！【${tool.name}】\n` +
        `${tool.description}\n` +
        `实际效果：${tool.effectText}`;

      addLog(message);

      showCurrentEvent(
        "工具解锁",
        `新工具：${tool.name}`,
        tool.description,
        `实际效果：${tool.effectText}`,
        "success",
        "危险率：部分区域降低"
      );
    }
  }
}

function checkToolCondition(tool) {
  const conditions = tool.conditions;

  if (!conditions) {
    return false;
  }

  if (conditions.brain !== undefined && gameState.stats.brain < conditions.brain) {
    return false;
  }

  if (conditions.feet !== undefined && gameState.stats.feet < conditions.feet) {
    return false;
  }

  if (conditions.speech !== undefined && gameState.stats.speech < conditions.speech) {
    return false;
  }

  if (conditions.bite !== undefined && gameState.stats.bite < conditions.bite) {
    return false;
  }

  if (conditions.hands !== undefined && gameState.stats.hands < conditions.hands) {
    return false;
  }

  if (conditions.progress !== undefined && gameState.progress < conditions.progress) {
    return false;
  }

  return true;
}

function checkEnding() {
  if (gameState.gameEnded) {
    return;
  }

  const totalStats =
    gameState.stats.brain +
    gameState.stats.feet +
    gameState.stats.speech +
    gameState.stats.bite +
    gameState.stats.hands;

  const hasEnoughProgress = gameState.progress >= 100;
  const hasEnoughStats = totalStats >= 18;
  const hasFinalTool = gameState.tools.includes("摇篮喷射背包");

  if (hasEnoughProgress && hasEnoughStats && hasFinalTool) {
    gameState.gameEnded = true;

    const endingPanel = document.getElementById("endingPanel");
    const endingText = document.getElementById("endingText");

    endingPanel.classList.remove("death-ending");
    endingPanel.style.display = "block";

    endingText.innerHTML =
      "最终挑战完成！<br>" +
      "你从一个出生于职高女厕所的新生婴儿，进化成了职高传说级校园生物。<br>" +
      "你用脑发明工具，用足穿越操场，用文口说服老师，用武口啃开命运，用双手改造未来。<br>" +
      "结局：职高校园进化王！";

    showCurrentEvent(
      "最终通关",
      "职高校园进化王",
      "你完成了全部校园挑战。",
      "你成功通关，成为职业高中里的荒诞传说。",
      "success",
      "危险率：已结束"
    );

    addLog("你已经达成通关条件，解锁最终结局！");
  }
}

function updateDisplay() {
  document.getElementById("growthPoints").textContent = gameState.growthPoints;

  document.getElementById("brainValue").textContent = gameState.stats.brain;
  document.getElementById("feetValue").textContent = gameState.stats.feet;
  document.getElementById("speechValue").textContent = gameState.stats.speech;
  document.getElementById("biteValue").textContent = gameState.stats.bite;
  document.getElementById("handsValue").textContent = gameState.stats.hands;

  updateToolList();

  const progressFill = document.getElementById("progressFill");
  progressFill.style.width = gameState.progress + "%";

  document.getElementById("progressText").textContent =
    "进度：" + gameState.progress + " / 100";

  updateHeroLevel();
}

function updateToolList() {
  const toolList = document.getElementById("toolList");
  toolList.innerHTML = "";

  if (gameState.tools.length === 0) {
    const li = document.createElement("li");
    li.textContent = "暂无工具";
    toolList.appendChild(li);
    return;
  }

  for (let i = 0; i < gameState.tools.length; i++) {
    const tool = getToolByName(gameState.tools[i]);
    const li = document.createElement("li");

    if (tool) {
      li.innerHTML =
        `${tool.name}<span>${tool.effectText}</span>`;
    } else {
      li.textContent = gameState.tools[i];
    }

    toolList.appendChild(li);
  }
}

function updateHeroLevel() {
  const totalStats =
    gameState.stats.brain +
    gameState.stats.feet +
    gameState.stats.speech +
    gameState.stats.bite +
    gameState.stats.hands;

  const heroLevelText = document.getElementById("heroLevelText");
  const storyText = document.getElementById("storyText");

  if (gameState.gameEnded && gameState.deathCount > 0) {
    heroLevelText.textContent = "当前阶段：死亡结局";
    storyText.textContent =
      "你的本轮进化已经终止。职高仍在运转，厕所里的回声还记得你。";
    return;
  }

  if (gameState.gameEnded) {
    heroLevelText.textContent = "当前阶段：职高传说";
    storyText.textContent =
      "你完成了从女厕所出生到校园进化王的荒诞旅程。";
    return;
  }

  if (totalStats < 5) {
    heroLevelText.textContent = "当前阶段：职高女厕所出生体";
    storyText.textContent =
      "你刚从职高女厕所第三个隔间开始人生，走路还不稳，但眼神里已经有了想通关的火光。";
  } else if (totalStats < 10) {
    heroLevelText.textContent = "当前阶段：走廊爬行高手";
    storyText.textContent =
      "你已经能在教室、食堂和宿舍之间熟练移动，老师开始记住你的名字。";
  } else if (totalStats < 18) {
    heroLevelText.textContent = "当前阶段：实训车间小怪才";
    storyText.textContent =
      "你开始理解工具、规则和校园生存技巧，普通学生已经无法阻止你的进化。";
  } else {
    heroLevelText.textContent = "当前阶段：职高幻想进化体";
    storyText.textContent =
      "你已经接近校园传说，只差完成最终通关挑战。";
  }
}

function showCurrentEvent(areaText, title, eventText, resultText, type, dangerText) {
  const box = document.getElementById("currentEventBox");
  const currentAreaText = document.getElementById("currentAreaText");
  const currentEventTitle = document.getElementById("currentEventTitle");
  const currentEventText = document.getElementById("currentEventText");
  const currentResultText = document.getElementById("currentResultText");
  const dangerTextElement = document.getElementById("dangerText");

  box.classList.remove("success", "danger", "death");

  if (type) {
    box.classList.add(type);
  }

  currentAreaText.textContent = areaText;
  currentEventTitle.textContent = title;
  currentEventText.textContent = eventText;
  currentResultText.textContent = resultText;
  dangerTextElement.textContent = dangerText;
}

function addLog(message) {
  const eventLog = document.getElementById("eventLog");

  const now = new Date();
  const timeText =
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0") +
    ":" +
    String(now.getSeconds()).padStart(2, "0");

  eventLog.textContent =
    `[${timeText}] ${message}\n\n` + eventLog.textContent;
}

function formatPercent(number) {
  return Math.round(number * 100) + "%";
}

function resetGame() {
  gameState = {
    growthPoints: 5,
    stats: {
      brain: 0,
      feet: 0,
      speech: 0,
      bite: 0,
      hands: 0
    },
    tools: [],
    progress: 0,
    gameEnded: false,
    deathCount: 0,
    visitedAreas: {
      classroom: 0,
      canteen: 0,
      playground: 0,
      workshop: 0,
      dorm: 0
    }
  };

  const endingPanel = document.getElementById("endingPanel");
  endingPanel.style.display = "none";
  endingPanel.classList.remove("death-ending");

  document.getElementById("endingText").textContent = "";
  document.getElementById("eventLog").textContent = openingText;

  showCurrentEvent(
    "出生地：职高女厕所",
    "开场事件：女厕所出生",
    "你出生在职业高中女厕所的第三个隔间。门外是上课铃，门内是命运的第一声啼哭。",
    "你获得初始成长点 5。请先加点，或直接进入校园地图冒险。",
    "",
    "危险率：未知"
  );

  updateDisplay();
}

function initGame() {
  document.getElementById("eventLog").textContent = openingText;

  showCurrentEvent(
    "出生地：职高女厕所",
    "开场事件：女厕所出生",
    "你出生在职业高中女厕所的第三个隔间。门外是上课铃，门内是命运的第一声啼哭。",
    "你获得初始成长点 5。请先加点，或直接进入校园地图冒险。",
    "",
    "危险率：未知"
  );

  updateDisplay();
}

initGame();
