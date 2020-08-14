var canvas;
var ctx;

// "sprites"
var head;
var apple;
var ball;

//length of snake
var snakeLength;
//positions of apple
var appleX;
var appleY;

//direction that snake travels in 
//right direction by default
var rightDirection = true;
var leftDirection = false;
var upDirection = false;
var downDirection = false;
var inGame = true;    

//constants for the dots that represent snakeLength
const DOT_SIZE = 10;
//max number of dots
const ALL_DOTS = 900;
const MAX_RAND = 39;
//delay between frames, speed of game
const DELAY = 75;

//dimmensions of canvas
const C_HEIGHT = 400;
const C_WIDTH = 400;    

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

//coordinated of each segment of snake
var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);   

function init() 
{
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();
    setTimeout("gameCycle()", DELAY);
}    

//loads sprites
function loadImages() 
{
    head = new Image();
    head.src = 'head.png'
       
    
    ball = new Image();
    ball.src = 'dot.png'
    
    
    apple = new Image();
    apple.src = 'apple.png'
    
}

//creates snake at start of game
function createSnake() 
{
    snakeLength = 3;

    for (var i = 0; i < snakeLength; i++) {
        x[i] = 50 - i * 10;
        y[i] = 50;
    }
}


function checkApple()
{
    ///increses snake length if head is at apple coords
    if ((x[0] == appleX) && (y[0] == appleY)) 
    {
        snakeLength++;
        locateApple();
    }
}    

function doDrawing() 
{
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);
    
    if (inGame) 
    {
        ctx.drawImage(apple, appleX, appleY);
        for (var i = 0; i < snakeLength; i++)
        {
            if (i == 0) 
                ctx.drawImage(head, x[i], y[i]);
            else 
                ctx.drawImage(ball, x[i], y[i]);     
        }    
    } else
        gameOver();
         
}

//displays game over text
function gameOver() 
{
    
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 18px serif';
    ctx.fillText('Game over', C_WIDTH/2, C_HEIGHT/2);
}

function move() 
{
    for (var i = snakeLength; i > 0; i--) 
    {
        x[i] = x[(i - 1)];
        y[i] = y[(i - 1)];
    }

    if (leftDirection) 
    {
        x[0] -= DOT_SIZE;
    }

    if (rightDirection) 
    {
        x[0] += DOT_SIZE;
    }

    if (upDirection) 
    {
        y[0] -= DOT_SIZE;
    }

    if (downDirection) 
    {
        y[0] += DOT_SIZE;
    }
}    

function checkCollision() 
{
    for (var i = snakeLength; i > 0; i--) 
        if ((i > 4) && (x[0] == x[i]) && (y[0] == y[i])) 
            inGame = false;
    if (y[0] >= C_HEIGHT) 
        inGame = false;
    if (y[0] < 0) 
       inGame = false;
    if (x[0] >= C_WIDTH) 
      inGame = false;
    if (x[0] < 0) 
      inGame = false;
    
}

function locateApple() 
{
    var r = Math.floor(Math.random() * MAX_RAND);
    appleX = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    appleY = r * DOT_SIZE;
}    


function gameCycle() 
{
    if (inGame) 
    {
        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e) 
{
    var key = e.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) 
    {
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection))
    {
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) 
    {
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) 
    {
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
};    