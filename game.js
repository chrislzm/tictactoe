const TicTacToe = (function () {
  const game = {};

  // private variables
  const cells = document.getElementsByClassName('cell');
  let currentPlayer = 'x';
  let ownership = {
    x: [],
    o: []
  };
  const winningSets = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  // private methods
  function endGameIfOver() {
    if (hasCurrentPlayerWon()) {
      endWithMessage('Player ' + currentPlayer + ' has won!');
    } else if (hasNoWinner()) {
      endWithMessage('It\'s a draw!');
    } else {
      toggleCurrentPlayer();
    }
  }

  function hasNoWinner() {
    return ownership['x'].length + ownership['o'].length === 9;
  }

  function endWithMessage(msg) {
    alert(msg);

    for (let i = 0, len = cells.length; i < len; i++) {
      cells[i].classList.remove('x','o','visited');
    }
    ownership.x = [];
    ownership.o = [];
  }

  function hasCurrentPlayerWon() {
    const ownedCells = ownership[currentPlayer];

    if (ownedCells.length < 3) {
      return false;
    }

    return winningSets.filter(function (set) {
        return set.filter(function (num) {
            return ownedCells.indexOf(num) >= 0;
          }).length >= 3;
      }).length > 0;
  }

  function toggleCurrentPlayer() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  }

  function addCellListeners() {
    const board = document.getElementById('board');
    board.addEventListener('click', function (e) {
      const cell = e.target;
      if (!cell.classList.contains('visited')) {
        cell.classList.add(currentPlayer, 'visited');
        ownership[currentPlayer].push(parseInt(cell.getAttribute('data-id'), 10));
        endGameIfOver();
      }
    });
  }

  // public methods
  game.start = function () {
    addCellListeners();
  };

  return game;
})();

document.addEventListener('DOMContentLoaded', TicTacToe.start)
