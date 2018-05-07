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

  // private variables
  const ownership = {};
  ownership[PLAYER_1] = [];
  ownership[PLAYER_2] = [];
  let currentPlayer = PLAYER_1;

  // private methods
  const addCellListeners = function () {
    const board = document.getElementById('board');
    board.addEventListener('click', function (e) {
      const cell = e.target;
      if (!cell.classList.contains('visited')) {
        cell.classList.add(currentPlayer);
        ownership[currentPlayer].push(parseInt(cell.getAttribute('data-id'), 10));
        endGameIfOver();
      }
    });
  }

  const endGameIfOver = function () {
    if (hasCurrentPlayerWon()) {
      endWithMessage('Player ' + currentPlayer + ' has won!');
    } else if (hasNoWinner()) {
      endWithMessage('It\'s a draw!');
    } else {
      toggleCurrentPlayer();
    }
  }

  const hasNoWinner = function () {
    return ownership[PLAYER_1].length + ownership[PLAYER_2].length === 9;
  }

  const endWithMessage = function (msg) {
    alert(msg);

    const cells = document.getElementsByClassName('cell');

    for (let i = 0, len = cells.length; i < len; i++) {
      cells[i].classList.remove(PLAYER_1,PLAYER_2,'visited');
    }
    ownership.x = [];
    ownership.o = [];
  }

  const hasCurrentPlayerWon = function () {
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

  // public methods
  const game = {};
  game.start = function () {
    addCellListeners();
  };
  return game;

})();

document.addEventListener('DOMContentLoaded', TicTacToe.start)
