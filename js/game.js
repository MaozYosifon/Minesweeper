'use strick';
//the model:

const EMPTY = '';
const bomb = '💣';
var gBoard;

var gGame = {
    score: 0,
    isOn: false,
    SIZE: 4,
};

//This is called when page loads
function init() {
    gBoard = buildBoard();
    // printMat(gBoard, '.board-container');
    renderBoard(gBoard);
}

function createCell() {
    return {
        minesAroundCount: null,
        isShown: false,
        isMine: false,
        isMarked: true,
    };
}

// Builds the board Set mines at random locations
// Call setMinesNegsCount() Return the created board
function buildBoard() {
    var SIZE = 4;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = createCell();
        }
    }
    console.log('board', board);
    board[1][1].isMine = true;
    board[3][2].isMine = true;
    return board;
}

// Render the board as a <table> to the page
function renderBoard(board) {
    // create the strHTML var that holds the board
    var strHTML = `<table border="2"><tbody>`;
    // Run on all rows
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        // For each row, run on all columns
        for (var j = 0; j < board[i].length; j++) {
            var corrCell;
            board[i][j].isMine ? (corrCell = bomb) : (corrCell = EMPTY);
            var className = 'cell cell-' + i + '-' + j;
            strHTML += `<td class="${className}"
                onclick="cellClicked(this ,${i},${j})">${corrCell}</td>`;
        }
        strHTML += `</tr>`;
    }
    strHTML += `</tbody></table>`;
    var elBoard = document.querySelector('.board-container');
    elBoard.innerHTML = strHTML;
}

// Count mines around each cell and set the cell's minesAroundCount.
function setMinesNegsCount(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (board[i][j] === bomb) count++;
        }
    }
    return count;
}

//Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    console.log(i);
    console.log(j);
    // console.log(elcell);
    console.log('gBoard[i][j]', gBoard[i][j]);
    gBoard[i][j].isShown = true;

    console.log('gBoard[i][j]', gBoard[i][j]);
}

//Called on right click to mark a cell (suspected to be a mine) Search
// the web (and implement) how to hide the context menu on right click
function cellMarked(elCell) {}

//Game ends when all mines are marked, and all the other cells are shown
function checkGameOver() {}

//When user clicks a cell with no mines around, we need to open
// not only that cell, but also its neighbors.

// NOTE: start with a basic implementation that only opens
// the non-mine 1st degree neighbors
// BONUS: if you have the time later, try to work more like the
// real algorithm (see description at the Bonuses section below)
function expandShown(board, elCell, i, j) {}
