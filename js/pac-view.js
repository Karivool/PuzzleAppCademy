class BoardView {
  constructor(gameBoard, ctx) {
    this.gameBoard = gameBoard;
    this.ctx = ctx;
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

    for (let i = 0; i < 6; i++) {
      this.addRow(i);
    }
  }

  addRow (i) {
    for (let colIdx = 0; colIdx < 5; colIdx++) {
      let orbType = Math.round(Math.random() * 8);
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
      } else if (orbType === 5) {
        orbType = "orb-heart";
        img.src = "img/heart.png";
      } else if (orbType === 6) {
        orbType = "orb-poison";
        img.src = "img/poison.png";
      } else if (orbType === 7) {
        orbType = "orb-jammer";
        img.src = "img/jammer.png";
      } else {
        orbType = "orb-mortal";
        img.src = "img/mortal.png";
      }
      img.onload = function () {
        this.ctx.drawImage(img, (i * 100), (colIdx * 100));
      }.bind(this);
    }
  }
}

module.exports = BoardView;
