/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const BoardView = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded",
	function() {
	  const canvas =
	  document.getElementsByTagName("canvas")[0];
	  const ctx = canvas.getContext("2d");
	  const stage = new Kinetic.Stage({
	    container: 'game-board',
	    width: 604,
	    height: 524,
	  });
	  const board = new BoardView(stage, ctx);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const OrbObject = __webpack_require__(2);
	
	// 356 356 35697 45752 1241
	
	class BoardView {
	  constructor(stage, ctx) {
	    this.stage = stage;
	    this.ctx = ctx;
	    this.orbs = [[], [], [], [], []];
	    this.orbCanvases = {};
	    this.moving = false;
	    this.setupBoard();
	    window.orbs = this.orbCanvases;
	    this.renderImages();
	    window.stage = this.stage;
	    window.orbMove = new Audio('orb_move.mp3');
	    window.movedOrbs = [];
	    window.clicked = false;
	    window.orbArray = this.orbs;
	    window.findMatches = this.findMatches;
	    window.matchOrbs = this.matchOrbs;
	    window.dropOrbs = this.dropOrbs;
	    window.checkMatch = this.checkMatch;
	    window.handleMouseUp = this.handleMouseUp;
	
	    this.playMusic();
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
	
	  playMusic() {
	    const songs = ['./mp3/999.mp3', './mp3/crypt43.mp3', './mp3/cryptconga.mp3', './mp3/descent.mp3', './mp3/devils.mp3', './mp3/evilem.mp3', './mp3/evilev.mp3', './mp3/hallow.mp3', './mp3/hexagon.mp3', './mp3/shinra.mp3', './mp3/unepiccast.mp3'];
	
	    let songNumber = Math.round(Math.random() * songs.length - 1);
	    let song = new Audio(songs[songNumber]);
	
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
	        width: 100, height: 100, src: src,
	        fill: orbColor, color: orbType, draggable: true,
	        orbId: `orb${colIdx}${rowIdx}`, matched: false, matchId: 0
	      });
	
	      this.orbs[colIdx].push(orbject);
	    }
	  }
	
	  doLoad (that, layer, img, orb, pos, color) {
	    Image = new Kinetic.Image({
	      x: orb.attrs.x - 50, y: orb.attrs.y - 50,
	      width: 100, height: 100,
	      image: img, pos: pos,
	      color: color, orbId: orb.attrs.orbId,
	      draggable: false, opacity: 1
	    });
	    layer.add(Image);
	    layer.draw();
	
	    that.orbCanvases[Image.attrs.orbId] = Image;
	
	    // layer.on("mousedown", that.handleMouseDown);
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
	  }
	
	  handleMouseUp (e, redoing) {
	
	    window.clicked = !window.clicked;
	
	    window.currentOrb = e.target;
	    if (window.clicked) {
	      window.currentOrb.setOpacity(0.5);
	      window.currentOrb.setSize({width: 105, height: 105});
	    } else {
	      window.currentOrb.setOpacity(1);
	      window.currentOrb.setSize({width: 100, height: 100});
	    }
	
	    window.newX = e.target.attrs.x;
	    window.newY = e.target.attrs.y;
	
	    e.target.parent.clear();
	    e.target.draw();
	
	    window.currentOrb.draw();
	
	    e.target.parent.clear();
	    // e.target.parent.add(glow);
	    e.target.parent.draw();
	
	    if (!window.clicked) {
	      window.findMatches();
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
	    // if (redoing) {
	    //
	    // } else {
	    //   window.currentOrb = undefined;
	    //   for (let i = 0; i < 5; i++) {
	    //     for (let j = 0; j < 6; j++) {
	    //       window.orbs[`orb${i}${j}`].parent.clear();
	    //       window.orbs[`orb${i}${j}`].draw();
	    //     }
	    //   }
	    // }
	  }
	
	  handleMouseOut (e) {
	  }
	
	  handleMouseMove (e) {
	    // console.log(e.target.attrs.orbId);
	
	    if (window.currentOrb !== undefined && (window.currentOrb.attrs.orbId !== e.target.attrs.orbId) && window.clicked) {
	      // window.orbMove.pause();
	
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
	
	      [window.orbArray[x1][y1], window.orbArray[x2][y2]] =
	      [window.orbArray[x2][y2], window.orbArray[x1][y1]];
	
	      window.currentOrb.attrs.pos[0] = x2;
	      window.currentOrb.attrs.pos[1] = y2;
	
	      window.currentOrb.x(window.newX);
	      window.currentOrb.y(window.newY);
	
	      e.target.parent.clear();
	      window.currentOrb.parent.clear();
	
	      e.target.parent.draw();
	      window.currentOrb.draw();
	
	
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
	    while (matches.length > 0) {
	      matches = window.dropOrbs(matches);
	      // matches = window.matchOrbs(matches);
	    }
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
	
	  dropOrbs (matches) {
	    console.log(matches.length);
	    for (let i = 0; i < matches.length; i++) {
	      let pos = matches[i].attrs.pos;
	      let attrs = matches[i].attrs;
	
	      window.orbArray[pos[0]][pos[1]] = "EMPTY";
	      window.orbs[attrs.orbId].parent.clear();
	
	    }
	
	    return [];
	  }
	}
	
	
	module.exports = BoardView;


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	class OrbObject {
	  constructor(params) {
	    this.pos = params.pos;
	    this.color = params.color;
	    this.img = params.img;
	    this.dragging = false;
	  }
	
	  remove() {
	    this.game.remove(this);
	  }
	}
	
	module.exports = OrbObject;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map