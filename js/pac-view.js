class BoardView {
  constructor(gameBoard, ctx) {
    this.gameBoard = gameBoard;
    this.ctx = ctx;
    this.orbs = [[], [], [], [], []];
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents () {
    // orb clicked and held by mouse button
    $('.orb').on("click", e => {
      const $orb = $(e.currentTarget);
      this.makeMove($orb);
    });
  }

  setupBoard () {

    for (let colIdx = 0; colIdx < 5; colIdx++) {
      this.addRow(colIdx);
    }
  }

  addRow (colIdx) {
    for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
      let orbType = Math.round(Math.random() * 5);
      let img = new Image();

      if (orbType === 0) {
        orbType = "orb-fire";
        img.src = "img/fire.png";
      } else if (orbType === 1) {
        orbType = "orb-water";
        img.src = "img/water.png";
      } else if (orbType === 2) {
        orbType = "orb-wood";
        img.src = "img/wood.png";
      } else if (orbType === 3) {
        orbType = "orb-light";
        img.src = "img/light.png";
      } else if (orbType === 4) {
        orbType = "orb-dark";
        img.src = "img/dark.png";
      } else {
        orbType = "orb-heart";
        img.src = "img/heart.png";
      }
      this.orbs[colIdx].push(orbType);

      img.onload = function () {
        this.ctx.drawImage(img, (rowIdx * 100), (colIdx * 100));
      }.bind(this);
      console.log(this.orbs);
    }
  }
}

module.exports = BoardView;
