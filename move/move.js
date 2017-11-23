// JavaScript Document

////// Variables //////
var canvas = { width:1200, height:800 };
var score = 0;

var player = {
	x: canvas.width/2,
	y: canvas.height-100,
	speed: 2
};

var LEFT = false; 
var RIGHT = false;
var UP = false; 
var DOWN = false;
var FIRE = false;


////// Arrow keys //////

function move() {
	
	// console.log(player.x);
	// console.log(canvas.width);gi


	if(LEFT) { 

		if ( player.x <= 0 ){
			return;
		}

		player.x -= player.speed;
	}
	if(UP) { 

		if ( player.y <= 0 ){
			return;
		}

		player.y -= player.speed;
	}	
	if(RIGHT) {

		if ( player.x >= (canvas.width) ){
			return;
		}

		player.x += player.speed;	
	}
	if(DOWN) {

		if ( player.y >= canvas.height - 20 ){
			return;
		}

		player.y += player.speed;	
	}	
}

function laser() {
	if (FIRE) {
		fireLaser();
	}
}

document.onkeydown = function(e) {
	e.preventDefault();
	if(e.keyCode == 37) LEFT = true;
	if(e.keyCode == 38) UP = true;
	if(e.keyCode == 39) RIGHT = true;
	if(e.keyCode == 40) DOWN = true;
	if(e.keyCode == 32) FIRE = true;
 }

document.onkeyup = function(e) {
	e.preventDefault();
	if(e.keyCode == 37) LEFT = false;
	if(e.keyCode == 38) UP = false;
	if(e.keyCode == 39) RIGHT = false;
	if(e.keyCode == 40) DOWN = false;
	if(e.keyCode == 32) FIRE = false;
}


////// other functions //////


//function to clear canvas
function clearCanvas() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

// Draw Player ship.
function ship(x,y) {
	var x = player.x;
	var y = player.y;

	ctx.fillStyle = "#FFFFFF";

	ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+15,y+50);
    ctx.lineTo(x-15,y+50);
    ctx.fill();
}

// Player ship's laser

function fireLaser() {
	var x = player.x;
	var y = player.y;


	ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 5;
		ctx.lineTo(x, 0);
		ctx.stroke()
}

// update

setInterval (update, 10);

function update() {
	clearCanvas();
	ship();
	move();
	laser();
}