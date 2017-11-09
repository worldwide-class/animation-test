// JavaScript Document

////// Variables //////
var canvas = {width:300, height:300 };
var score = 0;

var player = {
	x:canvas.width/2,
	y:canvas.height-100,
	speed: 3
};

var LEFT = false; 
var RIGHT = false;
var UP = false; 
var DOWN = false;


////// Arrow keys //////

function move() {
	
	if(LEFT) { 
		player.x -= player.speed;
	}
	if(UP) { 
		player.y -= player.speed;
	}	
	if(RIGHT) {
		player.x += player.speed;	
	}
	if(DOWN) {
		player.y += player.speed;	
	}	
}

document.onkeydown = function(e) {

	console.log(e.keyCode);

	if(e.keyCode == 37) LEFT = true;
	if(e.keyCode == 38) UP = true;
	if(e.keyCode == 39) RIGHT = true;
	if(e.keyCode == 40) DOWN = true;
}

document.onkeyup = function(e) {
	if(e.keyCode == 37) LEFT = false;
	if(e.keyCode == 38) UP = false;
	if(e.keyCode == 39) RIGHT = false;
	if(e.keyCode == 40) DOWN = false;
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

// update

setInterval (update, 10);

function update() {
	clearCanvas();
	ship();
    move();
}