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
	const Game = __webpack_require__(3);
	
	document.addEventListener("DOMContentLoaded",
	function() {
	  const canvas =
	  document.getElementsByTagName("canvas")[0];
	  const ctx = canvas.getContext("2d");
	  const stage = new Kinetic.Stage({
	    container: 'game-board',
	    width: 604,
	    height: 494,
	  });
	  const game = new Game();
	  const board = new BoardView(stage, game, ctx);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const OrbObject = __webpack_require__(2);
	
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
	    window.orbMove = new Audio('orb_move.mp3');
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
	      let orbject = new Kinetic.Circle({
	        x: (rowIdx + 0.5) * 100, y: (colIdx + 0.5) * 100,
	        width: 100, height: 100, src: src,
	        fill: orbColor, draggable: true, orbId: `orb${colIdx}${rowIdx}`
	      });
	      // orbject.on("mousedown", this.handleMouseDown);
	      // orbject.on("mouseup", this.handleMouseUp);
	      // orbject.on("mouseout", this.handleMouseOut);
	      // orbject.on("mousemove", this.handleMouseMove);
	
	      this.orbs[colIdx].push(orbject);
	    }
	  }
	
	  doLoad (that, layer, img, orb) {
	    Image = new Kinetic.Image({
	      x: orb.attrs.x - 50, y: orb.attrs.y - 50,
	      width: 100, height: 100,
	      image: img,
	      draggable: true, orbId: orb.attrs.orbId
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
	        img.onload = this.doLoad.bind(null, this, layer, img, this.orbs[row][orb]);
	        img.src = this.orbs[row][orb].attrs.src;
	
	      }
	    }
	  }
	
	  hashOrbs(orbs) {
	    // let allOrbs = {};
	    // for (let row = 0; row < this.orbs.length; row++) {
	    //   for (let orb = 0; orb < this.orbs[row].length; orb++) {
	    //     allOrbs[`orb${row}${orb}`] = orbs[row][orb];
	    //   }
	    // }
	    // return allOrbs;
	  }
	
	  handleMouseDown (e) {
	    window.currentOrb = e.target;
	    window.newX = e.target.attrs.x;
	    window.newY = e.target.attrs.y;
	  }
	
	  handleMouseUp (e) {
	    window.currentOrb.x(window.newX);
	    window.currentOrb.y(window.newY);
	    window.currentOrb.parent.clear();
	    window.currentOrb.parent.draw();
	    window.currentOrb.draw();
	    window.currentOrb = undefined;
	    for (let i = 0; i < 5; i++) {
	      for (let j = 0; j < 6; j++) {
	        window.orbs[`orb${i}${j}`].draw();
	      }
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
	      e.target.parent.add(e.target);
	      e.target.parent.draw();
	      // debugger
	
	      // Here we have the previously set current orb's position becoming
	      // the target orb's position
	
	      window.newX = targOrbX;
	      window.newY = targOrbY;
	
	      // Now that the move is made, we can set the newX and Y to be the
	      // target orb's position once mouseup
	    }
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(4);
	
	function Game () {
	  this.board = new Board();
	}
	
	module.exports = Game;


/***/ },
/* 4 */
/***/ function(module, exports) {

	
	function Board () {
	  this.grid = Board.makeGrid();
	}
	
	Board.makeGrid = function() {
	  return [];
	};
	
	module.exports = Board;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map