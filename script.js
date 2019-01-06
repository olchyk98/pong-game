// w - left pipe, move top
// s - left pipe, move bottom
// top arrow - right pipe, move top
// bottom arrow - right pipe, move bottom

//// - ////
let leftPipe = rightPipe = ball = null;

class Pipe {
	constructor(xpos, label) {
		this.width = 20;
		this.height = height / 3; // *XXX

		this.pos = {
			x: xpos - ((label === 'r') ? this.width : 0),
			y: height / 2 - this.height / 2
		}

		this.moveY = 0;
		this.speed = 15;
	}

	render() {
		noStroke();
		fill(255);
		rect(
			this.pos.x,
			this.pos.y,
			this.width,
			this.height
		);

		return this;
	}

	update() {
		let a = this.pos.y + this.moveY * this.speed;

		if(
			a + this.height <= height &&
			a > 0
		) this.pos.y = a;
	}

	control(dirY) {
		this.moveY = dirY;
	}
}

function setup() {
	createCanvas(innerWidth - .5, innerHeight - .5);

	let pipeMargin = 15;
	rightPipe = new Pipe(pipeMargin, 'l');
	leftPipe = new Pipe(width - pipeMargin, 'r');
}

function draw() {
	background(0);

	leftPipe.render().update();
	rightPipe.render().update();
}

function keyPressed() {
	switch(keyCode) {
		case 87: // w
			leftPipe.control(-1);
		break;
		case 83: // s
			leftPipe.control(1);
		break;
		case 38: // top arrow
			rightPipe.control(-1);
		break;
		case 40: // bottom arrow
			rightPipe.control(1);
		break;
		default:break;
	}
}

function keyReleased() {
	switch(keyCode) {
		case 87: // w
		case 83: // s
			leftPipe.control(0);
		break;
		case 38: // top arrow
		case 40: // bottom arrow
			rightPipe.control(0);
		break;
		default:break;
	}
}