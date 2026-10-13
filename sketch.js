// 儲存目前的遊戲狀態 ('start'：開始畫面, 'playing'：答題中, 'result'：結算畫面)
let gameState = 'start';

// 儲存目前作答到第幾題 (從 0 開始，共 4 題)
let currentQuestionIndex = 0;

// 儲存玩家目前的得分
let score = 0;

// 儲存使用者輸入的文字框物件
let inputField;
// 儲存送出答案按鈕物件
let submitButton;
// 儲存重新開始按鈕物件
let restartButton;

// 定義 4 道問答題的題目與正確答案
let questions = [
  { question: "第一題：3 + 2 = ?", answer: "5" },
  { question: "第二題：15 + 20 = ?", answer: "35" },
  { question: "第三題：9 * 8 - 8 = ?", answer: "64" },
  { question: "第四題：9 * 8 - 5 * 2 + 3 - 4 = ?", answer: "61" }
];

function setup() {
  // 建立填滿整個瀏覽器視窗的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 設定文字對齊方式為置中
  textAlign(CENTER, CENTER);
  
  // 建立輸入答案用的文字輸入框
  inputField = createInput('');
  inputField.size(200, 40);
  inputField.style('font-size', '20px');
  inputField.style('text-align', 'center');
  inputField.hide();
  
  // 建立送出答案的按鈕
  submitButton = createButton('送出答案');
  submitButton.size(120, 45);
  submitButton.style('font-size', '18px');
  submitButton.style('cursor', 'pointer');
  // 當按鈕被點擊時，執行 checkAnswer 函式來檢查答案
  submitButton.mousePressed(checkAnswer);
  submitButton.hide();
  
  // 建立結算畫面的「重新挑戰」按鈕
  restartButton = createButton('重新挑戰');
  restartButton.size(150, 50);
  restartButton.style('font-size', '20px');
  restartButton.style('cursor', 'pointer');
  restartButton.style('background-color', '#2ecc71');
  restartButton.style('color', 'white');
  restartButton.style('border', 'none');
  restartButton.style('border-radius', '8px');
  // 當點擊重新開始按鈕時，重置遊戲並回到開始畫面
  restartButton.mousePressed(restartGame);
  restartButton.hide();
}

function draw() {
  // 設定畫布背景顏色 (柔和的淺藍灰色)
  background(240, 244, 248);
  
  // 根據目前的遊戲狀態決定要繪製哪一個畫面
  if (gameState === 'start') {
    drawStartScreen();
  } else if (gameState === 'playing') {
    drawQuizScreen();
  } else if (gameState === 'result') {
    drawResultScreen();
  }
}

// 繪製遊戲開始畫面
function drawStartScreen() {
  // 確保在開始畫面時隱藏所有作答與結算介面
  if (inputField) inputField.hide();
  if (submitButton) submitButton.hide();
  if (restartButton) restartButton.hide();
  
  // 繪製遊戲主標題
  fill(33, 37, 41);
  textSize(48);
  text("數學小達人挑戰賽", width / 2, height / 2 - 80);
  
  // 繪製遊戲規則說明
  textSize(22);
  fill(100, 110, 120);
  text("本測驗共有 4 道題目，答對一題得 25 分！", width / 2, height / 2 - 20);
  
  // 繪製開始按鈕外框
  fill(52, 152, 219);
  noStroke();
  rectMode(CENTER);
  rect(width / 2, height / 2 + 60, 220, 55, 10);
  
  // 繪製開始提示文字
  fill(255);
  textSize(24);
  text("點擊畫面開始", width / 2, height / 2 + 60);
}

// 繪製答題中畫面
function drawQuizScreen() {
  // 隱藏重新開始按鈕
  if (restartButton) restartButton.hide();
  
  // 顯示輸入框並定位在畫面正中央偏下方
  if (inputField) {
    inputField.show();
    inputField.position(width / 2 - 100, height / 2 + 30);
  }
  
  // 顯示送出按鈕並定位在輸入框下方
  if (submitButton) {
    submitButton.show();
    submitButton.position(width / 2 - 60, height / 2 + 95);
  }
  
  // 顯示目前的題目進度
  fill(100, 110, 120);
  textSize(20);
  text(`第 ${currentQuestionIndex + 1} 題 / 共 4 題`, width / 2, height / 2 - 100);
  
  // 顯示當前的數學題目
  fill(33, 37, 41);
  textSize(36);
  text(questions[currentQuestionIndex].question, width / 2, height / 2 - 40);
}

// 繪製結算畫面
function drawResultScreen() {
  // 進入結算畫面時隱藏答題輸入介面
  if (inputField) inputField.hide();
  if (submitButton) submitButton.hide();
  
  // 顯示專屬的重新開始按鈕
  if (restartButton) {
    restartButton.show();
    restartButton.position(width / 2 - 75, height / 2 + 100);
  }
  
  // 顯示結算標題
  fill(33, 37, 41);
  textSize(42);
  text("測驗結束！", width / 2, height / 2 - 110);
  
  // 顯示玩家的總得分
  textSize(30);
  fill(41, 128, 185);
  text(`你的總得分：${score} 分`, width / 2, height / 2 - 50);
  
  // 根據不同分數給予對應的回覆評語
  let feedback = "";
  if (score === 100) {
    feedback = "真厲害";
  } else if (score === 75) {
    feedback = "真不錯";
  } else if (score === 50) {
    feedback = "還要再加油喔";
  } else if (score === 25) {
    feedback = "再多加練習吧";
  } else {
    feedback = "你有沒有在念書阿(惱)";
  }
  
  // 顯示對應的評語文字
  textSize(34);
  fill(192, 57, 43);
  text(feedback, width / 2, height / 2 + 20);
}

// 滑鼠點擊事件處理（僅用於開始畫面切換）
function mousePressed() {
  // 只有在「開始畫面」點擊時才進入遊戲，避免結算畫面被滑鼠點擊誤觸
  if (gameState === 'start') {
    resetQuiz();
    gameState = 'playing';
  }
}

// 檢查使用者輸入的答案
function checkAnswer() {
  if (!inputField) return;
  
  // 取得使用者輸入的文字並去除前後空白
  let userAnswer = inputField.value().trim();
  
  // 判斷使用者的答案是否與正確答案相符
  if (userAnswer === questions[currentQuestionIndex].answer) {
    score += 25; // 答對加 25 分
  }
  
  // 清空輸入框內容
  inputField.value('');
  
  // 題數索引加 1
  currentQuestionIndex++;
  
  // 如果已經作答完所有題目，切換至結算畫面
  if (currentQuestionIndex >= questions.length) {
    gameState = 'result';
  }
}

// 重置測驗資料的函式
function resetQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  if (inputField) {
    inputField.value('');
  }
}

// 從結算畫面點擊按鈕重新開始的函式
function restartGame() {
  resetQuiz();
  gameState = 'start';
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}