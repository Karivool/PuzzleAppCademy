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

	$( () => {
	  let newGame = new Game();
	  const $pac = $('#pac');
	  new BoardView(newGame, $pac);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	let BoardView = function (gameBoard, $el) {
	  this.gameBoard = gameBoard;
	  this.$el = $el;
	  this.setupBoard();
	  this.bindEvents();
	};

	BoardView.prototype.bindEvents = function () {
	  // orb clicked and held by mouse button
	  $('.orb').on("click", e => {
	    const $orb = $(e.currentTarget);
	    this.makeMove($orb);
	  });
	};

	BoardView.prototype.makeMove = function ($orb) {

	};

	BoardView.prototype.setupBoard = function () {
	  for (let i = 0; i < 5; i++) {
	    this.addRow();
	  }
	};
	BoardView.prototype.addRow = function() {
	  const rowIdx = this.$el.find(".row").length;
	  const $row = $("<ul>").addClass("row").addClass("group");

	  for (let colIdx = 0; colIdx < 6; colIdx++) {

	    let orbType = Math.round(Math.random() * 5);

	    if (orbType === 0) {
	      orbType = "orb-fire";
	    } else if (orbType === 1) {
	      orbType = "orb-water";
	    } else if (orbType === 2) {
	      orbType = "orb-wood";
	    } else if (orbType === 3) {
	      orbType = "orb-light";
	    } else if (orbType === 4) {
	      orbType = "orb-dark";
	    } else {
	      orbType = "orb-heart";
	    }
	    const $orb = $("<li>").addClass(orbType).attr("data-pos", [rowIdx, colIdx]);

	    $row.append($orb);
	  }
	  this.$el.append($row);
	};

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