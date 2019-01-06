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

	detectTouch() {
		
	}
}

class Ball {
	constructor() {
		this.size = 30;

		this.pos = {
			x: width / 2 - this.size / 2,
			y: height / 2 - this.size / 2
		}

		{
			let a = () => [1, -1][round(random(0, 1))]

			this.dir = { // rand
				x: a(),
				y: a()
			}
		}
		this.speed = 5; // ?rand
	}

	render() {
		noStroke();
		fill(255);
		ellipse(
			this.pos.x,
			this.pos.y,
			this.size,
			this.size
		);

		return this;
	}

	update() {
		this.pos.x += this.dir.x * this.speed;
		this.pos.y += this.dir.y * this.speed;

		if(
			this.pos.y + this.size >= height ||
			this.pos.y < 0
		) this.signal('y');
	}

	signal(dir = null) { // makes *-1 dir
		if(dir === 'x') {
			this.dir.x *= -1;
		} else if(dir === 'y') {
			this.dir.y *= -1;
		} else {
			throw new Error("Invalid argument.");
		}
	}
}

function setup() {
	createCanvas(innerWidth - .5, innerHeight - .5);

	let pipeMargin = 15;
	rightPipe = new Pipe(pipeMargin, 'l');
	leftPipe = new Pipe(width - pipeMargin, 'r');
	ball = new Ball();
}

function draw() {
	background(0);

	leftPipe.render().update().detectTouch();
	rightPipe.render().update().detectTouch();
	ball.render().update();
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