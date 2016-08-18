const OrbObject = require('./orb_object.js');

class BoardView {
  constructor(gameBoard, ctx) {
    this.gameBoard = gameBoard;
    this.ctx = ctx;
    this.orbs = [[], [], [], [], []];
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents () {
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
      let orbject = new OrbObject({pos: [rowIdx * 100, colIdx * 100], color: orbType, img: img.src});
      this.orbs[colIdx].push(orbject);

      img.onload = function () {
        this.ctx.drawImage(img, (rowIdx * 100), (colIdx * 100));
      }.bind(this);
      console.log(this.orbs);
    }
  }

  handleMouseDown (e) {
    console.log(e);
    debugger
  }

  handleMouseUp (e) {
    console.log(e);
    debugger
  }

  handleMouseOut (e) {
    console.log(e);
    debugger
  }

  handleMouseMove (e) {
    console.log(e);
    debugger
  }
}


module.exports = BoardView;
