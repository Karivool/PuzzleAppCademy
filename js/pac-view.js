const OrbObject = require('./orb_object.js');

// 356 356 35697 45752 1241

class BoardView {
  constructor(stage, ctx) {
    this.stage = stage;
    this.ctx = ctx;
    this.orbs = [[], [], [], [], []];
    this.orbCanvases = {};
    this.score = 0;

    this.setupBoard();
    window.orbs = this.orbCanvases;
    // this.renderImages();

    window.stage = this.stage;
    window.orbMove = new Audio('orb_move.mp3');
    window.movedOrbs = [];
    window.clicked = false;

    window.orbArray = this.orbs;
    window.findMatches = this.findMatches;
    window.matchOrbs = this.matchOrbs;
    window.dropOrbs = this.dropOrbs;
    window.checkMatch = this.checkMatch;
    window.checkMatchVert = this.checkMatchVert;
    window.randomOrb = this.randomOrb;

    window.reLoad = this.reLoad;
    window.sleep = this.sleep;

    window.gameEnd = false;
    window.gameStarted = false;
    window.score = this.score;

    this.playMusic();
  }

  setupBoard () {
    for (let colIdx = 0; colIdx < 5; colIdx++) {
      this.addRow(colIdx);
    }
    this.renderBoard();
  }

  playMusic() {
    const songs = ['./mp3/999.mp3', './mp3/crypt43.mp3', './mp3/cryptconga.mp3', './mp3/descent.mp3', './mp3/devils.mp3', './mp3/distrust.mp3', './mp3/evilem.mp3', './mp3/evilev.mp3', './mp3/hallow.mp3', './mp3/hexagon.mp3', './mp3/shinra.mp3', './mp3/unepiccast.mp3'];

    let songNumber = Math.round(Math.random() * songs.length - 1);
    let song = new Audio(songs[songNumber]);
    song.volume = 0.5;

    song.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
      }, false);
    song.play();
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
        src: src, fill: orbColor, color: orbType,
        orbId: `orb${colIdx}${rowIdx}`, matched: false, matchId: 0
      });

      this.orbs[colIdx].push(orbject);
    }
  }

  doLoad (that, layer, img, orb, pos, color) {
    let orbImage = new Kinetic.Image({
      x: orb.attrs.x - 50, y: orb.attrs.y - 50,
      width: 100, height: 100,
      image: img, pos: pos,
      color: color, orbId: orb.attrs.orbId,
      draggable: false, opacity: 1
    });
    layer.add(orbImage);
    layer.draw();

    that.orbCanvases[orbImage.attrs.orbId] = orbImage;

    layer.on("mouseup", that.handleMouseUp);
    layer.on("mouseout", that.handleMouseOut);
    layer.on("mousemove", that.handleMouseMove);
  }

  randomOrb () {
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

    return {orbType, src, orbColor};
  }

  renderBoard () {

    for (let row = 0; row < this.orbs.length; row++) {
      for (let orb = 0; orb < this.orbs[row].length; orb++) {
        let layer = new Kinetic.Layer();

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

  handleMouseUp (e) {
    if(!window.gameEnd) {
      window.clicked = !window.clicked;
      if (window.clicked) {
        window.currentOrb = e.target;
        window.currentOrb.setOpacity(0.7);
        window.currentOrb.setSize({width: 105, height: 105});
        // debugger

        window.newX = e.target.attrs.x;
        window.newY = e.target.attrs.y;

        e.target.parent.clear();
        e.target.parent.draw();

      } else {
        window.currentOrb.setOpacity(1);
        window.currentOrb.setSize({width: 100, height: 100});
        window.currentOrb.parent.clear();
        window.currentOrb.parent.draw();
        window.currentOrb = undefined;
      }

      if (!window.clicked) {
        let matches = window.findMatches();
      } else {
        for (let row = 0; row < 5; row++) {
          for (let col = 0; col < 6; col++) {
            let color = window.orbArray[row][col].attrs.color;
            let sek;
            if (color === 'orb-fire') {
              sek = "#ff0000";
            } else if (color === 'orb-water') {
              sek = "#00ffe0";
            } else if (color === 'orb-wood') {
              sek = "#aeff00";
            } else if (color === 'orb-light') {
              sek = "#ffe400";
            } else if (color === 'orb-dark') {
              sek = "#8a00ff";
            } else {
              sek = "#ff00fc";
            }
            console.log(`${row}${col}%c(■)`, `background: #222; color: ${sek}`);
          }
          console.log("___");
        }
      }
    }
  }

  handleMouseOut (e) {
  }

  handleMouseMove (e) {
    // console.log(e.target.attrs.orbId);
    if (!window.gameEnd) {
        if (window.currentOrb !== undefined && (window.currentOrb.attrs.orbId !== e.target.attrs.orbId) && window.clicked) {

        window.orbMove.currentTime = 0;
        window.orbMove.play();

        let targOrbX = e.target.attrs.x;
        let targOrbY = e.target.attrs.y;
        // This is the target orb that's being changed's value
        // We're storing this in targOrb
        e.target.x(window.newX);
        e.target.y(window.newY);

        // Here we have the previously set current orb's position becoming
        // the target orb's position

        window.newX = targOrbX;
        window.newY = targOrbY;

        let x1 = window.currentOrb.attrs.pos[0];
        let y1 = window.currentOrb.attrs.pos[1];

        let x2 = e.target.attrs.pos[0];
        let y2 = e.target.attrs.pos[1];

        let orb1 = window.orbArray[x1][y1];
        let orb2 = window.orbArray[x2][y2];

        [orb1.attrs.x, orb2.attrs.x] = [orb2.attrs.x, orb1.attrs.x];
        [orb1.attrs.y, orb2.attrs.y] = [orb2.attrs.y, orb1.attrs.y];

        [window.orbArray[x1][y1], window.orbArray[x2][y2]] =
        [window.orbArray[x2][y2], window.orbArray[x1][y1]];

        window.currentOrb.attrs.pos[0] = x2;
        window.currentOrb.attrs.pos[1] = y2;

        e.target.attrs.pos[0] = x1;
        e.target.attrs.pos[1] = y1;

        window.currentOrb.x(window.newX);
        window.currentOrb.y(window.newY);

        e.target.parent.clear();
        window.currentOrb.parent.clear();

        e.target.parent.draw();
        window.currentOrb.draw();

      }
    }
  }


  findMatches () {
    let matches = [];
    matches = window.matchOrbs(matches);
    while (matches.length > 0) {
      matches = window.dropOrbs(matches);
    }
    return window.matchOrbs(matches);
  }

  matchOrbs (matches) {
    let orb = window.orbArray;
    let options = {};
    let matchId = 0;

    let allMatches = {};

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 6; col++) {
        let color = window.orbArray[row][col].attrs.color;
        let sek;
        if (color === 'orb-fire') {
          sek = "#ff0000";
        } else if (color === 'orb-water') {
          sek = "#00ffe0";
        } else if (color === 'orb-wood') {
          sek = "#aeff00";
        } else if (color === 'orb-light') {
          sek = "#ffe400";
        } else if (color === 'orb-dark') {
          sek = "#8a00ff";
        } else {
          sek = "#ff00fc";
        }
        console.log(`${row}${col}%c(■)`, `background: #222; color: ${sek}`);
      }
      console.log("___");
    }

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
    options = {};

    for (let col = 0; col < 6; col++) {
      for (let row = 0; row < 3; row++) {
        options.recurs = 0;
        options.matched = false;
        options.matchId = matchId;
        // console.log(`checking ${row} ${col}`);

        options = window.checkMatchVert(orb[row][col], orb, options, row, col);
        for (let match in options.match) {
          allMatches[match] = options.match[match];
        }
      }
    }

    for (let match in allMatches) {
      matches.push(allMatches[match]);
    }
    return matches;
  }

  checkMatchVert (orb, orbs, options, x, y, match = {}) {
    options.recurs += 1;

    if (orbs[x + 1] !== undefined && orb.attrs.color === orbs[x + 1][y].attrs.color) {
      if (options.recurs >= 2) {
        options.matched = true;
        orbs[x][y].attrs.matched = true;
      }
      options = checkMatchVert(orbs[x + 1][y], orbs, options, x + 1, y, match);
    }
    if (options.matched) {
      orb.attrs.pos = [x, y];
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
      orb.attrs.pos = [x, y];
      match[orb.attrs.orbId] = orb;
    }
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
    console.log(matches);
    for (let i = 0; i < matches.length; i++) {
      let pos = matches[i].attrs.pos;
      let attrs = matches[i].attrs;

      // window.orbArray[pos[0]][pos[1]].attrs.color = "orb-matched";
      // window.orbArray[pos[0]][pos[1]].attrs.src = "./img/match-pin.png";

      let orbVals = window.randomOrb();

      let imgVars = { color: attrs.color, height: attrs.height,
                      opacity: attrs.opacity, orbId: attrs.orbId,
                      pos: attrs.pos, width: attrs.width,
                      x: orbArray[pos[0]][pos[1]].attrs.x, y: orbArray[pos[0]][pos[1]].attrs.y
                    };

      matches[i].attrs.color = orbVals.orbType;
      matches[i].attrs.src = orbVals.src;
      matches[i].attrs.orbColor = orbVals.orbColor;

      let img = new Image();

      img.onload = window.reLoad.bind(
        null,
        matches[i], img,
        window.orbs[matches[i].attrs.orbId].parent,
        [pos[0], pos[1]],
        imgVars
      );
      img.src = orbVals.src;

    }
    //window.orbs is the hash where the actual images must change
    //window.orbArray will let us iterate through them all
      // but orbArray's src should be changed too

    return [];
  }

  reLoad (orb, img, layer, pos, atts) {
    let reImage = new Kinetic.Image({
      x: atts.x - 50, y: atts.y - 50,
      width: 100, height: 100,
      image: img, pos: atts.pos,
      color: atts.color, orbId: atts.orbId,
      draggable: false, opacity: atts.opacity
    });
    layer.removeChildren();
    layer.clear();
    window.sleep(150).then(() => {
      layer.add(reImage);
      layer.draw();
      window.orbs[reImage.attrs.orbId] = reImage;

      const sounds = ['./superlaser2.mp3', './superlaser3.mp3', './superlaser4.mp3', './superlaser5.mp3', './superlaser7.mp3', './superlaser8.mp3', './superlaser9.mp3', './superlaser11.mp3', './superlaser12.mp3'];

      let soundNumber = Math.round(Math.random() * sounds.length - 1);
      let sound = new Audio(sounds[soundNumber]);

      sound.volume = 0.25;
      sound.currentTime = 0;
      sound.play();
    });
  }

  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}


module.exports = BoardView;
