window.onload = function () {
  let timer = document.getElementById('timer');
  let secondsSpan = timer.querySelector('.seconds');
  secondsSpan.innerHTML = (120);
}

function beginGame() {
  if (!window.gameStarted) {
    window.gameStarted = true;
    let countdown = 121;
    gameStart('timer', countdown);
  }
}

function gameStart(id, countdown) {
  this.countdown = countdown;
  let timer = document.getElementById(id);
  let secondsSpan = timer.querySelector('.seconds');

  function updateClock() {
    if (!window.gameEnd){
      countdown -= 1;
      secondsSpan.innerHTML = (countdown);
      if (countdown <= 0) {
        window.gameEnd = true;
        document.getElementById("game-over").style.visibility = "visible"
        document.getElementById("reset-butt-game-over").style.visibility = "visible"
      }
    }
  }
  if (!window.gameEnd){
    updateClock();
    let timing = setInterval(updateClock, 1000);
  }
}

function resetGame() {
  let score = document.getElementById('score');
  let scoreSpan = score.querySelector('.score');
  scoreSpan.innerHTML = 0;

  let timer = document.getElementById('timer');
  let secondsSpan = timer.querySelector('.seconds');
  secondsSpan.innerHTML = (120);

  window.gameStarted = false;
  window.gameEnd = false;
}

function muteSound () {
  window.mute = !window.mute;
  if (window.mute === true) {
    window.song.volume = 0;
  } else {
    window.song.volume = 0.5;
  }
};
