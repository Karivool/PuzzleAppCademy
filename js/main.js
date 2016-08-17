const BoardView = require('./pac-view.js');
const Game = require('./game.js');

document.addEventListener("DOMContentLoaded",
function() {
  const canvasEl =
  document.getElementsByTagName("canvas")[0];
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new BoardView(game, ctx);
});

// $( () => {
//   let newGame = new Game();
//   const $pac = $('#pac');
//   new BoardView(newGame, $pac);
// });
