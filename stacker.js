let canvas;
let ctx;
let bHeight = 12;
let bWidth = 7;
let board = Array.from(Array(bHeight), () => new Array(bWidth)) //the board has 0's where there are no pieces and 1 where there are
let squareSize = 50;
let cWidth = 800;
let cHeight = 800;
let sx = (cWidth - (bWidth * squareSize)) / 2; //starting x value for board (from left)
let sy = 25; //starting y value for board (from top)
let starts = [2, 4, 1, 0, 3, 2, 3, 0, 1, 2, 1, 3] //positions where left most piece starts from on each line going from top to bottom
let curY = bHeight - 1;
let curX = starts[curY];
let curSize = 3; //how many pieces to display on row
let velocity = 1; //1 if piece is moving right, -1 if left
let paused = false;

document.addEventListener('DOMContentLoaded', setupCanvas);


function setupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = cWidth;
    canvas.height = cHeight;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, cWidth, cHeight);

    
    ctx.fillStyle = 'gray';
    //fill board background
    ctx.fillRect(sx, sy, bWidth*squareSize, bHeight*squareSize);

    ctx.strokeStyle = 'black';
    //draw board border depending on size of board grid
    ctx.strokeRect(sx, sy, bWidth*squareSize, bHeight*squareSize);


    //fill up the board with a grid
    for(let i = 0; i < bHeight; i++){
        for(let j = 0; j < bWidth; j++){
            ctx.strokeRect(sx + j*squareSize, sy + i*squareSize, squareSize, squareSize);
        }
    }

    //set starting values for board
    for(let i = 0; i < bHeight; i++){
        for(let j = 0; j < bWidth; j++){
            board[i][j] = 0;
        }
    }
    board[curY][curX] = 1;
    board[curY][curX+1] = 1;
    board[curY][curX+2] = 1;

    //handle keyboard presses
    document.addEventListener('keydown', handleKeyPress);
}


window.setInterval(function(){
    move();
  }, 250);


function stopPiece(){

    //make sure we start with only as many pieces landed on the board
    pieceCount = 0;
    for(let i = 0; i < bWidth; i++){
        if(board[curY][i] === 1){
            pieceCount++;
        }
    }
    curSize = pieceCount;

    //check for pieces that are off the stack
    if(curY < bHeight - 1){
        for(let i = 0; i < bWidth; i++){
            if(board[curY][i] === 1 && board[curY+1][i] === 0){
                board[curY][i] = 0;
                drawSquare('gray', i, curY);
                curSize--;
                console.log(curSize);
            }
        }
    }

    velocity = 1;

    curY--;
    if(curY < 0)
        endGame('You have won!');
    curX = starts[curY];
}


function endGame(condition){
    paused = true;
    console.log(condition)
}


function drawSquare(color, x, y){
    ctx.fillStyle = color;
    ctx.fillRect(sx + x * squareSize + 1, sy + y * squareSize + 1, squareSize - 2, squareSize - 2);
}


function drawRow(row){
    for(let i = 0; i < bWidth; i++){
        if(board[row][i] === 0)
            drawSquare('gray', i, row);
        else
            drawSquare('red', i, row);
    }
}


function move(){

    if(paused === false){
        if(curSize === 0){
            endGame('You have lost!');
        }

        //wipe current row
        for(let i = 0; i < bWidth; i++){
            board[curY][i] = 0;
        }

        let pieceCount = 0;
        if(curX < bWidth && curX >= 0 && curSize > 0)
            board[curY][curX] = 1;
        if(bHeight - curY <= 6 && curSize > 1 && curX+1 < bWidth && curX+1 >= 0) //there should be at least 2 pieces on this row
            board[curY][curX+1] = 1;
        if(bHeight - curY <= 3 && curSize > 2 && curX+2 < bWidth && curX+2 >= 0) //there should be 3 pieces on this row
            board[curY][curX+2] = 1;

        drawRow(curY);

        if(curX == bWidth-1)
            velocity = -1;
        else if(curX+curSize-1 <= 0)
            velocity = 1;
        curX += velocity;
    }
}


function handleKeyPress(key){
    if (key.keyCode === 32 && paused === false)
        stopPiece();
}