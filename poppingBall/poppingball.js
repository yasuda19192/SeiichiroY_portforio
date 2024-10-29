
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// getcontext:::二次元描画のキャンパスを作る
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// ランダム関数
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// ボールの色（ランダム）

function randomCol() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
}

// ボールクラス
class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        // 速さ
        this.velX = velX;
        this.velY = velY;

        this.color = color;
        this.size = size;
    }
    // ボールの描画
    draw() {
        // 描くよー
        ctx.beginPath();
        // 色はこれだよー
        ctx.fillStyle = this.color;
        // 円をえがくよー
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        // 円の中をfillstyleの色で塗りつぶして
        ctx.fill()
    }
    // 更新
    //端に到達した際に跳ね返るように中身を更新する。
    update() {
        // 各座標が画面外に到達した際に動きの向き（vel）の数値を逆にする
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }
        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }
        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }
        this.x += this.velX;
        this.y += this.velY;
    }

}
//　ボール作成
const balls = [];
while (balls.length < 25) {
    const size = random(20, 30);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, width - size),
        random(-7, 7),
        random(-7, 7),
        randomCol(),
        size,
    );
    balls.push(ball);
}


//アニメーションを更新によって行う。いえばフレームレートを設ける。
function loop() {
    // 既存のアニメーションを暗くする。（残像）
    // 既存の２ｄフィールドを暗くすることで、元のボールも暗くする。
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    // フィールドを全体に引き延ばす。
    ctx.fillRect(0, 0, width, height);
    for (const ball of balls) {
        ball.draw();
        ball.update();
    }
    requestAnimationFrame(loop)
}
loop();