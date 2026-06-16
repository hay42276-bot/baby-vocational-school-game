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
  gameEnded: false
};

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
    addLog("游戏已经通关，请点击重新开始。");
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
    addLog("你已经完成最终挑战。可以重新开始体验不同成长路线。");
    return;
  }

  const events = areaEvents[areaName];
  const randomIndex = Math.floor(Math.random() * events.length);
  const event = events[randomIndex];

  const statValue = gameState.stats[event.stat];
  const toolBonus = calculateToolBonus(event.stat);
  const randomBonus = Math.floor(Math.random() * 3);
  const finalPower = statValue + toolBonus + randomBonus;

  let logText = "";
  logText += `【${event.title}】\n`;
  logText += `${event.description}\n`;
  logText += `判定属性：${statNames[event.stat]}，你的属性值：${statValue}，工具加成：${toolBonus}，随机发挥：${randomBonus}。\n`;

  if (finalPower >= event.difficulty) {
    const gainedPoints = Math.floor(Math.random() * 3) + 2;
    const gainedProgress = Math.floor(Math.random() * 8) + 8;

    gameState.growthPoints += gainedPoints;
    gameState.progress += gainedProgress;

    if (gameState.progress > 100) {
      gameState.progress = 100;
    }

    logText += `成功！${event.success}\n`;
    logText += `获得成长点 +${gainedPoints}，通关进度 +${gainedProgress}。`;
  } else {
    const consolationPoint = Math.random() < 0.35 ? 1 : 0;

    if (consolationPoint > 0) {
      gameState.growthPoints += consolationPoint;
    }

    logText += `失败。${event.fail}\n`;

    if (consolationPoint > 0) {
      logText += `虽然失败了，但你从挫折中学习，获得成长点 +1。`;
    } else {
      logText += `没有获得奖励，但你记住了这次经验。`;
    }
  }

  addLog(logText);

  checkToolUnlocks();
  checkEnding();
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

    endingPanel.style.display = "block";

    endingText.innerHTML =
      "最终挑战完成！<br>" +
      "你从一个荒诞的新生婴儿，进化成了职高传说级校园生物。<br>" +
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

  if (totalStats < 5) {
    heroLevelText.textContent = "当前阶段：职高新生婴儿";
    storyText.textContent =
      "你刚进入校园，走路还不稳，但眼神里已经有了想通关的火光。";
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
    gameEnded: false
  };

  document.getElementById("eventLog").textContent =
    "欢迎来到职高。你的婴儿进化之路开始了。";

  document.getElementById("endingPanel").style.display = "none";
  document.getElementById("endingText").textContent = "";

  updateDisplay();
}

updateDisplay();
