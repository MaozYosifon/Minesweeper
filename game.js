'use strick';
//the model:

const EMPTY = '';
const bomb = '💣';
var gBoard;
var gFirstClick = true;

var gGame = {
    score: 0,
    isOn: false,
    SIZE: 4,
};

//This is called when page loads
function init() {
    gBoard = buildBoard();
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
    return board;
}

// Render the board as a <table> to the page
function renderBoard(board) {
    // create the strHTML var that holds the board
    var strHTML = `<table border="1"><tbody>`;
    // Run on all rows
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        // For each row, run on all columns
        for (var j = 0; j < board[i].length; j++) {
            var corrCell;
            board[i][j].isMine ? (corrCell = bomb) : (corrCell = EMPTY);
            if (!gFirstClick) {
                board[i][j].isMine
                    ? (corrCell = bomb)
                    : (corrCell = gBoard[i][j].minesAroundCount);
            }
            var className = 'cell cell-' + i + '-' + j;
            strHTML += `<td class="${className}"
                onclick="cellClicked (this ,${i},${j})">${corrCell} <img src="photo/${'facingDown'}.png" width="30px" height="30px" /></td>`;
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
            if (board[i][j].isMine) count++;
        }
    }
    return count;
}

function countNegBombs() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) continue;
            var minesAround = setMinesNegsCount(gBoard, i, j);
            gBoard[i][j].minesAroundCount = minesAround;
            // console.log(i + '-' + j, minesAround);
            // console.log(gBoard);
        }
    }
}

//Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    if (gFirstClick) {
        gFirstClick = false;
        placeBombs(i, j, 10);
        countNegBombs(i, j);
    }
    cellMarked(elCell);
    elCell.innerText = gBoard[i][j].minesAroundCount;
    // console.log(gBoard[i][j].minesAroundCount);
    gBoard[i][j].isShown = true;
    renderBoard(gBoard);
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

//placeBombs accepts the first clicked location (i,j) and the number of
// bombs to place.
// It then randomly place the amount of bombs on the board, making sure
// that there are no bomb placed in the first clicked location
function placeBombs(i, j, bombsNum) {
    if (bombsNum > gBoard.length * gBoard.length - 1) {
        console.log(
            'the number of the bombs is bigger then the number of the cells '
        );
        return;
    }
    bombArr = [];
    for (var cellRow = 0; cellRow < gBoard.length; cellRow++) {
        for (var cellColl = 0; cellColl < gBoard[cellRow].length; cellColl++) {
            if (cellRow === i && cellColl === j) continue;
            bombArr.push({ row: cellRow, coll: cellColl });
        }
    }

    for (var x = 0; x < bombsNum; x++) {
        var randIndexBomb = getRandomIntInclusive(0, bombArr.length - 1);
        var firstBombLocation = bombArr[randIndexBomb];
        bombArr.splice(randIndexBomb, 1);
        gBoard[firstBombLocation.row][firstBombLocation.coll].isMine = true;
    }
}

function corrPhoto() {}
