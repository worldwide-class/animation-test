// JavaScript Document

// Game Variables
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
var gorgon = {
	x: 200,
	y: 200,
	speed: 2,
	stopped : true
};

// Controller Assignments
var LEFT = false; 
var RIGHT = false;
var UP = false; 
var DOWN = false;
var SPACE = false;
var XKEY = false;

// Utility Functions
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


// Move the ship
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

// Key Commands
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

function blammo(){
	if (XKEY) {
		fireLaser();
	}
}

// Reset canvas
function clearCanvas() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

// Draw our sick ass ship
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

// Push new Rocket Into Array
function fireRocket() {
	rocket.x = player.x;
	rocket.y = player.y;
	var newRocketIndex = activeRockets.length + 1;
	var newRocket = new drawRocket(newRocketIndex);
	activeRockets.push(newRocket);
}

// Create a Rocket
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

// Draw the rockets on the screen
function reDrawRockets(index) {
	ctx.beginPath();
	ctx.moveTo(activeRockets[index].x, activeRockets[index].y);
	ctx.fillStyle = "red";
	ctx.arc(activeRockets[index].x, activeRockets[index].y, 3, 0, Math.PI*2, true);
	ctx.fill();
	ctx.closePath();
}

// redraw Rockets Interval
function moveRockets() {
	for (var i = 0; i < activeRockets.length; i++) {
		activeRockets[i].y = activeRockets[i].y - 5;
		reDrawRockets(i);
	}
}

// Blast that shit
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
	ctx.rect(gorgon.x, gorgon.y, 40, 20);
	ctx.fillStyle = 'green';
	ctx.fill();
	if ( gorgon.y == canvas.height - 20 ) {
		gorgon.stopped = true;
		resetGorgon(1000);
	};
}

// Let the Gorgon take a break
function resetGorgon (timeout){
	setTimeout(function(){
		gorgon.x = getRandomIntHorizontalWidth();
		gorgon.y = 0;
		gorgon.stopped = false;
	}, timeout);
}

// Start the Game!
setInterval (update, 10);
resetGorgon(1000);

function update() {
	clearCanvas();
	ship();
	move();
	laser();
	blammo();
	moveRockets();
	releaseTheGorgon();
}