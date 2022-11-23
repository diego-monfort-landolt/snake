//zuweisung auf die html id canvas
let canvas = document.getElementById('canvas');

//mit diesem befehl erstelld man eine 2 d zeichnungs flaeche
let ctx = canvas.getContext('2d');
//variablen von linien columnene schlange esen und wo sie plaziert werden
let rows = 20;
let cols = 20;
let snake =[{x:4, y:5}] ;
let food = {x:4, y:5};
let celWidth = canvas.width / cols;
let celHeight = canvas.height / cols;
let direction = 'left';
let foodCollected = false;




placeFood(); // essen der snake
setInterval(gameLoop, 250); // geschwindigkeit schlange
document.addEventListener('keydown', keyDown); // eventlistener tasten upddown..

draw(); // start ganzes canvas und alle elemente drin






function draw() 
{

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle= 'white';

snake.forEach(part => add(part.x, part.y));


ctx.fillStyle= 'green';
add(food.x, food.y);

requestAnimationFrame(draw); //repeat

}
// mit der add function wird weniger code geschriben im draw -eine ganze linie pro add ctx.fillRect(x, y, 30 - 1, 30 -1) wird hier gespart...
function add(x, y) {
    ctx.fillRect(x *celWidth, y * celHeight, celWidth - 1, celHeight -1);

}

function shiftSnake() {
    for (let i = snake.length -1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;
        
    }
}


function gameLoop() {
    testGameOver(); //gameover
   
    if (foodCollected) {
        snake = [{x: snake[0].x, y: snake[0].y
        }, ...snake ];
        foodCollected = false;

    } 
    shiftSnake();//snake wird groesser

    if (direction == 'left'){
        snake[0].x--; 
    }
    if (direction == 'right'){
        snake[0].x++; 
    }
    if (direction == 'up'){
        snake[0].y--; 
    }
    if (direction == 'down'){
        snake[0].y++; 
    }

    if(snake[0].x == food.x &&
       snake[0].y == food.y) {
        foodCollected = true;
        //futter einsameln
        placeFood();

    }

}// hier greifen wir auf den teil 0 der snake zu und gehen X

function keyDown(e){
    if (e.keyCode == 37){
        direction = 'left';
    }
    if (e.keyCode == 38){
        direction = 'up';
    }
    if (e.keyCode == 39){
        direction = 'right';
    }
    if (e.keyCode == 40){
        direction = 'down';
    }
   
}
function testGameOver(){
let firstPart = snake[0];
let otherParts = snake.slice(1);
let duplicatPart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);

    //schlange gegen wand
    if(snake[0].x < 0 || snake[0].x > cols -1 || snake[0].y <0 || snake[0].y > rows -1 || duplicatPart)
    { 
        placeFood();
        snake = [{x:9, y:3}];
        direction = 'left';
    }
}



function placeFood(){
    let randomx = Math.floor(Math.random() * cols);
    let randomy= Math.floor(Math.random() * rows);

    food = {
        x: randomx, 
        y: randomy};
}