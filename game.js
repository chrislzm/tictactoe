const TicTacToe = (function () {

  // constants
  const WINNING_SETS = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  const PLAYER_1 = 'X';
  const PLAYER_2 = 'O';
  const CLASS_CELL = 'cell';
  const CLASS_VISITED = 'visited';
  const CLASS_SELECTED = 'selected';
  const CLASS_SELECTED_NOT_VISITED = 'selectedNotVisited';
  const ELEMENT_ID_BOARD = 'board';
  const ELEMENT_ID_STATUS_MESSAGE = 'statusMessage';
  const ELEMENT_ID_RESTART_BUTTON = 'restartButton';
  const MESSAGE_PLAYER_TAG = '{player}';
  const MESSAGE_WIN = 'Player ' + MESSAGE_PLAYER_TAG + ' has won!';
  const MESSAGE_DRAW = 'It\'s a draw!';
  const KEY_LEFT = 37;
  const KEY_UP = 38;
  const KEY_RIGHT = 39;
  const KEY_DOWN = 40;
  const KEY_ENTER = 13;

  // private variables
  const $board = $('#' + ELEMENT_ID_BOARD);
  let curPlayer = PLAYER_1;
  let curCell = 3; // Zero-based current cell index
  let gameOver = false;
  const ownership = {};
  ownership[PLAYER_1] = [];
  ownership[PLAYER_2] = [];
  const cells = document.getElementsByClassName(CLASS_CELL);
  const statusMessage = document.getElementById(ELEMENT_ID_STATUS_MESSAGE);
  const restartButton = document.getElementById(ELEMENT_ID_RESTART_BUTTON);

  // private methods
  const addCellListeners = function () {
    $board.on('click', function (e) {
      const cell = e.target;
      makeMove(cell);
    });
  }

  const makeMove = function (cell) {
    if (!gameOver && !cell.classList.contains(CLASS_VISITED)) {
      cell.classList.add(curPlayer,CLASS_VISITED);
      tempUnmarkCell(cells[curCell],curPlayer); // Leave the previous cell
      tempMarkCell(cell,curPlayer); // Select the current cell
      const cellId = parseInt(cell.dataset.id, 10);
      ownership[curPlayer].push(cellId);
      curCell = cellId-1;
      continueGame();
    }
  }

  const addKeyPressListener = function () {
    $(document).on('keydown', function(e) {
      const key = e.which;
      switch(key) {
        case KEY_ENTER:
          makeMove(cells[curCell]);
          break;
        case KEY_LEFT:
          if(curCell %3 != 0) { // If we're not on the leftmost column
            tempUnmarkCell(cells[curCell],curPlayer);
            curCell -= 1;
            tempMarkCell(cells[curCell],curPlayer);
          }
          break;
        case KEY_UP:
          if(curCell >= 3) { // If we're below the top row
            tempUnmarkCell(cells[curCell],curPlayer);
            curCell -= 3;
            tempMarkCell(cells[curCell],curPlayer);
          }
          break;
        case KEY_RIGHT:
          if((curCell+1)%3 != 0) { // If we're not on the rightmost column
            tempUnmarkCell(cells[curCell],curPlayer);
            curCell += 1;
            tempMarkCell(cells[curCell],curPlayer);
          }
          break;
        case KEY_DOWN:
          if(curCell <= 5) { // If we're not on the bottom row
            tempUnmarkCell(cells[curCell],curPlayer);
            curCell += 3;
            tempMarkCell(cells[curCell],curPlayer);
          }
          break;
        default:
      }
    })
  }

  const addMouseOverEvents = function () {
    for (let i = 0, len = cells.length; i < len; i++) {
      const cell = cells[i];
      cell.onmouseover = function() {
        tempUnmarkCell(cells[curCell],curPlayer);
        curCell = i;
        tempMarkCell(cell,curPlayer);
      }
      cell.onmouseout = function() {
        tempUnmarkCell(cell,curPlayer);
      }
    }
  }

  const tempMarkCell = function (cell,player) {
    cell.classList.add(CLASS_SELECTED);
    if(!cell.classList.contains(CLASS_VISITED)) {
      cell.classList.add(player,CLASS_SELECTED_NOT_VISITED);
    }
  }

  const tempUnmarkCell = function (cell,player) {
    cell.classList.remove(CLASS_SELECTED);
    if(!cell.classList.contains(CLASS_VISITED)) {
      cell.classList.remove(player,CLASS_SELECTED_NOT_VISITED);
    }
  }

  const continueGame = function () {
    if(didcurPlayerWin()) {
      endWithMessage(MESSAGE_WIN.replace(MESSAGE_PLAYER_TAG,curPlayer));
    } else if(isDrawGame()) {
      endWithMessage(MESSAGE_DRAW);
    } else {
      togglecurPlayer();
    }
  }

  const endWithMessage = function (msg) {
    gameOver = true;
    statusMessage.innerHTML = msg;
    restartButton.style.visibility = "visible";
  }

  const restartGame = function () {
    statusMessage.innerHTML = "";
    restartButton.style.visibility = "hidden";
    for (let i = 0, len = cells.length; i < len; i++) {
      cells[i].classList.remove(PLAYER_1,PLAYER_2,CLASS_VISITED,CLASS_SELECTED,CLASS_SELECTED_NOT_VISITED);
    }
    ownership[PLAYER_1] = [];
    ownership[PLAYER_2] = [];
    gameOver = false;
    curPlayer = PLAYER_1;
  }

  const isDrawGame = function () {
    return ownership[PLAYER_1].length + ownership[PLAYER_2].length === 9;
  }

  const didcurPlayerWin = function () {
    const ownedCells = ownership[curPlayer];

    if (ownedCells.length < 3) {
      return false;
    }

    return WINNING_SETS.filter(function (set) {
        return set.filter(function (num) {
            return ownedCells.indexOf(num) >= 0;
          }).length >= 3;
      }).length > 0;
  }

  const togglecurPlayer = function () {
    curPlayer = curPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
  }

  // public methods
  const game = {};
  game.start = function () {
    addCellListeners();
    addMouseOverEvents();
    addKeyPressListener();
  };
  game.restart = function() {
    restartGame();
  }
  return game;

})();

document.addEventListener('DOMContentLoaded', TicTacToe.start)
