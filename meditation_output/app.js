"use strict"
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid_container video");

const sounds = document.querySelectorAll(".sound-picker button")

const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();

const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

//サークルの青線の長さを変える
//点線としてびょうがする。偶数版と奇数版を両方入れるイメージ
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

//仮の長さ（100%）をfakeduration で定義して、時間換算で長さを分単位で割り切れるようにする。
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60
)}`;

//再生、停止システム・・・・・・・・・・・・・・・・・
//再生、停止を変更する機能
const checkPlaying = song => {
    if (song.paused) {
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
    } else {
        song.pause();
        video.pause();
        play.src = "./svg/play.svg";
    }
};
//ボタンで再生、停止
play.addEventListener("click", function () {
    checkPlaying(song);
});
// リスタート機能
const restartSong = song => {
    let currentTime = song.currentTime;
    song.currentTime = 0;
}
// ボタンでリスタート
replay.addEventListener("click", function () {
    restartSong(song);
});



// 音と背景を変更する・・・・・・・・・・・・・・・・・・・・
// sounds で押したボタンを確認
sounds.forEach(sound => {
    sound.addEventListener("click", function () {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        checkPlaying(song);
    });
});



// 時間変更
//fakeduration の中身を書き換えて長さを変更
timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  song.ontimeupdate = function() {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
  
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };