let BoardView = function (gameBoard, $el) {
  this.gameBoard = gameBoard;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};

BoardView.prototype.bindEvents = function () {
  // orb clicked and held by mouse button
  $('.orb').on("click", e => {
    const $orb = $(e.currentTarget);
    this.makeMove($orb);
  });
};

BoardView.prototype.makeMove = function ($orb) {
  
};
