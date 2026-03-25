const quizData = [
  {
    id: 1,
    question: "タイトルの「7 Days」とは何を意味する？",
    choices: [
      "7日でゲーム終了",
      "7日ごとに季節変化",
      "7日ごとに大規模ゾンビ襲撃",
      "7日ごとにマップ更新"
    ],
    answer: 2
  },
  {
    id: 2,
    question: "7日目の夜に発生する襲撃イベントの名前は？",
    choices: ["Red Moon", "Blood Moon", "Zombie Night", "Dark Moon"],
    answer: 1
  },
  {
    id: 3,
    question: "プレイヤーにクエストを出すNPCの総称は？",
    choices: ["Merchant", "Trader", "Seller", "Shopkeeper"],
    answer: 1
  },
  {
    id: 4,
    question: "ゾンビがプレイヤーを見つける主な要因は？",
    choices: ["明るさと音", "匂い", "武器耐久", "スタミナ"],
    answer: 0
  },
  {
    id: 5,
    question: "木を切る基本ツールはどれ？",
    choices: ["Stone Axe", "Hammer", "Pickaxe", "Hatchet"],
    answer: 0
  },
  {
    id: 6,
    question: "ゾンビがブロックを壊す時のAI傾向は？",
    choices: ["ランダム", "最短ルートを作ろうとする", "硬い場所優先", "光を壊す"],
    answer: 1
  },
  {
    id: 7,
    question: "白衣を着た太ったゾンビの通称は？",
    choices: ["Fat Doctor", "Cop Zombie", "Medic Zombie", "Spitter"],
    answer: 1
  },
  {
    id: 8,
    question: "ゾンビが狂暴化して走る状態は何と呼ばれる？",
    choices: ["Rage", "Sprint", "Ferrel", "Berserk"],
    answer: 2
  },
  {
    id: 9,
    question: "ゲーム開始時のマップの名前は？",
    choices: ["Nevada", "Arizona", "Navezgane", "Wasteland"],
    answer: 2
  },
  {
    id: 10,
    question: "料理や作業レシピを増やす重要アイテムは？",
    choices: ["設計図", "食材", "本 / Magazine", "ツールパーツ"],
    answer: 2
  },
  {
    id: 11,
    question: "遠距離武器で最初に作れるものは？",
    choices: ["Rifle", "Bow", "Crossbow", "Pistol"],
    answer: 1
  },
  {
    id: 12,
    question: "ゾンビ犬の正式名称は？",
    choices: ["Zombie Dog", "Undead Dog", "Infected Dog", "Rabid Dog"],
    answer: 2
  },
  {
    id: 13,
    question: "高放射能エリアに出現する強化ゾンビの色は？",
    choices: ["赤", "白", "緑", "青"],
    answer: 1
  },
  {
    id: 14,
    question: "巨大な鳥型ゾンビの名前は？",
    choices: ["Zombie Eagle", "Vulture", "Raven", "Death Bird"],
    answer: 1
  },
  {
    id: 15,
    question: "採掘時に突然発生する危険イベントは？",
    choices: ["Cave Collapse", "Screamer", "Zombie Horde", "Land Slide"],
    answer: 0
  },
  {
    id: 16,
    question: "基地に大量ゾンビを呼ぶ特殊ゾンビは？",
    choices: ["Shouter", "Screamer", "Caller", "Alarm Zombie"],
    answer: 1
  },
  {
    id: 17,
    question: "α版アップデートで大きく変わった要素の一つは？",
    choices: ["ゾンビ削除", "スキルツリー導入", "武器廃止", "夜消滅"],
    answer: 1
  },
  {
    id: 18,
    question: "最も危険とされるバイオームは？",
    choices: ["Forest", "Snow", "Desert", "Wasteland"],
    answer: 3
  },
  {
    id: 19,
    question: "Blood Moonのゾンビの特徴は？",
    choices: ["ダメージ無効", "永遠にスポーン", "昼まで消えない", "プレイヤーの位置を常に把握"],
    answer: 3
  },
  {
    id: 20,
    question: "プレイヤー死亡時のデフォルト設定に近いものは？",
    choices: ["完全ロスト", "XP減少", "所持品その場ドロップ", "キャラ削除"],
    answer: 2
  }
];

const app = document.getElementById("app");
const submitBtn = document.getElementById("submitBtn");
const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("ticketCanvas");
const ctx = canvas.getContext("2d");

// グループごとの画像と文字位置
const ticketSettings = {
  A: { file: "ticket-A.png", nameX: 161, nameY: 433, scoreX: 1300, scoreY: 112 },
  B: { file: "ticket-B.png", nameX: 161, nameY: 433, scoreX: 1300, scoreY: 112 },
  C: { file: "ticket-C.png", nameX: 161, nameY: 433, scoreX: 1300, scoreY: 112 },
  D: { file: "ticket-D.png", nameX: 161, nameY: 433, scoreX: 1300, scoreY: 112 }
};

let latestTicketData = null;

/**
 * 指定幅に収まるまでフォントサイズを自動で縮小して描画
 */
function drawFittedText(ctx, text, x, y, maxWidth, initialSize, minSize = 20) {
  let fontSize = initialSize;

  while (fontSize > minSize) {
    ctx.font = `bold ${fontSize}px sans-serif`;
    const textWidth = ctx.measureText(text).width;
    if (textWidth <= maxWidth) break;
    fontSize -= 2;
  }

  ctx.fillText(text, x, y);
}

// 問題表示
quizData.forEach((q) => {
  const section = document.createElement("div");
  section.style.marginBottom = "24px";

  const title = document.createElement("h3");
  title.textContent = `Q${q.id}. ${q.question}`;
  section.appendChild(title);

  q.choices.forEach((choice, index) => {
    const label = document.createElement("label");
    label.style.display = "block";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${q.id}`;
    radio.value = index;

    label.appendChild(radio);
    label.append(` ${choice}`);
    section.appendChild(label);
  });

  app.appendChild(section);
});

// 判定
submitBtn.addEventListener("click", () => {
  const playerName = document.getElementById("playerName").value.trim();

  if (!playerName) {
    alert("名前を入力してね");
    return;
  }

  let score = 0;
  const unanswered = [];

  quizData.forEach((q) => {
    const selected = document.querySelector(`input[name="question-${q.id}"]:checked`);

    if (!selected) {
      unanswered.push(q.id);
      return;
    }

    if (Number(selected.value) === q.answer) {
      score++;
    }
  });

  if (unanswered.length > 0) {
    alert(`未回答の問題があります：Q${unanswered.join(", ")}`);
    return;
  }

  let group = "D";

  if (score >= 19) {
    group = "A";
  } else if (score >= 13) {
    group = "B";
  } else if (score >= 7) {
    group = "C";
  }

  latestTicketData = { playerName, score, group };
  generateTicket(playerName, group);
});

function generateTicket(playerName, group) {
  const setting = ticketSettings[group];

  if (!setting) {
    alert(`グループ ${group} の設定がありません`);
    return;
  }

  const ticketImage = new Image();
  ticketImage.src = setting.file;

  ticketImage.onload = () => {
    canvas.width = ticketImage.width;
    canvas.height = ticketImage.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(ticketImage, 0, 0);

    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    // 名前（自動縮小）
    drawFittedText(ctx, playerName, setting.nameX, setting.nameY, 650, 56, 24);

    // スコア
    ctx.textAlign = "center";
    ctx.font = "bold 53px sans-serif";
    ctx.fillText(`${latestTicketData.score} / 20`, setting.scoreX, setting.scoreY);

    canvas.style.display = "block";
    downloadBtn.style.display = "inline-block";
  };

  ticketImage.onerror = () => {
    alert(`画像の読み込みに失敗しました：${setting.file}`);
  };
}

// ダウンロード
downloadBtn.addEventListener("click", () => {
  if (!latestTicketData) {
    alert("先に結果を作成してね");
    return;
  }

  const link = document.createElement("a");
  link.download = `${latestTicketData.playerName}_${latestTicketData.group}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});