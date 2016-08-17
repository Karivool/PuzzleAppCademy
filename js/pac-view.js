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

BoardView.prototype.setupBoard = function () {
  for (let i = 0; i < 5; i++) {
    this.addRow();
  }
};
BoardView.prototype.addRow = function() {
  const rowIdx = this.$el.find(".row").length;
  const $row = $("<ul>").addClass("row").addClass("group");

  for (let colIdx = 0; colIdx < 6; colIdx++) {

    let orbType = Math.round(Math.random() * 5);

    if (orbType === 0) {
      orbType = "orb-fire";
    } else if (orbType === 1) {
      orbType = "orb-water";
    } else if (orbType === 2) {
      orbType = "orb-wood";
    } else if (orbType === 3) {
      orbType = "orb-light";
    } else if (orbType === 4) {
      orbType = "orb-dark";
    } else {
      orbType = "orb-heart";
    }
    const $orb = $("<li>").addClass(orbType).attr("data-pos", [rowIdx, colIdx]);

    $row.append($orb);
  }
  this.$el.append($row);
};

module.exports = BoardView;
