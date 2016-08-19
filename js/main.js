const BoardView = require('./pac-view.js');
const Game = require('./game.js');

document.addEventListener("DOMContentLoaded",
function() {
  const canvas =
  document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  const game = new Game();
  const board = new BoardView(game, ctx);
});
