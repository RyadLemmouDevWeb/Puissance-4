"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Puissance4 = /*#__PURE__*/function () {
  function Puissance4() {
    _classCallCheck(this, Puissance4);
    this.rows = 6;
    this.cols = 7;
    this.players = [{
      id: 1,
      color: '#ff4444'
    }, {
      id: 2,
      color: '#ffd700'
    }];
    this.currentPlayer = this.players[0];
    this.board = this.createBoard();
    this.gameOver = false;
    this.scores = {
      1: 0,
      2: 0
    };
    this.init();
  }
  return _createClass(Puissance4, [{
    key: "createBoard",
    value: function createBoard() {
      var _this = this;
      return Array.from({
        length: this.rows
      }, function () {
        return Array(_this.cols).fill(0);
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.setupConfigForm();
    }
  }, {
    key: "setupConfigForm",
    value: function setupConfigForm() {
      var _this2 = this;
      var startButton = document.getElementById('start-game');
      startButton.addEventListener('click', function () {
        _this2.rows = parseInt(document.getElementById('rows').value);
        _this2.cols = parseInt(document.getElementById('cols').value);
        _this2.players[0].color = document.getElementById('player1-color').value;
        _this2.players[1].color = document.getElementById('player2-color').value;
        document.getElementById('config').style.display = 'none';
        _this2.startGame();
      });
      var resetSettingsButton = document.getElementById('reset-settings');
      resetSettingsButton.addEventListener('click', function () {
        return _this2.resetSettings();
      });
    }
  }, {
    key: "resetSettings",
    value: function resetSettings() {
      document.getElementById('config').style.display = 'block';
      document.getElementById('game').innerHTML = '';
      document.getElementById('turn-indicator').textContent = '';
      document.getElementById('victory-message').textContent = '';
    }
  }, {
    key: "startGame",
    value: function startGame() {
      this.board = this.createBoard();
      this.currentPlayer = this.players[0];
      this.gameOver = false;
      this.renderBoard();
      this.updateTurnIndicator();
      this.setupEventListeners();
    }
  }, {
    key: "renderBoard",
    value: function renderBoard() {
      var _this3 = this;
      var gameElement = document.getElementById('game');
      gameElement.innerHTML = '';
      gameElement.style.gridTemplateColumns = "repeat(".concat(this.cols, ", 70px)");
      gameElement.style.gridTemplateRows = "repeat(".concat(this.rows, ", 70px)");
      for (var row = 0; row < this.rows; row++) {
        var _loop = function _loop(col) {
          var cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = row;
          cell.dataset.col = col;
          cell.addEventListener('click', function () {
            return _this3.handleCellClick(col);
          });
          if (_this3.board[row][col] !== 0) {
            cell.style.backgroundColor = _this3.players[_this3.board[row][col] - 1].color;
          }
          gameElement.appendChild(cell);
        };
        for (var col = 0; col < this.cols; col++) {
          _loop(col);
        }
      }
    }
  }, {
    key: "handleCellClick",
    value: function handleCellClick(col) {
      var _this4 = this;
      if (this.gameOver) return;
      var row = this.getLowestEmptyRow(col);
      if (row === -1) return;
      this.animateDirectFall(col, row, function () {
        _this4.board[row][col] = _this4.currentPlayer.id;
        _this4.renderBoard();
        if (_this4.checkWin(row, col)) {
          _this4.gameOver = true;
          _this4.scores[_this4.currentPlayer.id]++;
          _this4.showVictoryMessage();
          return;
        }
        _this4.switchPlayer();
      });
    }
  }, {
    key: "animateDirectFall",
    value: function animateDirectFall(col, row, callback) {
      var gameElement = document.getElementById('game');
      var targetCell = gameElement.querySelector("[data-row=\"".concat(row, "\"][data-col=\"").concat(col, "\"]"));
      var gridRect = gameElement.getBoundingClientRect();
      var cellRect = targetCell.getBoundingClientRect();
      var tempPion = document.createElement('div');
      tempPion.style.width = '70px';
      tempPion.style.height = '70px';
      tempPion.style.backgroundColor = this.currentPlayer.color;
      tempPion.style.borderRadius = '50%';
      tempPion.style.position = 'fixed';
      tempPion.style.top = "".concat(gridRect.top, "px");
      tempPion.style.left = "".concat(cellRect.left, "px");
      tempPion.style.transition = 'top 0.3s ease-in-out';
      document.body.appendChild(tempPion);
      setTimeout(function () {
        tempPion.style.top = "".concat(cellRect.top, "px");
      }, 10);
      setTimeout(function () {
        document.body.removeChild(tempPion);
        callback();
      }, 310);
    }
  }, {
    key: "getLowestEmptyRow",
    value: function getLowestEmptyRow(col) {
      for (var row = this.rows - 1; row >= 0; row--) {
        if (this.board[row][col] === 0) {
          return row;
        }
      }
      return -1;
    }
  }, {
    key: "checkWin",
    value: function checkWin(row, col) {
      var directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
      for (var _i = 0, _directions = directions; _i < _directions.length; _i++) {
        var _directions$_i = _slicedToArray(_directions[_i], 2),
          dx = _directions$_i[0],
          dy = _directions$_i[1];
        var count = 1;
        count += this.countDirection(row, col, dx, dy);
        count += this.countDirection(row, col, -dx, -dy);
        if (count >= 4) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "countDirection",
    value: function countDirection(row, col, dx, dy) {
      var count = 0;
      var x = row + dx;
      var y = col + dy;
      while (x >= 0 && x < this.rows && y >= 0 && y < this.cols && this.board[x][y] === this.currentPlayer.id) {
        count++;
        x += dx;
        y += dy;
      }
      return count;
    }
  }, {
    key: "switchPlayer",
    value: function switchPlayer() {
      this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
      this.updateTurnIndicator();
    }
  }, {
    key: "updateTurnIndicator",
    value: function updateTurnIndicator() {
      var turnIndicator = document.getElementById('turn-indicator');
      turnIndicator.textContent = "Tour du joueur ".concat(this.currentPlayer.id, " - Scores: J1: ").concat(this.scores[1], ", J2: ").concat(this.scores[2]);
    }
  }, {
    key: "showVictoryMessage",
    value: function showVictoryMessage() {
      var victoryMessage = document.getElementById('victory-message');
      victoryMessage.textContent = "Le joueur ".concat(this.currentPlayer.id, " a gagn\xE9 !");
      this.updateTurnIndicator();
    }
  }, {
    key: "resetGame",
    value: function resetGame() {
      this.board = this.createBoard();
      this.currentPlayer = this.players[0];
      this.gameOver = false;
      this.renderBoard();
      this.updateTurnIndicator();
      var victoryMessage = document.getElementById('victory-message');
      victoryMessage.textContent = '';
    }
  }, {
    key: "resetScore",
    value: function resetScore() {
      this.scores = {
        1: 0,
        2: 0
      };
      this.updateTurnIndicator();
    }
  }, {
    key: "setupEventListeners",
    value: function setupEventListeners() {
      var _this5 = this;
      document.getElementById('reset-game').addEventListener('click', function () {
        return _this5.resetGame();
      });
      document.getElementById('reset-score').addEventListener('click', function () {
        return _this5.resetScore();
      });
    }
  }]);
}();
var game = new Puissance4();