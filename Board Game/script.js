/*
checkerboard
have 2 icons, one is us, another one?
we will start in upper left corner
computer will start in bottom right corner
we will move our icon (using arrows)
computer will move
when computer catches us, game is over!

*/

const BOARD_SIZE = 8;
const boardSquare = [];

const player = {
    icon: '🤠',
    row: 0,
    column: 0,
    startRow: 0,
    startColumn: 0,
    collide: '☠️'
};

const computer = {
    icon: '🐍',
    row: BOARD_SIZE - 1,
    column: BOARD_SIZE - 1,
    StartRow: BOARD_SIZE - 1,
    startColumn: BOARD_SIZE - 1
};

document.addEventListener('DOMContentLoaded', () => {
    setUpBoard();
    //handle moves
    document.body.addEventListener('keyup', handleTurn);
    // handle reset
});

function setUpBoard() {

    //load the board size into css variabel --grid-size
    const html = document.querySelector('html');
    html.style.setProperty('--grid-size', BOARD_SIZE);
    //need to create the grid items
    //loop through BOARD_SIZE rows
    const checkerboard = document.getElementById('checkerboard');
    // const h2 = document.createElement('h2');
    // h2.innerText = "here";
    // checkerboard.appendChild(h2) ------//
    for (let row = 0; row < BOARD_SIZE; row++) {

        //through BOARD_SIZE columns
        boardSquare[row] = []
        for (let column = 0; column < BOARD_SIZE; column++) {
            const div = document.createElement('div');
            if ((row + column) % 2 === 1) {
                div.setAttribute('class', 'black');
            }
            checkerboard.appendChild(div);
            boardSquare[row][column] = div;
        }
    }

    //move our player onto the board in starting posisiton
    move(player, player.row, player.column);
    //move our computer onto the board in starting position
    move(computer, computer.row, computer.column);


}

function handleTurn(event) {
    //deal with user what key they pressed and move player
    handleKeyUp(event);
    //check to see if collision
    checkforCollision();
    //move computer
    moveComputer();
    //check to if collision
    checkforCollision();
}

function handleKeyUp(event) {
    if (event.key === 'ArrowLeft') {
        move(player, player.row, player.column - 1);
    }
    if (event.key === 'ArrowRight') {
        move(player, player.row, player.column + 1);
    }
    if (event.key === 'ArrowUp') {
        move(player, player.row - 1, player.column);
    }
    if (event.key === 'ArrowDown') {
        move(player, player.row + 1, player.column);
    }
}

function moveComputer() {
    //grab where the computer is now
    let row = computer.row;
    let column = computer.column;
    const randomMove = Math.floor(Math.random() * 4);
    if (randomMove == 0) {
        row++;
    }
    else if (randomMove == 1) {
        row--;
    }
    else if (randomMove == 2) {
        column++;
    }
    else {
        column--;
    }
    move(computer, row, column);
}
function checkforCollision() {

    if (player.row === computer.row && player.column === computer.column) {
        boardSquare[player.column].innerText = player.collide;
        boardSquare[player.column].style.backgroundColor = 'grey';

        //disable the key listner
        document.body.removeEventListener('keyup', handleTurn);
        // GAME OVER
    }
}




function move(character, row, column) {
    // row and column say where we are going
    if (row >= 0 && column >= 0 && row < BOARD_SIZE && column < BOARD_SIZE) {
        // clear character out of old location
        boardSquare[character.row][character.column].innerText = '';
        // add character to new location
        boardSquare[row][column].innerText = character.icon;
        // save character's new location
        character.row = row;
        character.column = column;
    }
}


