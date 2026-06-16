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

const toolUnlocks = [
  {
    name: "奶瓶扳手",
    brainRequired: 3,
    description: "用奶瓶和废旧扳手拼出来的奇怪工具。"
  },
  {
    name: "口水发电机",
    brainRequired: 6,
    description: "通过婴儿口水产生微弱电流的荒诞装置。"
  },
  {
    name: "摇篮喷射背包",
    brainRequired: 9,
    description: "把宿舍摇篮改造成短距离喷射装置。"
  }
];

const mapNames = {
  classroom: "教室",
  canteen: "食堂",
  playground: "操场",
  workshop: "实训车间",
  dorm: "宿舍"
};

const mapRandomStates = [
  {
    name: "普通时段",
    description: "校园暂时保持正常，至少表面上正常。",
    difficultyChange: 0,
    rewardChange: 0
  },
  {
    name: "上课铃暴走",
    description: "刺耳的上课铃让全校陷入轻微混乱，事件难度上升。",
    difficultyChange: 1,
    rewardChange: 1
  },
  {
    name: "午休幻觉",
    description: "你似乎进入了半梦半醒的校园状态，事件难度下降。",
    difficultyChange: -1,
    rewardChange: 0
  },
  {
    name: "班主任巡逻",
    description: "班主任的影子在走廊尽头闪过，成功奖励提高，但失败更尴尬。",
    difficultyChange: 1,
    rewardChange: 2
  },
  {
    name: "职高气运加身",
    description: "你突然感到奶瓶中充满了命运的力量，今天似乎格外顺利。",
    difficultyChange: -1,
    rewardChange: 2
  }
];

const areaDeathEvents = {
  classroom: {
    deathChance: 0.08,
    title: "死亡结局：粉笔灰沉睡",
    description:
      "教室里的粉笔灰突然像白色风暴一样升起。你试图用婴儿肺活量抵抗，但吸入了过量知识粉尘。",
    ending:
      "你倒在第一排课桌旁，黑板上还写着“今天不讲重点”。\n" +
      "你的传说停止在教室。\n" +
      "结局：粉笔灰沉睡。"
  },
  canteen: {
    deathChance: 0.08,
    title: "死亡结局：食堂钢勺镇压",
    description:
      "食堂阿姨挥舞着巨大的打饭勺，试图维持午餐秩序。你被一勺土豆泥精准封印。",
    ending:
      "你被埋进土豆泥小山之中，只露出半个奶嘴。\n" +
      "从此食堂多了一道传说级隐藏菜。\n" +
      "结局：食堂钢勺镇压。"
  },
  playground: {
    deathChance: 0.08,
    title: "死亡结局：塑胶跑道蒸发",
    description:
      "操场温度突然升高，塑胶跑道散发出诡异热浪。你的爬行速度太快，和地面摩擦出了命运火花。",
    ending:
      "你在百米跑道上划出一道婴儿形状的残影。\n" +
      "体育老师记录下了这个无法解释的瞬间。\n" +
      "结局：塑胶跑道蒸发。"
  },
  workshop: {
    deathChance: 0.08,
    title: "死亡结局：实训零件吞噬",
    description:
      "实训车间的零件箱突然发生共鸣，无数螺丝、扳手和齿轮围着你旋转。",
    ending:
      "你被卷入一场荒诞的机械组装仪式。\n" +
      "最终，你成为了一台会哭的半自动婴儿扳手机。\n" +
      "结局：实训零件吞噬。"
  },
  dorm: {
    deathChance: 0.08,
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
      difficulty: 2,
      success: "你用含糊但真诚的婴儿语言打动了全班，获得成长点。",
      fail: "你只发出了“咿呀咿呀”的声音，全班陷入沉默。"
    },
    {
      title: "粉笔机械谜题",
      description: "讲台上的粉笔盒突然变成了机关盒。",
      stat: "brain",
      difficulty: 3,
      success: "你看穿机关结构，成功拆开粉笔盒，灵感大增。",
      fail: "你把粉笔当成磨牙棒啃了半节。"
    },
    {
      title: "课桌迷宫",
      description: "教室课桌被排成了复杂迷宫。",
      stat: "feet",
      difficulty: 2,
      success: "你用惊人的爬行路线穿过课桌迷宫。",
      fail: "你在第二排和第三排之间迷路了。"
    },
    {
      title: "同桌橡皮谈判",
      description: "同桌的橡皮滚到了你的奶瓶旁，他怀疑你私藏了学习资源。",
      stat: "speech",
      difficulty: 3,
      success: "你用文口解释清楚，并顺便建立了婴儿外交关系。",
      fail: "你越解释越像在挑衅，同桌收走了你的半张草稿纸。"
    }
  ],

  canteen: [
    {
      title: "食堂抢饭大战",
      description: "午饭时间，窗口前出现了汹涌的人潮。",
      stat: "feet",
      difficulty: 3,
      success: "你凭借灵活移动成功冲到窗口，获得成长点。",
      fail: "你被人潮推回了餐盘回收处。"
    },
    {
      title: "钢牙啃馒头",
      description: "今天的馒头像实训车间的零件一样硬。",
      stat: "bite",
      difficulty: 3,
      success: "你用武口咬开馒头，震惊食堂阿姨。",
      fail: "你的牙齿在馒头面前感受到了职业挫折。"
    },
    {
      title: "菜单谈判",
      description: "你试图说服食堂阿姨多给一勺菜。",
      stat: "speech",
      difficulty: 2,
      success: "你的表达充满感染力，阿姨给你加了一勺土豆。",
      fail: "阿姨没听懂，但给了你一个勺子让你自己想办法。"
    },
    {
      title: "餐盘漂移",
      description: "你坐在餐盘上，被食堂地面的油光推向未知方向。",
      stat: "feet",
      difficulty: 4,
      success: "你掌握了餐盘漂移技巧，成功停在汤桶旁边。",
      fail: "你一路滑到教师用餐区，被迫接受注视。"
    }
  ],

  playground: [
    {
      title: "百米爬行赛",
      description: "操场上正在举办奇怪的百米爬行比赛。",
      stat: "feet",
      difficulty: 4,
      success: "你像风一样冲过终点，体育老师开始怀疑人生。",
      fail: "你爬到一半被自己的鞋带绊住，虽然你根本没穿鞋。"
    },
    {
      title: "牙齿拔河",
      description: "高年级学生发起了牙齿拔河挑战。",
      stat: "bite",
      difficulty: 4,
      success: "你用锋利牙齿咬住绳子，赢得全场欢呼。",
      fail: "你刚咬住绳子，就开始怀疑这是不是太荒诞了。"
    },
    {
      title: "广播站演讲",
      description: "校园广播突然让你发表新生感言。",
      stat: "speech",
      difficulty: 3,
      success: "你发表了震撼全校的婴儿宣言。",
      fail: "广播里只传出了响亮的打嗝声。"
    },
    {
      title: "跳远沙坑沉思",
      description: "你滚进跳远沙坑，发现这里像一个适合思考人生的小型荒漠。",
      stat: "brain",
      difficulty: 3,
      success: "你在沙坑中悟出移动路线优化方案。",
      fail: "你把沙子当成了点心，短暂失去方向感。"
    }
  ],

  workshop: [
    {
      title: "实训车间工具改造",
      description: "你发现了一堆废旧工具，似乎可以组装点什么。",
      stat: "brain",
      difficulty: 4,
      success: "你成功改造出一个小型辅助工具，获得大量成长。",
      fail: "你把螺丝刀装在了奶嘴上，暂时没有实际用途。"
    },
    {
      title: "快速拧螺丝",
      description: "老师要求你在一分钟内拧完一排螺丝。",
      stat: "hands",
      difficulty: 3,
      success: "你的双手快得像小型电动马达。",
      fail: "你把螺丝全部拧成了抽象艺术。"
    },
    {
      title: "机械怪柜",
      description: "一个工具柜突然发出怪声，需要你处理。",
      stat: "hands",
      difficulty: 5,
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
      difficulty: 3,
      success: "你用真诚表达让室友们对人生有了新理解。",
      fail: "你讲到一半睡着了，大家给你盖上了小被子。"
    },
    {
      title: "床底寻宝",
      description: "宿舍床底似乎藏着神秘物品。",
      stat: "hands",
      difficulty: 2,
      success: "你从床底摸出一枚闪亮的旧校徽，获得成长点。",
      fail: "你摸到了一只袜子，并开始重新思考人生。"
    },
    {
      title: "熄灯后逃生",
      description: "熄灯后，你需要悄悄去洗手间。",
      stat: "feet",
      difficulty: 2,
      success: "你安静而迅速地完成了夜间行动。",
      fail: "你撞到了脸盆，宿舍瞬间灯火通明。"
    },
    {
      title: "上铺哲学危机",
      description: "你仰望上铺，突然意识到人生就像双层床，别人总在你头顶。",
      stat: "brain",
      difficulty: 3,
      success: "你从床架结构中悟出校园生存哲学。",
      fail: "你思考过度，短暂忘记自己为什么在这里。"
    }
  ]
};

const statNames = {
  brain: "脑",
  feet: "足",
  speech: "文口",
  bite: "武口",
  hands: "手"
};

function addStat(statName) {
  if (gameState.gameEnded) {
    addLog("游戏已经结束，请点击重新开始。");
    return;
  }

  if (gameState.growthPoints <= 0) {
    addLog("成长点数不足。去校园地图触发事件获得更多成长点吧。");
    return;
  }

  gameState.stats[statName]++;
  gameState.growthPoints--;

  addLog(`你给【${statNames[statName]}】增加了 1 点。`);

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
  const deathEvent = areaDeathEvents[areaName];

  let deathChance = deathEvent.deathChance;

  if (randomState.name === "上课铃暴走") {
    deathChance += 0.02;
  }

  if (randomState.name === "职高气运加身") {
    deathChance -= 0.03;
  }

  if (deathChance < 0.02) {
    deathChance = 0.02;
  }

  const deathRoll = Math.random();

  if (deathRoll < deathChance) {
    triggerDeathEnding(areaName, randomState);
    return;
  }

  const events = areaEvents[areaName];
  const randomIndex = Math.floor(Math.random() * events.length);
  const event = events[randomIndex];

  const statValue = gameState.stats[event.stat];
  const toolBonus = calculateToolBonus(event.stat);
  const randomBonus = Math.floor(Math.random() * 3);

  let finalDifficulty = event.difficulty + randomState.difficultyChange;

  if (finalDifficulty < 1) {
    finalDifficulty = 1;
  }

  const finalPower = statValue + toolBonus + randomBonus;

  let logText = "";
  logText += `【进入区域：${mapNames[areaName]}】\n`;
  logText += `随机校园状态：${randomState.name}\n`;
  logText += `${randomState.description}\n\n`;
  logText += `【${event.title}】\n`;
  logText += `${event.description}\n`;
  logText += `判定属性：${statNames[event.stat]}\n`;
  logText += `你的属性值：${statValue}\n`;
  logText += `工具加成：${toolBonus}\n`;
  logText += `随机发挥：${randomBonus}\n`;
  logText += `最终难度：${finalDifficulty}\n`;

  if (finalPower >= finalDifficulty) {
    let gainedPoints = Math.floor(Math.random() * 3) + 2 + randomState.rewardChange;
    let gainedProgress = Math.floor(Math.random() * 8) + 8 + randomState.rewardChange;

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

    logText += `\n成功！${event.success}\n`;
    logText += `获得成长点 +${gainedPoints}，通关进度 +${gainedProgress}。`;
  } else {
    const consolationPoint = Math.random() < 0.35 ? 1 : 0;

    if (consolationPoint > 0) {
      gameState.growthPoints += consolationPoint;
    }

    const progressLoss = Math.random() < 0.25 ? 2 : 0;

    if (progressLoss > 0) {
      gameState.progress -= progressLoss;

      if (gameState.progress < 0) {
        gameState.progress = 0;
      }
    }

    logText += `\n失败。${event.fail}\n`;

    if (consolationPoint > 0) {
      logText += `虽然失败了，但你从挫折中学习，获得成长点 +1。\n`;
    } else {
      logText += `没有获得奖励，但你记住了这次经验。\n`;
    }

    if (progressLoss > 0) {
      logText += `通关进度 -${progressLoss}。`;
    }
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

function triggerDeathEnding(areaName, randomState) {
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
    `当时校园状态：${randomState.name}<br><br>` +
    "本轮游戏已结束。点击“重新开始”可以重新出生。";

  const logText =
    `【${deathEvent.title}】\n` +
    `你进入了${mapNames[areaName]}。\n` +
    `随机校园状态：${randomState.name}\n` +
    `${randomState.description}\n\n` +
    `${deathEvent.description}\n\n` +
    `${deathEvent.ending}\n\n` +
    "游戏结束。";

  addLog(logText);
  updateDisplay();
}

function calculateToolBonus(statName) {
  let bonus = 0;

  if (gameState.tools.includes("奶瓶扳手")) {
    if (statName === "hands" || statName === "brain") {
      bonus += 1;
    }
  }

  if (gameState.tools.includes("口水发电机")) {
    if (statName === "brain" || statName === "speech") {
      bonus += 1;
    }
  }

  if (gameState.tools.includes("摇篮喷射背包")) {
    if (statName === "feet" || statName === "hands") {
      bonus += 2;
    }
  }

  return bonus;
}

function checkToolUnlocks() {
  for (let i = 0; i < toolUnlocks.length; i++) {
    const tool = toolUnlocks[i];

    if (
      gameState.stats.brain >= tool.brainRequired &&
      !gameState.tools.includes(tool.name)
    ) {
      gameState.tools.push(tool.name);
      addLog(`工具解锁！【${tool.name}】：${tool.description}`);
    }
  }
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

  const toolList = document.getElementById("toolList");
  toolList.innerHTML = "";

  if (gameState.tools.length === 0) {
    const li = document.createElement("li");
    li.textContent = "暂无工具";
    toolList.appendChild(li);
  } else {
    for (let i = 0; i < gameState.tools.length; i++) {
      const li = document.createElement("li");
      li.textContent = gameState.tools[i];
      toolList.appendChild(li);
    }
  }

  const progressFill = document.getElementById("progressFill");
  progressFill.style.width = gameState.progress + "%";

  document.getElementById("progressText").textContent =
    "进度：" + gameState.progress + " / 100";

  updateHeroLevel();
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

  updateDisplay();
}

function initGame() {
  document.getElementById("eventLog").textContent = openingText;
  updateDisplay();
}

initGame();
