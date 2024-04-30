
function drawGrid(ctx) {
	let bw = 600
	let p = 0
	let bh = 600

	for (var x = 0; x <= bw; x += 50) {
		ctx.moveTo(1 + x + p, p);
		ctx.lineTo(1 + x + p, bh + p);
	}

	for (var x = 0; x <= bh; x += 50) {
		ctx.moveTo(p, 1 + x + p);
		ctx.lineTo(bw + p, 1 + x + p);
	}
	ctx.strokeStyle = "white";
	ctx.stroke();
}

export default drawGrid