/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const BoardView = __webpack_require__(1);
	const Game = __webpack_require__(2);

	document.addEventListener("DOMContentLoaded",
	function() {
	  const canvasEl =
	  document.getElementsByTagName("canvas")[0];
	  const ctx = canvasEl.getContext("2d");
	  const game = new Game();
	  new BoardView(game, ctx);
	});

	// $( () => {
	//   let newGame = new Game();
	//   const $pac = $('#pac');
	//   new BoardView(newGame, $pac);
	// });


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(3);

	function Game () {
	  this.board = new Board();
	}

	module.exports = Game;


/***/ },
/* 3 */
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