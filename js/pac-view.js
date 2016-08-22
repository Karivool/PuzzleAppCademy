const OrbObject = require('./orb_object.js');
// const Kinetic = require('../kinetic-v5.1.0.js');

// 356 356 35697 45752 1241
// 356 356 35697 45752 1241

class BoardView {
  constructor(stage, gameBoard, ctx) {
    this.stage = stage;
    this.gameBoard = gameBoard;
    this.ctx = ctx;
    this.orbs = [[], [], [], [], []];
    this.orbCanvases = [];
    this.setupBoard();
    this.renderImages();
    debugger
  }

  renderImages () {

    this.orbData = [].concat.apply([], this.orbs);

    for (let orb = 0; orb < this.orbCanvases.length; orb++) {
      let orbCanvas = this.orbCanvases[orb];
      this.createImage(orbCanvas, this.orbData[orb]);
    }
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
      let orbColor;

      if (orbType === 0) {
          orbType = "orb-fire";
          src = "./img/fire.png";
          orbColor = "#990000";
        } else if (orbType === 1) {
          orbType = "orb-water";
          src = "./img/water.png";
          orbColor = "#112288";
        } else if (orbType === 2) {
          orbType = "orb-wood";
          src = "./img/wood.png";
          orbColor = "#005544";
        } else if (orbType === 3) {
          orbType = "orb-light";
          src = "./img/light.png";
          orbColor = "#776611";
        } else if (orbType === 4) {
          orbType = "orb-dark";
          src = "./img/dark.png";
          orbColor = "#772299";
        } else {
          orbType = "orb-heart";
          src = "./img/heart.png";
          orbColor = "#dd2277";
      }
      let orbject1 = new Kinetic.Circle({
        x: (rowIdx + 0.5) * 100, y: (colIdx + 0.5) * 100,
        width: 65, height: 65,
        fill: orbColor, draggable: true
      });
      // let orbject = new OrbObject({pos: [rowIdx * 100, colIdx * 100], color: orbType, img: src});
      this.orbs[colIdx].push(orbject1);
    }
  }

  doLoad (orbCtx, img, x, y) {
    console.log(`Current orb: ${orbCtx.canvas.id} || Drawing orb: ${img.src}`);
    orbCtx.drawImage(img, x, y);
  }

  createImage(orbCanvas, thisOrb) {
    let canvas = document.getElementById(orbCanvas);
    let orbCtx = canvas.getContext("2d");
    let x = thisOrb.pos[0];
    let y = thisOrb.pos[1];
    let img = new Image();
    let color = thisOrb.color;
    img.src = thisOrb.img;
    img.onload = function () {
      console.log(`Current orb: ${orbCtx.canvas.id} || Drawing orb: ${img.src}`);
      orbCtx.drawImage(img, x, y);
    }.bind(null, orbCtx, img, x, y);
  }

  renderBoard () {

    for (let row = 0; row < this.orbs.length; row++) {
      for (let orb = 0; orb < this.orbs[row].length; orb++) {

        let orbCanvas = document.createElement("canvas");
        orbCanvas.id = `orb${row}${orb}`;
        orbCanvas.width = 100;
        orbCanvas.height = 100;

        let div = document.getElementById("game-play");
        // debugger
        let orbCtx = orbCanvas.getContext("2d");

        var layer = new Kinetic.Layer();

        // add the rectangle to the layer
        layer.add(this.orbs[row][orb]);

        // add the layer to the stage
        this.stage.add(layer);

        // orbCtx.fillStyle = "aliceblue";
        // orbCtx.beginPath();
        // orbCtx.arc(
        //   50, 50, 33, 0, 2 * Math.PI, true
        // );
        // orbCtx.fill();

        // div.appendChild(orbCanvas);

        orbCanvas.addEventListener("mousedown", this.handleMouseDown);
        orbCanvas.addEventListener("mouseup", this.handleMouseUp);
        orbCanvas.addEventListener("mouseout", this.handleMouseOut);
        orbCanvas.addEventListener("mousemove", this.handleMouseMove);

        this.orbCanvases.push(orbCanvas.id);
      }
    }
  }

  handleMouseDown (e) {
    if (e.type == "mousedown") {

      console.log(`Mouse held on ${e.currentTarget.id}`);
    }
    // $(e.currentTarget).css({left:e.pageX, top:e.pageY});
  }

  handleMouseUp (e) {
  }

  handleMouseOut (e) {
  }

  handleMouseMove (e) {
    debugger
  }
}


module.exports = BoardView;
