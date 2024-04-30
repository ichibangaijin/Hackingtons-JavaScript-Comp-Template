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

window.onkeydown = (e) => {
	keys[e.key] = true;
};

window.onkeyup = (e) => {
	keys[e.key] = false;
};


function startGame() {
	canvas = document.getElementById("gamecanvas");
	ctx = canvas.getContext("2d");

	let fps = 1000 / 30;
	gameLoop = window.setInterval(update, fps);



}

const update = () => {
	if (stopGame) {
		window.clearInterval(gameLoop)
	} else {


		handleInput();
		handleCollisions();
		drawFrame();
	}
}

// handle inputs, handle player, handle enemies, etc
const handleInput = () => {
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
	drawSprite(player);
	drawSprite(enemy)


}

function drawBackground() {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	drawGrid(ctx);

}

const drawSprite = ({x, y, width, height, color, name}) => {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
	ctx.fillStyle = "black";
	ctx.font = "12px monospace";
	ctx.fillText(name, x + 20, y + 55);
}


const handleCollisions = () => {
	if (isTouching(player, enemy)) {
		player.color = "orange";
		enemy.color = "orange";
		
	} else {
		player.color = "white";
		enemy.color = "purple";
	
	}
	checkBoundaries(player);
	checkBoundaries(enemy);
}

let checkBoundaries = ({x, y, width, height}) => {
	if (x >= canvas.width - width) {
		x = canvas.width - width;
		console.log(canvas.width)
	}
	if (x <= 0) {
		x = 0;
	}
	if (y <= 0) {
		y = 0;
	}
	if (y >= canvas.height - height) {
		y = canvas.height - height;
	}
}


