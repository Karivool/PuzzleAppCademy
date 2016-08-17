const BoardView = require('./pac-view.js');
const Game = require('./game.js');

$( () => {
  let newGame = new Game();
  const $pac = $('#pac');
  new BoardView(newGame, $pac);
});
