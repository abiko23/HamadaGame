// キーボードの入力状態を記録する配列の定義
var input_key_buffer = new Array();

// キーボードの入力イベントをトリガーに配列のフラグ値を更新させる
window.addEventListener("keydown", handleKeydown);
function handleKeydown(e) {
  e.preventDefault();
  input_key_buffer[e.keyCode] = true;
}

window.addEventListener("keyup", handleKeyup);
function handleKeyup(e) {
  e.preventDefault();
  input_key_buffer[e.keyCode] = false;
}

// canvas要素の取得
const canvas = document.getElementById("maincanvas");
const ctx = canvas.getContext("2d");

// 画像を表示するの座標の定義 & 初期化
var x = 0;
var y = 300;

// 上下方向の速度
var vy = 0;
// ジャンプしたか否かのフラグ値
var isJump = false;

// ブロック要素の定義
var blocks = [
  { x: 0, y: 400, w: 200, h: 32 },
  { x: 350, y: 400, w: 200, h: 32 },
  { x: 700, y: 400, w: 530, h: 32 }
];

// ロード時に画面描画の処理が実行されるようにする
window.addEventListener("load", update);

// 画面を更新する関数を定義 (繰り返しここの処理が実行される)
function update() {
  // 画面全体をクリア
  ctx.clearRect(0, 0, 9999, 9999);

  var updatedX = x;
  var updatedY = y;

  // 入力値の確認と反映
  if (input_key_buffer[37]) {
    // 左が押されていればx座標を1減らす
    updatedX = x - 2;
  }
  if (input_key_buffer[38]) {
    // 上が押されていれば、上向きの初期速度を与え、ジャンプ中のフラグを立てる
    vy = -7;
    isJump = true;
    
  }
  if (input_key_buffer[39]) {
    // 右が押されていればx座標を1増やす
    updatedX = x + 2;
  }

  // ジャンプ中である場合のみ落下するように調整する
  if (isJump) {
    // 上下方向は速度分をたす
    updatedY = y + vy;
    // 落下速度はだんだん大きくなる
    vy = vy + 0.5;
    // 主人公の画像下部が地面の上部より下となったタイミングでブロックの上にいるか否かの判定をする
    if (y + 32 < 332 && updatedY + 32 >= 332) {
      // 全てのブロックに対して繰り返し処理をする
      for (const block of blocks) {
        if (
          (x + 80 < block.x || x >= block.x + block.w) &&
          (updatedX + 80 < block.x || updatedX >= block.x + block.w)
        ) {
          // ブロックの上にいない場合には何もしない
          continue;
        }
        // ブロックの上にいる場合にはジャンプ解除し、y座標をブロックの上にいるように見える位置にする
        updatedY = 300 + 100 - 100;
        isJump = false;
        break;
      }
    }
  } else {
    // いづれかのブロックの上にいるかをチェックする
    var isOnBlock = false;
    for (const block of blocks) {
      if (
        (x + 32 < block.x || x >= block.x + block.w) &&
        (updatedX + 32 < block.x || updatedX >= block.x + block.w)
      ) {
        // ブロックの上にいない場合には何もしない
        continue;
      }
      // ブロックの上にいる場合にはフラグを立てる
      isOnBlock = true;
      break;
    }
    // ブロックの上にいなければジャンプ中の扱いとして初期速度0で落下するようにする
    if (!isOnBlock) {
      isJump = true;
      vy = 0;
    }
  }

  x = updatedX;
  y = updatedY;

  // 主人公の画像を表示
  var image = new Image();
  image.src = "./images/charactor_01/ghamada.png";
  ctx.drawImage(image, x, y, 80, 100);

  var groundImage = new Image();
  groundImage.src = "./images/ground_01/base.png";
  for (const block of blocks) {
    ctx.drawImage(groundImage, block.x, block.y, block.w, block.h);
  }

  // 再描画
  window.requestAnimationFrame(update);
}