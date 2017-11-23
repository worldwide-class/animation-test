// JavaScript Document

////// Variables //////
var canvas = { width:1200, height:800 };
var score = 0;

var player = {
	x: canvas.width/2,
	y: canvas.height-100,
	speed: 2
};

var rocket = {
	x: 0,
	y: 0,
	speed: 2.5
};

var activeRockets = [];

var LEFT = false; 
var RIGHT = false;
var UP = false; 
var DOWN = false;
var SPACE = false;
var XKEY = false;


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
	if (SPACE) {
		fireRocket();
	}
}

document.onkeydown = function(e) {
	if(e.keyCode == 37) LEFT = true;
	if(e.keyCode == 38) UP = true;
	if(e.keyCode == 39) RIGHT = true;
	if(e.keyCode == 40) DOWN = true;
	if(e.keyCode == 88) XKEY = true;
 }

document.onkeyup = function(e) {
	if(e.keyCode == 37) LEFT = false;
	if(e.keyCode == 38) UP = false;
	if(e.keyCode == 39) RIGHT = false;
	if(e.keyCode == 40) DOWN = false;
	if(e.keyCode == 88) XKEY = false;
}

document.onkeypress = function(e) {
	if (e.keyCode == 32) {
		fireRocket();
	}
}


////// other functions //////

function blammo(){
	if (XKEY) {
		fireLaser();
	}
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

function fireRocket() {

	// console.log(activeRockets)

		rocket.x = player.x;
		rocket.y = player.y;
		var newRocketIndex = activeRockets.length + 1;

		var newRocket = new drawRocket(newRocketIndex);
		console.log(newRocket.y)
		// newRocket.beginPath();
		// newRocket.moveTo(rocket.x, rocket.y);
		// newRocket.fillStyle = "red";
		// newRocket.arc(rocket.x, rocket.y, 3, 0, Math.PI*2, true);
		// newRocket.fill();
		// newRocket.closePath();
		activeRockets.push(newRocket);

}

function drawRocket(index) {

	this.x = player.x;
	this.y = player.y;
	ctx.beginPath();
	ctx.moveTo(player.x, player.y);
	ctx.fillStyle = "red";
	ctx.arc(player.x, player.y, 3, 0, Math.PI*2, true);
	ctx.fill();
	ctx.closePath();
}

function reDrawRockets(index) {
	ctx.beginPath();
	ctx.moveTo(activeRockets[index].x, activeRockets[index].y);
	ctx.fillStyle = "red";
	ctx.arc(activeRockets[index].x, activeRockets[index].y, 3, 0, Math.PI*2, true);
	ctx.fill();
	ctx.closePath();
}

function moveRockets() {

	for (var i = 0; i < activeRockets.length; i++) {
		activeRockets[i].y = activeRockets[i].y - 1;
		reDrawRockets(i);
	}

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
	blammo();
	moveRockets();
}