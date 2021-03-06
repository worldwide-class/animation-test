// JavaScript Document

// Game Variables
var canvas = { width:1200, height:800 };
var score = 0;
var firingLaser = false;

var player = {
	x: canvas.width/2,
	y: canvas.height-100,
	originalSpeed: 3,
	speed: 3,
	boostSpeed: 7,
	height:88, //height of the sprite
	width:62, // width of the sprite
	dead : false
};

var rocket = {
	x: 0,
	y: 0,
	speed: 5
};
var activeRockets = [];

var gorgon = {
	x: 200,
	y: 200,
	speed: 2,
	stopped : true,
	width: 40,
	height: 20,
	yFrame: 0,
	xFrame: 0,
	waitPeriod: 0
};

var activeGorgons = [];

var alienBoss = {
	x: 200,
	y: 200,
	speed: 1,
	stopped : true,
	width: 40,
	height: 20,
	yFrame: 0,
	xFrame: 0,
	waitPeriod: 0
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
  min = Math.ceil(canvas.width - 300);
  max = Math.floor(300);
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
	if(e.keyCode == 16) player.speed = player.boostSpeed;	
 }
document.onkeyup = function(e) {
	if(e.keyCode == 37) LEFT = false;
	if(e.keyCode == 38) UP = false;
	if(e.keyCode == 39) RIGHT = false;
	if(e.keyCode == 40) DOWN = false;
	if(e.keyCode == 88) XKEY = false;
	player.speed = player.originalSpeed;
	firingLaser = false;
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
	if ( player.dead ) return;
	var x = player.x - 30;
	var y = player.y;

      var imageObj = new Image();

      imageObj.onload = function() {
        ctx.drawImage(imageObj, x, y);
      };
      imageObj.src = 'images/spshipsprite.png';

	// ctx.fillStyle = "#FFFFFF";
	// ctx.beginPath();
	 //    ctx.moveTo(x,y);
	 //    ctx.lineTo(x+15,y+50);
	 //    ctx.lineTo(x-15,y+50);
	 //    ctx.fill();
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
	if ( activeRockets[index].y == 0 ) {
		activeRockets.pop(index);
		return;
	}
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
		activeRockets[i].y = activeRockets[i].y - rocket.speed;
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
	firingLaser = true;
}

// Release the Gorgon!!!
function releaseTheGorgon() {
	if ( gorgon.stopped ) return;
	gorgon.y = gorgon.y + gorgon.speed;

    var imageObj = new Image();
    imageObj.onload = function() {
    	var yFrame = gorgon.yFrame * 70;
    	ctx.drawImage(imageObj, yFrame, 0, 70, 70, gorgon.x, gorgon.y, 48, 60 );
    }
   	imageObj.src = 'images/asteroid.png';
   	if ( gorgon.waitPeriod == 6){
	   	gorgon.yFrame++;
	   	gorgon.waitPeriod = 0;
   	}
   	if ( gorgon.yFrame == 16 ){
   		gorgon.yFrame = 0;
   	}

   	gorgon.waitPeriod++;

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


function releaseAlienSpecies() {
	if ( alienBoss.stopped ) return;
	alienBoss.y = alienBoss.y + alienBoss.speed;

    var imageObj = new Image();
    imageObj.onload = function() {
    	var yFrame = alienBoss.yFrame * 70;
    	console.log(yFrame);
    	//ctx.drawImage(imageObj, yFrame, 0, 70, 70, alienBoss.x, alienBoss.y, 48, 60 );
    	ctx.drawImage(imageObj, alienBoss.x, alienBoss.y);
    }
   	imageObj.src = 'images/alien.png';
   	// if ( alienBoss.waitPeriod == 6){
	   // 	alienBoss.yFrame++;
	   // 	alienBoss.waitPeriod = 0;
   	// }
   	// if ( alienBoss.yFrame == 16 ){
   	// 	alienBoss.yFrame = 0;
   	// }

   	// alienBoss.waitPeriod++;

	if ( alienBoss.y == canvas.height - 20 ) {
		alienBoss.stopped = true;
		resetAlienBoss(1000);
		return
	};	
}

// Let the Gorgon take a break
function resetAlienBoss (timeout){ 
	setTimeout(function(){
		alienBoss.x = canvas.width/2 - 100;
		alienBoss.y = 0;
		alienBoss.stopped = false;
	}, timeout);
}



function detectCollision() {
	// For Rockets & Gorgons
	for ( var i = 0; i < activeRockets.length; i++){
		if ( activeRockets[i].x > gorgon.x 
			&& activeRockets[i].x < (gorgon.x + gorgon.width)
			&& activeRockets[i].y < gorgon.y
			&& activeRockets[i].y > (gorgon.y - gorgon.height)) {
			incrementScore();
			gorgon.stopped = true;
			activeRockets.pop(i);
			resetGorgon();			
		}
	}

	// For Laser & Gorgons
	if ( firingLaser ) {
		if ( player.x > gorgon.x && player.x < gorgon.x + gorgon.width ) {
			incrementScore();
			gorgon.stopped = true;
			resetGorgon();
		}
	}

	// For Gorgons Killing Us
	if ( gorgon.x > (player.x - 20) && gorgon.x < (player.x + 20)&& gorgon.y > player.y && gorgon.y < player.y + player.height) {
		console.log('you are fucking dead');
		player.dead = true;
		clearInterval(gameInterval);
		showDeathMessage();
	}

}

function drawShipTracker(){
	var x = player.x;
	var y = player.y;	
	ctx.beginPath();
	ctx.strokeStyle = 'pink';
	ctx.moveTo(x,y);
	ctx.lineTo(x+player.width/2, y+player.height);
	ctx.lineTo(x-player.width/2, y+player.height);
	ctx.lineTo(x,y);
	ctx.stroke();

}


function incrementScore(){
	score++;
	document.getElementById("scoreTotal").innerHTML = score;
	if ( score == 5 ){
		releaseAlienSpecies();
	}

}

function showDeathMessage(){
	document.getElementById("deathMessage").className = "visible";
}


// Start the Game!
var gameInterval = setInterval (update, 10);
resetGorgon(1000);
//resetAlienBoss(1000);

sprites = new Image();
sprites.src = 'images/GORGON.png';

function update() {
	clearCanvas();
	ship();
	move();
	laser();
	blammo();
	moveRockets();
	detectCollision();
	releaseTheGorgon();
	drawShipTracker();
	//releaseAlienSpecies();
}