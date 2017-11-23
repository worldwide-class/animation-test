// JavaScript Document

////// Variables //////
var canvas = { width:1200, height:800 };
var score = 0;

var player = {
	x: canvas.width/2,
	y: canvas.height-100,
	speed: 2
};

var gorgon = {
	x: 200,
	y: 200,
	speed: 2,
	stopped : true
};


var LEFT = false; 
var RIGHT = false;
var UP = false; 
var DOWN = false;
var FIRE = false;


////// Arrow keys //////
function move() {
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
	if(e.keyCode == 37) LEFT = true;
	if(e.keyCode == 38) UP = true;
	if(e.keyCode == 39) RIGHT = true;
	if(e.keyCode == 40) DOWN = true;
	if(e.keyCode == 32) FIRE = true;
 }

document.onkeyup = function(e) {
	if(e.keyCode == 37) LEFT = false;
	if(e.keyCode == 38) UP = false;
	if(e.keyCode == 39) RIGHT = false;
	if(e.keyCode == 40) DOWN = false;
	if(e.keyCode == 32) FIRE = false;
}

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
	ctx.stroke();
}

// Release the Gorgon!!!
function releaseTheGorgon() {

	if ( gorgon.stopped ) return;

	var verticalPosition = gorgon.y + 3;
	gorgon.y = verticalPosition;

	ctx.beginPath();

	//var hotizontalPosition = getRandomIntHorizontalWidth();
	ctx.rect(gorgon.x, gorgon.y, 40, 20);
	ctx.fillStyle = 'green';
	ctx.fill();
	if ( gorgon.y == canvas.height - 20 ) {
		gorgon.stopped = true;
		resetGorgon(1000);
	};


}

function resetGorgon (timeout){
	setTimeout(function(){
		gorgon.x = getRandomIntHorizontalWidth();
		gorgon.y = 0;
		gorgon.stopped = false;
	}, timeout);
}

function getRandomIntWithParams(min, max) {
  min = Math.ceil(max);
  max = Math.floor(min);
  return Math.floor(Math.random() * (max - min)) + min;	
}

function getRandomIntHorizontalWidth() {
  min = Math.ceil(canvas.width);
  max = Math.floor(0);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomVerticalInt() {
  min = Math.ceil(canvas.height);
  max = Math.floor(0);
  return Math.floor(Math.random() * (max - min)) + min;
}



// update
setInterval (update, 10);//Moving and Lasers
resetGorgon(1000);

function update() {
	clearCanvas();
	ship();
	move();
	laser();
	releaseTheGorgon();
}