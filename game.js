const TicTacToe = (function () {

  // constants - consider moving to separate file
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
  const ID_BOARD = 'board';
  const ATTRIBUTE_CELL_ID = 'cell-id';
  const MESSAGE_PLAYER_TAG = '{player}';
  const MESSAGE_WIN = 'Player ' + MESSAGE_PLAYER_TAG + ' has won!';
  const MESSAGE_DRAW = 'It\'s a draw!';

  // private variables
  const cells = document.getElementsByClassName(CLASS_CELL);
  const ownership = {};
  ownership[PLAYER_1] = [];
  ownership[PLAYER_2] = [];
  let currentPlayer = PLAYER_1;

  // private methods
  const addCellListeners = function () {
    const board = document.getElementById(ID_BOARD);
    board.addEventListener('click', function (e) {
      const cell = e.target;
      if (!cell.classList.contains(CLASS_VISITED)) {
        cell.classList.add(currentPlayer,CLASS_VISITED);
        ownership[currentPlayer].push(parseInt(cell.dataset.id, 10));
        continueGame();
      }
    });
  }

  const continueGame = function () {

    if(didCurrentPlayerWin()) {
      endWithMessage(MESSAGE_WIN.replace(MESSAGE_PLAYER_TAG,currentPlayer));
    } else if(isDrawGame()) {
      endWithMessage(MESSAGE_DRAW);
    } else {
      toggleCurrentPlayer();
    }
  }

  const endWithMessage = function (msg) {
    alert(msg);

    for (let i = 0, len = cells.length; i < len; i++) {
      cells[i].classList.remove(PLAYER_1,PLAYER_2,CLASS_VISITED);
    }
    ownership[PLAYER_1] = [];
    ownership[PLAYER_2] = [];
  }

  const isDrawGame = function () {
    return ownership[PLAYER_1].length + ownership[PLAYER_2].length === 9;
  }

  const didCurrentPlayerWin = function () {
    const ownedCells = ownership[currentPlayer];

    if (ownedCells.length < 3) {
      return false;
    }

    return WINNING_SETS.filter(function (set) {
        return set.filter(function (num) {
            return ownedCells.indexOf(num) >= 0;
          }).length >= 3;
      }).length > 0;
  }

  const toggleCurrentPlayer = function () {
    currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
  }

  const addHoverMouseEvents = function () {
    for (let i = 0, len = cells.length; i < len; i++) {
      const cell = cells[i];
      cell.onmouseover = function() {
        if(!cell.classList.contains(CLASS_VISITED)) {
          cell.classList.add(currentPlayer);
        }
      }
      cell.onmouseout = function() {
        if(!cell.classList.contains(CLASS_VISITED)) {
          cell.classList.remove(currentPlayer);
        }
      }
    }
  }

  // public methods
  const game = {};
  game.start = function () {
    addCellListeners();
    addHoverMouseEvents();
  };
  return game;

})();

document.addEventListener('DOMContentLoaded', TicTacToe.start)
