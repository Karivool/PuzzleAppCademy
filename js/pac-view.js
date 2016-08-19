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

    this.renderBoard();
  }

  addRow (colIdx) {
    for (let rowIdx = 0; rowIdx < 6; rowIdx++) {
      let orbType = Math.round(Math.random() * 5);
      let src;

      if (orbType === 0) {
          orbType = "orb-fire";
          src = "./img/fire.png";
        } else if (orbType === 1) {
          orbType = "orb-water";
          src = "./img/water.png";
        } else if (orbType === 2) {
          orbType = "orb-wood";
          src = "./img/wood.png";
        } else if (orbType === 3) {
          orbType = "orb-light";
          src = "./img/light.png";
        } else if (orbType === 4) {
          orbType = "orb-dark";
          src = "./img/dark.png";
        } else {
          orbType = "orb-heart";
          src = "./img/heart.png";
      }
      let orbject = new OrbObject({pos: [rowIdx * 100, colIdx * 100], color: orbType, img: src});
      this.orbs[colIdx].push(orbject);
    }
  }

  doLoad (orbCtx, img, x, y) {
    orbCtx.fillStyle = "aliceblue";

    orbCtx.beginPath();
    orbCtx.arc(
      50, 50, 33, 0, 2 * Math.PI, true
    );
    orbCtx.fill();
    orbCtx.drawImage(img, x, y);
  }

  createImage(thisOrb, orbCanvas) {
    let orbCtx = orbCanvas.getContext("2d");
    let x = thisOrb.pos[0];
    let y = thisOrb.pos[1];
    let img = new Image();
    let color = thisOrb.color;
    img.onload = this.doLoad.bind(null, orbCtx, img, x, y);
    img.src = thisOrb.img;
    return img;
  }

  renderBoard () {

    for (let row = 0; row < this.orbs.length; row++) {
      for (let orb = 0; orb < this.orbs[row].length; orb++) {

        let orbCanvas = document.createElement("canvas");
        orbCanvas.id = `orb${row}${orb}`;
        orbCanvas.width = 100;
        orbCanvas.height = 100;

        let div = document.getElementById("game-play");

        this.createImage(this.orbs[row][orb], orbCanvas);

        div.appendChild(orbCanvas);

        orbCanvas.addEventListener("mousedown", this.handleMouseDown);
        orbCanvas.addEventListener("mouseup", this.handleMouseUp);
        orbCanvas.addEventListener("mouseout", this.handleMouseOut);
        orbCanvas.addEventListener("mousemove", this.handleMouseMove);
        // debugger
      }
    }
  }

  handleMouseDown (e) {
    console.log(e);
    debugger
  }

  handleMouseUp (e) {
  }

  handleMouseOut (e) {
  }

  handleMouseMove (e) {
  }
}


module.exports = BoardView;
