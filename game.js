import isTouching from "/isTouching.js"
import drawGrid from "/drawGrid.js"

window.onload = startGame

let canvas, ctx, gameLoop, stopGame


let player = {
	name: "player",
	width: 100,
	height: 100,
	x: 300,
	y: 300,
	color: "white",
	hidden: false,

}

let enemy = {
	name: "enemy",
	width: 100,
	height: 100,
	x: 100,
	y: 100,
	color: "red",
	hidden: false,


}

// cache inputs
let keys = [];

window.onkeydown = function(e) {
	keys[e.key] = true;
};

window.onkeyup = function(e) {
	keys[e.key] = false;
};


function startGame() {
	canvas = document.getElementById("gamecanvas");
	ctx = canvas.getContext("2d");

	let fps = 1000 / 30;
	gameLoop = window.setInterval(update, fps);



}

function update() {
	if (stopGame) {
		window.clearInterval(gameLoop)
	} else {


		handleInput();
		handleCollisions();
		drawFrame();
	}
}

// handle inputs, handle player, handle enemies, etc
function handleInput() {
	if (keys["ArrowRight"]) {
		player.x += 10;
	}
	if (keys["ArrowLeft"]) {
		player.x -= 10;
	}
	if (keys["ArrowUp"]) {
		player.y -= 10;
	}
	if (keys["ArrowDown"]) {
		player.y += 10;
	}

}

// draw our game to the canvas
function drawFrame() {

	drawBackground();
	drawPlayer();
	drawEnemy();

}

function drawBackground() {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	drawGrid(ctx);

}



function drawPlayer() {
	ctx.fillStyle = player.color;
	ctx.fillRect(player.x, player.y, player.width, player.height);
	ctx.fillStyle = "black";
	ctx.font = "12px monospace";
	ctx.fillText(player.name, player.x + 20, player.y + 55);
}

function drawEnemy() {
	ctx.fillStyle = enemy.color;
	ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
	ctx.fillStyle = "white";
	ctx.font = "12px monospace";
	ctx.fillText(enemy.name, enemy.x + 20, enemy.y + 55);
}

function handleCollisions() {
	if (isTouching(player, enemy)) {
		player.color = "orange";
		enemy.color = "orange";
		enemy.name = "isTouching";
		player.name = "isTouching";
	} else {
		player.color = "white";
		enemy.color = "purple";
		enemy.name = "enemy";
		player.name = "player";
	}
	checkBoundaries(player);
	checkBoundaries(enemy);
}

function checkBoundaries(sprite) {
	if (sprite.x >= canvas.width - sprite.width) {
		sprite.x = canvas.width - sprite.width;
	}
	if (sprite.x <= 0) {
		sprite.x = 0;
	}
	if (sprite.y <= 0) {
		sprite.y = 0;
	}
	if (sprite.y >= canvas.height - sprite.height) {
		sprite.y = canvas.height - sprite.height;
	}
}


