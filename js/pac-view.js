const OrbObject = require('./orb_object.js');

// 356 356 35697 45752 1241

class BoardView {
  constructor(stage, gameBoard, ctx) {
    this.stage = stage;
    this.gameBoard = gameBoard;
    this.ctx = ctx;
    this.orbs = [[], [], [], [], []];
    this.orbCanvases = {};
    this.moving = false;
    this.setupBoard();
    window.orbs = this.orbCanvases;
    this.renderImages();
    window.stage = this.stage;
    window.orbMove = new Audio('coin5.mp3');
    window.movedOrbs = [];
    window.clicked = false;
    window.orbArray = this.orbs;
    window.findMatches = this.findMatches;
    window.matchOrbs = this.matchOrbs;
    window.dropOrbs = this.dropOrbs;
    window.checkMatch = this.checkMatch;
    window.handleMouseDown = this.handleMouseDown;
    window.handleMouseUp = this.handleMouseUp;
  }

  renderImages () {

    this.orbData = this.orbData = [].concat.apply([], this.orbs);

    for (let orb = 0; orb < this.orbData.length; orb++) {
      this.createImage(this.orbData[orb], orb);
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
          src = "./img/fire-pin.png";
          orbColor = "#990000";
        } else if (orbType === 1) {
          orbType = "orb-water";
          src = "./img/water-pin.png";
          orbColor = "#112288";
        } else if (orbType === 2) {
          orbType = "orb-wood";
          src = "./img/wood-pin.png";
          orbColor = "#005544";
        } else if (orbType === 3) {
          orbType = "orb-light";
          src = "./img/light-pin.png";
          orbColor = "#776611";
        } else if (orbType === 4) {
          orbType = "orb-dark";
          src = "./img/dark-pin.png";
          orbColor = "#772299";
        } else {
          orbType = "orb-heart";
          src = "./img/heart-pin.png";
          orbColor = "#dd2277";
      }
      let orbject = new Kinetic.Circle({
        x: (rowIdx + 0.5) * 100, y: (colIdx + 0.5) * 100,
        width: 100, height: 100, src: src,
        fill: orbColor, color: orbType, draggable: true,
        orbId: `orb${colIdx}${rowIdx}`, matched: false, matchId: 0
      });
      // orbject.on("mousedown", this.handleMouseDown);
      // orbject.on("mouseup", this.handleMouseUp);
      // orbject.on("mouseout", this.handleMouseOut);
      // orbject.on("mousemove", this.handleMouseMove);

      this.orbs[colIdx].push(orbject);
    }
  }

  doLoad (that, layer, img, orb, pos, color) {
    Image = new Kinetic.Image({
      x: orb.attrs.x - 50, y: orb.attrs.y - 50,
      width: 100, height: 100,
      image: img, pos: pos,
      color: color, orbId: orb.attrs.orbId,
      draggable: true
    });
    layer.add(Image);
    layer.draw();

    that.orbCanvases[Image.attrs.orbId] = Image;

    layer.on("mousedown", that.handleMouseDown);
    layer.on("mouseup", that.handleMouseUp);
    layer.on("mouseout", that.handleMouseOut);
    layer.on("mousemove", that.handleMouseMove);
  }

  createImage(thisOrb, orb) {
  }

  renderBoard () {

    for (let row = 0; row < this.orbs.length; row++) {
      for (let orb = 0; orb < this.orbs[row].length; orb++) {
        let layer = new Kinetic.Layer();

        // layer.add(this.orbs[row][orb]);

        this.stage.add(layer);

        let img = new Image();
        img.onload = this.doLoad.bind(
          null, this,
          layer, img,
          this.orbs[row][orb], [row, orb],
          this.orbs[row][orb].attrs.color
        );
        img.src = this.orbs[row][orb].attrs.src;

      }
    }
  }

  handleMouseDown (e) {
    // window.clicked = !window.clicked;
    window.currentOrb = e.target;
    window.newX = e.target.attrs.x;
    window.newY = e.target.attrs.y;
    // console.log(window.currentOrb);
    // if (window.clicked) {
      // window.currentOrb.hide();
    // } else {
    //   window.currentOrb.show();
    // }
    window.currentOrb.draw();
  }

  handleMouseUp (e, redoing) {
    // window.currentOrb.show();
    // window.currentOrb.draw();
    window.currentOrb.x(window.newX);
    window.currentOrb.y(window.newY);
    window.currentOrb.parent.clear();
    window.currentOrb.parent.drawScene();
    if (redoing) {

    } else {
      window.currentOrb = undefined;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
          window.orbs[`orb${i}${j}`].parent.clear();
          window.orbs[`orb${i}${j}`].draw();
        }
      }
      window.findMatches();
    }
  }

  handleMouseOut (e) {
  }

  handleMouseMove (e) {
    console.log(e.target.attrs.orbId);

    if (window.currentOrb !== undefined && (window.currentOrb.attrs.orbId !== e.target.attrs.orbId)) {
      window.orbMove.pause();
      window.currentTime = 0;
      window.orbMove.play();

      let targOrbX = e.target.attrs.x;
      let targOrbY = e.target.attrs.y;
      // This is the target orb that's being changed's value
      // We're storing this in targOrb
      e.target.x(window.newX);
      e.target.y(window.newY);

      e.target.parent.clear();
      // e.target.parent.add(e.target);
      e.target.parent.draw();

      // window.movedOrbs.push(e.target);
      // Here we have the previously set current orb's position becoming
      // the target orb's position

      window.newX = targOrbX;
      window.newY = targOrbY;
      window.handleMouseUp(e, true);

      let x1 = window.currentOrb.attrs.pos[0];
      let y1 = window.currentOrb.attrs.pos[1];

      let x2 = e.target.attrs.pos[0];
      let y2 = e.target.attrs.pos[1];

      [window.orbArray[x1][y1], window.orbArray[x2][y2]] =
      [window.orbArray[x2][y2], window.orbArray[x1][y1]];

      window.currentOrb.attrs.pos[0] = x2;
      window.currentOrb.attrs.pos[1] = y2;

      // if (window.movedOrbs.length > 0){
        // debugger
      // }
      // Now that the move is made, we can set the newX and Y to be the
      // target orb's position once mouseup
    }
  }


  findMatches () {
    let matches = [];
    matches = window.matchOrbs(matches);
    if (matches.length > 0) {
      matches = window.dropOrbs(matches);
    }
    while (matches.length > 0) {
      matches = window.matchOrbs(matches);
      matches = window.dropOrbs(matches);
    }
  }

  matchOrbs (matches) {
    let orb = window.orbArray;
    let options = {};
    let matchId = 0;

    let allMatches = {};

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        options.recurs = 0;
        options.matched = false;
        options.matchId = matchId;
        options = window.checkMatch(orb[row][col], orb, options, row, col);
        // implement match order when time allows
        for (let match in options.match) {
          allMatches[match] = options.match[match];
        }
      }
    }
    // for (let col = 0; col < 5; col++) {
    //   for (let row = 0; row < 3; row++) {
    //     options.recurs = 0;
    //     options.matched = false;
    //     options.matchId = matchId;
    //
    //     options = window.checkMatch(orb[row][col], orb, options, col, row);
    //     // console.log(options.match);
    //     for (let match in options.match) {
    //       allMatches[match] = options.match[match];
    //     }
    //   }
    // }

    for (let match in allMatches) {
      matches.push(allMatches[match]);
    }
    return matches;
  }

  checkMatch (orb, orbs, options, x, y, match = {}) {
    options.recurs += 1;

    if (orbs[x][y + 1] !== undefined && orb.attrs.color === orbs[x][y + 1].attrs.color) {
      if (options.recurs >= 2) {
        options.matched = true;
        orbs[x][y].attrs.matched = true;
      }
      options = checkMatch(orbs[x][y + 1], orbs, options, x, y + 1, match);
    }
    if (options.matched) {
      match[orb.attrs.orbId] = orb;
    }
    // console.log(`II: orbID: ${orb.attrs.orbId} recursion: ${options.recurs}`);
    if (options.match === undefined) {
      options.match = match;
    } else {
      for (let orb in match) {
        options.match[orb] = match[orb];
      }
    }
    return options;
  }

  dropOrbs (matches) {
    console.log(matches.length);
    for (var i = 0; i < matches.length; i++) {
      console.log(matches[i].attrs.orbId);
    }
  }
}


module.exports = BoardView;
